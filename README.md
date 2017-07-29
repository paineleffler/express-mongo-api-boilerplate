# express-mongo-api-boilerplate

This is a basic express project to help build API's with MongoDB quickly. It's so easy a baby could (maybe) do it. I'll take you through going from 0 to a Heroku (or Dokku) Deployed API in 5-10 mins.

<p align="center">
  <a href="https://github.com/nodejs"><img alt="Node.js" src="https://avatars3.githubusercontent.com/u/9950313?v=4&s=200" style="border-radius:10%" height="100px"/></a>
  <a href="https://github.com/mongodb"><img alt="MongoDB" src="https://avatars1.githubusercontent.com/u/45120?v=4&s=200" style="border-radius:10%" height="100px"/></a>
  <a href="https://github.com/expressjs"><img alt="Express" src="https://avatars1.githubusercontent.com/u/5658226?v=4&s=200" style="border-radius:10%" height="100px"/></a>
  <a href="https://github.com/heroku"><img alt="Heroku" src="https://avatars3.githubusercontent.com/u/23211?v=4&s=200" style="border-radius:10%" height="100px"/></a>
  <a href="https://github.com/dokku"><img alt="Dokku" src="https://avatars1.githubusercontent.com/u/13455795?v=4&s=400" style="border-radius:10%" height="100px"/></a>
</p>

## Git started

### Go get a MongoDB Instance

https://mlab.com

To the right of MongoDB Deployments select `Create New`. Make sure you are not creating a New Private Environment.

Then select your favorite (or a random) Cloud Provider.

Select Sandbox (cause its free!). Then click Continue.

Pick a region near you.

Name your DB.

Submit order.

Click your database that you just made.

Click `User`, then `Add Database User`.

Type a username and password.

Copy the second URL given at the top!

```
To connect using a driver via the standard MongoDB URI (what's this?):
mongodb://<dbuser>:<dbpassword>@ds123456.mlab.com:12345/<your-db-name>
```
You will need this URL for the next step.


### Setup Your ENV Variables

`cp .env.example .env`

Use your favorite (or least favorite) editor to add your MongoDB connection URL

`vim .env`

Now paste that URL next to MONGO_URL

`MONGO_URL=mongodb://<dbuser>:<dbpassword>@ds123456.mlab.com:12345/<your-db-name>`

But make sure you type in the username and password you created for your database into that URL (NOT YOUR MLAB ACCOUNT LOGIN)

## Git Runnin

`git clone https://github.com/paineleffler/express-mongo-boilerplate.git`

`cd express-mongo-boilerplate`

if you really really want nodemon:
`npm install -g nodemon`

`npm install`

`npm run dev`

`npm start`

## Git Configurin

### Change session name and secret on server.js

```javascript
var sesh = {
  name: 'insert cool name here',
  secret: 'not a keyboard cat',
  //...
}
```

### Change the Port number

```javascript
const port = 5000;
```

### Change the cookie domain for production

```javascript
if (app.get('env') === 'production') {
  //...
  sesh.cookie.domain = 'insert.domain.here.com';
  //...
}
```

### CORS

In your `app/routes/foo_routes.js` add this to the top:

``` javascript
  var cors = require('cors')
  var corsOptions = {
    origin: 'https://domain.calling.api.com'
  }
```

Then configure your routes with CORS by adding `cors(corsOptions)`:

``` javascript
  //example
  app.get('/example', cors(corsOptions) (req, res) => {
  //...
  });
```

## Git Deployin

### Heroku

Make sure you have the Heroku CLI:

https://devcenter.heroku.com/articles/heroku-cli

run `heroku create <crazy-unique-name-here>`

Then this should Echo back:
```
Creating ⬢ <crazy-unique-name-here>... done
https://<crazy-unique-name-here>.herokuapp.com/ | https://git.heroku.com/<crazy-unique-name-here>.git
```

Make sure to set your MONGODB URL or it will not work!!!
`heroku config:set MONGO_URL=mongodb://<dbuser>:<dbpass>@<ds123456>.mlab.com:<12345>/<dbname>`

Make sure you `git add && git commit -a -m 'commit message'`

Then `git push heroku master` or whatever branch you like deploying from

Then BAMMMM it's on Heroku! Go look at:

https://<crazy-unique-name-here>.herokuapp.com/

Note your free heroku instance will sleep after 30 minutes of no activity.

### Dokku (if ur cool like me)

Add your dokku remote to your `.git/config`

```
[remote "dokku"]
        url = dokku@<dokku-server-ip-address>:api
        fetch = +refs/heads/*:refs/remotes/dokku/*
```

Set Dokku Environment Variable

`dokku config:set MONGO_URL=mongodb://<dbuser>:<dbpass>@<ds123456>.mlab.com:<12345>/<dbname>`

Then `git push dokku master`

BOOM!

## Git Buildin

`cp app/routes/foo_routes.js app/routes/bar_routes.js`

Add new `app/routes/bar_routes.js` to the `app/routes/index.js`

```javascript
const fooRoutes = require('./foo_routes');
const barRoutes = require('./bar_routes');

module.exports = function(app, db) {
  fooRoutes(app, db);
  barRoutes(app, db);
};

```

Customize your `app/routes/bar_routes.js` as you wish...

## Git Routin

Params should be sent as x-www-form-urlencoded in the body.

`get /` root route of the API

`get /foo` fetches all the foo's

`get /foo/:id` fetches a foo by id

`post /foo` creates a foo

`delete /foo/:id` delete a foo by id

`put /foo/:id` update a foo

## Git Testin

coming soon
