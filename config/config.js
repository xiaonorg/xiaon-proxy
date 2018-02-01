exports.config = {
    "httpServer": {  //http服务器相关配置
        "port": "8081",
        "path": "/home/yun/software/web"
    },
    "httpProxy": {  //http代理服务器相关配置
        "port": "80",
        "coreUrl": "http://127.0.0.1:8083",
        "webUrl": "http://127.0.0.1:3000"
    },
    "httpsProxy": { //https代理服务器相关配置
        "ip":"127.0.0.1",
        "httpPort": "80",
        "httpsPort":"443",
        "coreUrl": "http://127.0.0.1:8083",
        "webUrl": "http://127.0.0.1:3000",
        "caPem":"/home/yun/software/openssl/ca-cert.pem",
        "keyPem": "/home/yun/software/openssl/server-key.pem",
        "certPem": "/home/yun/software/openssl/server-cert.pem"
    }
};