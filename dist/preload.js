var http = require('http');
var https = require('https');
var fs = require('fs');
var Path =require('path')

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest, { flags: "wx" });
        let r = url.match("https") ? https : http;
        const request = r.get(url, response => {
            if (response.statusCode === 200) {
                response.pipe(file);
            } else {
                file.close();
                fs.unlink(dest, () => {}); // Delete temp file
                reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`);
            }
        });

        request.on("error", err => {
            file.close();
            fs.unlink(dest, () => {}); // Delete temp file
            reject(err.message);
        });

        file.on("finish", () => {
            resolve();
        });

        file.on("error", err => {
            file.close();

            if (err.code === "EEXIST") {
                reject("File already exists");
            } else {
                fs.unlink(dest, () => {}); // Delete temp file
                reject(err.message);
            }
        });
    });
}

function getFileName(path){
    let index1 = path.lastIndexOf("?");
    let index2 = path.lastIndexOf( "#");
    let index = index1 < index2 ? index1 : index2;
    if(index1 === -1){
        index = index2;
    }else if(index2 === -1){
        index = index1;
    }
    if(index === -1) index = path.length
    let slash = path.lastIndexOf("/", index);
    let filename = path.substring(slash + 1, index);
    if (!filename) {
        filename = "downloadfile";
    }
    return filename;
}

window.exports = {
    "urldownloader": {
        mode: "none",
        args: {
            // 进入插件时调用
            enter: (action) => {
                // action = { code, type, payload }
                try {
                    window.utools.hideMainWindow()
                    let url = action.payload;
                    let downloads = utools.getPath('downloads');
                    let dir = downloads;
                    let filename = getFileName(url);
                    let dest = Path.resolve(dir, filename);
                    download(url, dest).then(function () {
                        utools.showNotification('download ' + filename + ' OK')
                        utools.shellShowItemInFolder(dest)
                        utools.outPlugin();
                    }).catch(function (e) {
                        utools.showNotification(e)
                        console.error(e);
                        utools.outPlugin();
                    })
                }catch (e) {
                    utools.showNotification(e)
                }
            }
        }
    }
}
