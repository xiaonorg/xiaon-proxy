var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var mine = require('../config/mine').type;
var config = require('../config/config').config.httpServer;

var server = http.createServer(function (request, response) {
    try {
        var pathname = url.parse(request.url).pathname;
        if (pathname == '/') {
            pathname = '/index.html';
        }
        var realPath = path.join(config.path, pathname);
        var ext = path.extname(realPath);
        ext = ext ? ext.slice(1) : 'unknown';
        fs.exists(realPath, function (exists) {
            if (!exists) {
                response.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                response.write("请求页面不存在");
                response.end();
            } else {
                fs.readFile(realPath, "binary", function (err, file) {
                    if (err) {
                        response.writeHead(500, {
                            'Content-Type': 'text/plain'
                        });
                        response.end(err);
                    } else {
                        var contentType = mine[ext] || "text/plain";
                        response.writeHead(200, {
                            'Content-Type': contentType
                        });
                        response.write(file, "binary");
                        response.end();
                    }
                });
            }
        });
    } catch (e) {
        response.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        response.write("请求页面不存在");
        response.end();
    }
});
server.listen(config.port);
console.log("服务已运行，端口: " + config.port);