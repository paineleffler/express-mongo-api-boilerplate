const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const helmet = require('helmet');
const session = require('express-session')
var path = require('path');

require('dotenv').config();

const app = express();
const port = 5000;
const expiryDate = new Date(Date.now() + 60 * 60 * 1000)
var sesh = {
  name: 'insert cool name here',
  secret: 'not a keyboard cat',
  resave: 'false',
  saveUninitialized: 'true',
  cookie: {}
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1);
  sesh.cookie.secure = true;
  sesh.cookie.httpOnly = true;
  sesh.cookie.domain = 'insert.domain.here.com';
  sesh.cookie.expires = expiryDate;
}

app.use(helmet())
app.use(session(sesh))
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(`${process.env.MONGO_URL}`, (err, database) => {
  require('./app/routes')(app, database);

  app.listen(port, () => {
      console.log('API running on port ' + port);
  });
})
