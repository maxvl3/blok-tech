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
*/

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();

app.get('/', function(req, res){
   res.render('form');
});

app.set('view engine', 'pug');
app.set('views', './view');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use('/static', express.static('static'))

app.post('/', function(req, res){
   console.log(req.body);
   res.send("recieved your request!");
});
app.listen(8000);