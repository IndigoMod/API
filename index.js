const http = require('http');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { parse } = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
            console.log("Request made to API with valid request method.");
            try {
              const reqparse = JSON.parse(body);
              res.end("ok");
            }
            catch {
              res.end("bad");
            }
        });
    }
    else {
      res.end(`
        <body>
          <h1>Bad HTTP method.</h1>
          <h2>The current HTTP request method (` + req.method.toString() + `) is not valid for this request.</h2>
          <h3>Try using a POST request instead.</h3>
        </body>
      `);
    }
});

server.listen(8080);
