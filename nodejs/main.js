const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const template = require('./lib/template');
const path = require('path');
const sanitizeHtml = require('sanitize-html');

const app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  if (pathname === '/') {
    if (queryData.id === undefined) {
      fs.readdir('./data', function (error, filelist) {
        const title = "Welcome!";
        const description = 'Hello, node.js';
        let list = template.list(filelist);
        let html = template.HTML({ title, list, body: `<h2>${title}</h2><p>${description}</p>`, control: `<a href ="/create">create</a>` });

        response.writeHead(200);
        response.end(html);
      })
    } else {
      fs.readdir('./data', function (error, filelist) {
        const filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
          let title = queryData.id;
          const santizedTitle = sanitizeHtml(title);
          const santizedDescription = sanitizeHtml(description, {
            allowedTags: ['h1']
          });
          let list = template.list(filelist);
          let html = template.HTML({
            title: santizedTitle, list,
            body: `<h2>${santizedTitle}</h2><p>${santizedDescription}</p>`,
            control: `
            <a href ="/create">create</a>
            <a href ="/update?id=${santizedTitle}">update</a>
            <form action="delete_process" method="post">
              <input type="hidden" name="id" value="${santizedTitle}">
              <input type="submit" value="delete">
            </form>
            `
          });

          response.writeHead(200);
          response.end(html);
        })
      })
    }

  } else if (pathname === '/create') {
    fs.readdir('./data', function (error, filelist) {
      const title = "WEB- create";
      let list = template.list(filelist);
      let html = template.HTML({
        title, list, body: `
        <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
      `, control: ``
      });

      response.writeHead(200);
      response.end(html);
    })
  } else if (pathname === '/create_process') {
    let body = '';
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      const post = qs.parse(body);
      const title = post.title;
      const description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
        response.writeHead(302, { Location: `/?id=${title}` });
        response.end();

      })
    });
  } else if (pathname === '/update') {
    fs.readdir('./data', function (error, filelist) {
      const filteredId = path.parse(queryData.id).base;
      fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
        let title = queryData.id;
        let list = template.list(filelist);
        let html = template.HTML({
          title, list,
          body: `
          <form action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
          </form>
        `,
          control: `<a href ="/create">create</a> <a href ="/update?id=${title}">update</a>`
        });

        response.writeHead(200);
        response.end(html);
      })
    })
  } else if (pathname === '/update_process') {
    let body = '';
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      const post = qs.parse(body);
      const title = post.title;
      const description = post.description;
      const id = post.id;
      fs.rename(`data/${id}`, `data/${title}`, function (err) {
        fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
          response.writeHead(302, { Location: `/?id=${title}` });
          response.end();
        });
      });
    });
  } else if (pathname === '/delete_process') {
    let body = '';
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      const post = qs.parse(body);
      const id = post.id;
      const filteredId = path.parse(id).base;
      fs.unlink(`data/${filteredId}`, function (err) {
        response.writeHead(302, { Location: `/` });
        response.end();
      })
    });
  } else {
    response.writeHead(404);
    response.end('Not found');
  }

});
app.listen(3000);