const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8'); // utf-8 => use only for text. not for image, etc.
const laptopData = JSON.parse(json);

const server = http.createServer((req, res) => {

    const reqUrl = url.parse(req.url, true);

    if (reqUrl.pathname === '/products' || reqUrl.pathname === '/') {
        res.writeHead(200, { 'Content-type': 'text/html'});
        res.end(`Requested PRODUCTS page!`);

    } else if (reqUrl.pathname === '/laptop' && reqUrl.query.id < laptopData.length) {
        res.writeHead(200, { 'Content-type': 'text/html'});
        res.end(`Requested LAPTOP page for id = ${reqUrl.query.id}!`);

    } else {
        res.writeHead(404, { 'Content-type': 'text/html'});
        res.end('URL was not found on the server!');
    }
});

server.listen(1337, '127.0.0.1', () => {
    console.log('Listening for requests now...');
});
