var fs = require('fs');

// fs 获取文件信息
// fs.stat('./resources/a.txt', (err, stat) => {
//     if (err) {

//     } else {
//         console.log(stat)
//     }
// });

// fs读取文件流
var rs = fs.createReadStream('./resources/a.txt', 'utf-8');

rs.on('data', (chunk) => {
    console.log(chunk);
})
rs.on('end', () => {
    console.log('end');
})
rs.on('error', (err) => {
    console.log(err);
})

// fs 写入文件流
var ws = fs.createWriteStream('./resources/a.txt', 'utf-8');
ws.write('武文祥');
ws.write('wuwx');
ws.end();

var ws2 = fs.createWriteStream('./resources/a.txt');
ws2.write(new Buffer('使用Stream写入二进制数据...\n', 'utf-8'));
ws2.write(new Buffer('END.', 'utf-8'));
ws2.end();