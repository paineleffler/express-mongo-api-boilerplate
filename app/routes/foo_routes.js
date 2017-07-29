var ObjectID = require('mongodb').ObjectID;
//var cors = require('cors')
// var corsOptions = {
//   origin: 'https://domain.calling.api.com'
// }
// add this to routes : cors(corsOptions)

module.exports = function(app, db) {
  app.get('/', (req, res) => {
    res.send('HEYYOOOOO your API is running! Send requests to your other routes!')
  })
  //get foo by id
  app.get('/foo/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('foo').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred with finding your foo.'});
      } else if (item){
        res.send(item);
      } else {
        res.send('Your specific foo does not exist!');
      }
    });
  });
  //get all foos
  app.get('/foo', (req, res) => {
    db.collection('foo').find({}).toArray((err, items) => {
      if (err) {
        res.send({'error':'An error has occurred with finding all your foos.'});
      } else if (items){
        res.send(items);
      } else {
        res.send('Your specific foo does not exist!');
      }
    });
  });
  //create a foo
  app.post('/foo', (req, res) => {
    if (req.body.name === undefined) {
      res.status(400).end();
      return;
    }
    const foo = {
      name: req.body.name,
      time: new Date()
    };
    db.collection('foo').insert(foo, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred with creating your foo.' });
      } else {
        res.send(item);
      }
    });
  });

  //delete a foo by id
  app.delete('/foo/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('foo').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred with deleting your foo.'});
      } else if (item){
        res.send('foo ' + id + ' deleted!');
      } else {
        res.send('Your specific foo does not exist!');
      }
    });
  });

  //update a foo by id
  app.put('/foo/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const foo = {
      name: req.body.name,
      time: new Date()
    };
    db.collection('foo').update(details, foo, { upsert: false }, (err, result) => {
      if (err) {
        res.send({'error':'An error has occurred with updating your foo.'});
      } else if(result.result.n === 1){
        res.send(foo);
      } else {
        res.send('Your specific foo does not exist!')
      }
    });
  });
};
