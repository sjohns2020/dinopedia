const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

app.use(cors());
app.use(express.json()); 
// app.get('', (req, res) => {res.send('hello')})

const ObjectId = require('mongodb').ObjectId;
const createRouter = function (collection) {

const router = express.Router();


//INDEX
  router.get('/', (req, res) => {
    // res.send('hello world');
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  return router;
};



MongoClient.connect('mongodb://localhost:27017') 
  .then((client) => { 
    const db = client.db('javasaurus'); 
    const dinosaursCollection = db.collection('dinosaurs'); 
    const dinosaursRouter = createRouter(dinosaursCollection); 
    app.use('/api/dinosaurs', dinosaursRouter);
  })
  .catch(console.err); 

app.listen(5000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});

