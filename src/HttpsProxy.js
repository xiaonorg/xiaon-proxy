var http = require('http');
var https = require('https');
var fs = require('fs');
var httpProxy = require('http-proxy');
var config = require('../config/config').config.httpsProxy;
//指定证书位置
var options = {
    key: fs.readFileSync(config.keyPem),
    ca: fs.readFileSync(config.caPem),
    cert: fs.readFileSync(config.certPem)
};

var proxy = httpProxy.createProxyServer({});
proxy.on('error', function (err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end('访问失败!');
});
https.createServer(options,function(req,res){
    try{
        if (req.url.indexOf("/v1/") == 0) {
                proxy.web(req, res, {target: config.coreUrl});
        } else {
                proxy.web(req, res, {target: config.webUrl});
        }
    }catch (e){
        console.log(e);
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.end('访问失败!');
    }
}).listen(config.httpsPort,config.ip);
//将http请求全部跳转到https
http.createServer(function (req, res) {
    res.writeHead(302, {
        'Location': 'https://'+req.headers.host+req.url
    });
    res.end();
}).listen(config.httpPort,config.ip);
console.log("开始监听端口:" + config.httpPort+","+config.httpsPort);
