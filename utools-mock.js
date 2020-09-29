if(!window['utools']){
    utools = {
        onPluginEnter : function(callback){
            callback.call(this, {
                code : 'toolbox-set'
            })
        },
        db : {
            allDocs : function(id){
                return [
                    {
                        "title": "http://www.baidu.com",
                        "url": "http://www.baidu.com",
                        "imageSrc": "",
                        "name": "11",
                        "_id": "dataList-0",
                        "_rev": "59-e7596f18800c126e42908a74e5030eb8"
                    },
                    {
                        "title": "新的工具盒",
                        "url": "http://weweweewwe",
                        "_id": "dataList-1",
                        "_rev": "26-dbf4cc2bc835adf408e1a71afbab9759"
                    },
                    {
                        "title": "1121212121",
                        "url": "11212121212",
                        "_id": "dataList-2",
                        "_rev": "11-06df0c2e8038751d11bfe5459fbb1421"
                    },
                    {
                        "title": "11122112asdadasdada",
                        "url": "11122112asdadasdadas",
                        "_id": "dataList-3",
                        "_rev": "20-93aef7d2b072babbc3b9ba704bc907a6"
                    },
                    {
                        "title": "aaa",
                        "url": "aaaa",
                        "_id": "dataList-4",
                        "_rev": "4-8c1fb60da2476f7d72a991b5ee489306"
                    }
                ]
            }
        }
    }
}