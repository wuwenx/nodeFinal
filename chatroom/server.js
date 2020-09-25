var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};

/**
 * 封装404辅助函数
 * @param {*} response 请求对象
 */
function send404(response) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('Error 404: response not found')
    response.end();
};

/**
 * 封装文件发送函数
 * @param {*} response 请求对象
 * @param {*} filePath 文件路径
 * @param {*} fileContents 文件内容
 */
function sendFile(response, filePath, fileContents) {
    response.writeHead(200, { 'Content0-Type': mime.getType(path.basename(filePath)) });
    response.end(fileContents);

};

/**
 * 判断文件是否存在并且读取缓存展示
 * @param {*} response 请求对象
 * @param {*} cache 缓存
 * @param {*} absPath 文件路径
 */
function serverStatic(response, cache, absPath) {

    if (cache[absPath]) {
        sendFile(response, absPath, cache[absPath]);
    } else {
        fs.access(absPath, (err) => {
            if (!err) {
                fs.readFile(absPath, (err, data) => {
                    if (err) {
                        send404(response);
                    } else {
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }

                })
            } else {
                send404(response);
            }

        })
    }
}

var server = http.createServer((req, res) => {
    var filePath = false;
    if (req.url == '/') {
        filePath = 'public/index.html';
    } else {
        filePath = 'public' + req.url;
    }
    var absPath = './' + filePath;
    serverStatic(res, cache, absPath);
})

server.listen(3000, () => {
    console.log("Server listening on port 3000.");
})