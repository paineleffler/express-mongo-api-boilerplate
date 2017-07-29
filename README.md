# express-mongo-api-boilerplate

This is a basic express project to help build API's with MongoDB quickly. It's so easy a baby could (maybe) do it. I'll take you through going from 0 to a Heroku (or Dokku) Deployed API in 5 mins.

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

## Git Deployin

I'll put some Heroku & Dokku stuff here later.

### Heroku

Make sure you have the Heroku CLI:

https://devcenter.heroku.com/articles/heroku-cli

run `heroku create <crazy-unique-name-here>`

Then this should Echo back:
```
Creating ⬢ <crazy-unique-name-here>... done
https://<crazy-unique-name-here>.herokuapp.com/ | https://git.heroku.com/<crazy-unique-name-here>.git
```

### Dokku (if ur cool like me)


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