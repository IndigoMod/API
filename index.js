const http = require('http');
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
              if (reqparse.method === "test") {
                res.end("ok");
              }
            }
            catch(e) {
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

server.listen(3000);

function loadRepoUrl(author, repo) {
  
}

function fetch(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var response = xhttp.responseText;
        return response;
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function getRootUrl(url) {
  return url.toString().replace(/^(.*\/\/[^\/?#]*).*$/,"$1");
}