/*
const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const PORT = 8000

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './view')

app.use('/static', express.static('static'))

app.get('/', naarHome)
app.get('/login', naarLogIn)

function naarHome(req, res) {
    res.render('home')
}

function naarLogIn(req, res) {
    res.render('login')
}

app.listen(PORT, () => {
    console.log('app running on port', PORT);
})



const express = require('express');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars')
const multer = require('multer');
const upload = multer();
const app = express();

const { MongoClient } = require("mongodb");
const url = "mongodb+srv://max:fvMeLTHh1WVvOYso@blok-tech.lnm97.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "test";

require('dotenv').config()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './view');

app.get('/', function(req, res){
    res.render('form');
 });

//https://www.tutorialspoint.com/expressjs/expressjs_form_data.htm

app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({ extended: true })); 

app.use(upload.array());
app.use('/static', express.static('static'))

app.post('/', function(req, res){
   console.log(req.body);
   res.send(req.body);
});
app.listen(3000);
         
async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db('test');

         const col = db.collection("people");
                                                                                                                                                            
         let personDocument = {
             "name": "Max",
             "birth": new Date(2003, 8, 27)                                                                                                                                                                                                                                                    
         }

         const p = await col.insertOne(personDocument);
         const myDoc = await col.findOne();
         console.log(myDoc);

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);
*/

/*
const express = require('express');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars')
const multer = require('multer');
const upload = multer();
const app = express();

require('dotenv').config();
const { MongoClient } = require('mongodb');
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@blok-tech.lnm97.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './view');

app.get('/', function(req, res){
    res.render('form');
 });

 app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({ extended: true })); 

app.use(upload.array());
app.use('/static', express.static('static'));

app.post('/', function(req, res){
   console.log(req.body);
   res.send(req.body);
});
app.listen(8000);


async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db('test');

         const col = db.collection("people");
                                                                                                                                                            
         let personDocument = {
             "naam": "Eva",
             "leeftijd": 21,
             "geslacht": "vrouw"                                                                                                                                                                                                                                                   
         }

         const p = await col.insertOne(personDocument);
         const myDoc = await col.findOne();
         console.log(myDoc);

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}
run().catch(console.dir);


MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    dbo.collection("people").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
  */