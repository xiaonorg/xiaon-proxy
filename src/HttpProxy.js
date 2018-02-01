var http = require('http');
var httpProxy = require('http-proxy');
var config = require('../config/config').config.httpProxy;

var proxy = httpProxy.createProxyServer({});

var server = http.createServer(function (req, res) {
    try{
        if (req.url.indexOf("/v1/") == 0) {
            proxy.web(req, res, {target: config.coreUrl});
        } else {
            proxy.web(req, res, {target: config.webUrl});
        }
    }catch (e){
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.end('访问失败!');
    }
});
proxy.on('error', function (err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });

    res.end('访问失败!');
});
console.log("开始监听端口:" + config.port);
server.listen(config.port);
