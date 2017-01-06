const express = require('express');
const fs = require('fs');
// const path = require('path');
// const hbs = require('hbs');
// const pug = require('pug');

const host = 3000;
const app = express();

app.set('view engine', 'pug');
// app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', `${log}\n`, (err) => {
    if (err) {
      console.log(err);
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintenance');
});

app.get('/', (req, res) => {
  res.render('index', {
    pageTitle: 'Main page',
    youAreUsingPug: true,
  });
});

app.get('/about', (req, res) => {
  res.send({
    name: 'kevin',
    height: 179,
  });
});

app.get('/bad', (req, res) => {
  res.send('<h1>Cannot reach to the page...</h1>');
});

app.listen(host, () => {
  // console.log(__dirname);
  console.log(`Server is up on http://localhost:${host}...`);
});
