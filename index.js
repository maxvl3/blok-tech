// Modules worden gekoppeld
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = 3000

//Handlebars wordt gekoppeld
const { engine } = require('express-handlebars')
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
app.engine('handlebars', engine({
	layoutsDir: `${__dirname}/views/layouts`,
	extname: 'handlebars',
	defaultLayout: 'main',
	partialsDir: `${__dirname}/views/partials`
}));

//.ENV wordt gekoppeld
require('dotenv').config()

//Statische content kunnen serveren
app.use('/static', express.static('static'))

//Geen idee wat dit precies doet, maar het is nodig voor het verwerken van een form
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Database wordt gekoppeld
const { MongoClient } = require('mongodb')
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@blok-tech.lnm97.mongodb.net/maxdb?retryWrites=true&w=majority`;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
client.connect(err => {
	userCollection = client.db('maxdb').collection('gebruikers');
	console.log('connectie met de database is gemaakt');
});

//Render de pagina om te registeren
app.get('/', (req, res) => {
    res.render('form');
});

//Stuurt formulier input naar database en redirect een nieuwe page
app.post('/', async (req,res) => {
	console.log(req.body);
	const { naam, email } = req.body;
	userCollection.insertOne({ naam: naam, email: email });
	res.redirect('home');
});

//nieuwe page haalt alle data op en toont deze
app.get('/home', async (req, res) => {
	const users = await userCollection.find().toArray();
	res.render('home', { users });
});

//Indien de pagina niet kan worden gevonden
app.use(function (req, res, next) {
	res.status(404).send("Deze pagin kan niet gevonden worden!");
});

//geeft aan op welke poort de app werkt
app.listen(PORT, function () {
  console.log('Bekijk de app via poort: ', PORT)
})