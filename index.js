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


//.ENV wordt gekoppeld
require('dotenv').config()


//Statische content kunnen serveren
app.use('/static', express.static('static'))


//Middleware om data op te halen in de body van een request
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


//Render de pagina om een gebruiker aan te maken
app.get('/', (req, res) => {
    res.render('form');
});


//Stuurt formulier input naar database en redirect een nieuwe page
app.post('/', async (req,res) => {
	console.log(req.body);
	const { voornaam, achternaam, geboortedatum, geslacht, beschikbaar, uurtarief } = req.body;
	await userCollection.insertOne({ 
		voornaam: voornaam, 
		achternaam: achternaam, 
		geboortedatum: geboortedatum, 
		geslacht: geslacht, 
		beschikbaar: beschikbaar, 
		uurtarief: uurtarief });
	res.redirect('home');
});


//Nieuwe page haalt alle data op en toont deze
app.get('/home', async (req, res) => {
	const users = await userCollection.find().toArray();
	res.render('home', { users });
});


//Render de pagina om te filteren
app.get('/filter', (req, res) => {
    res.render('filter');
});


//Input uit de filter halen en deze gebruiken om gebruikers te vinden in de database
app.post('/filter', async (req, res) => {
	console.log(req.body);
	const { geslacht, beschikbaar } = req.body;
	const users = await userCollection.find({geslacht: geslacht, beschikbaar: beschikbaar}).toArray();
	console.log(users);
	res.render('home', { users });
});


//Indien de pagina niet kan worden gevonden
app.use(function (req, res) {
	res.status(404).send("Deze pagina kan niet gevonden worden..");
});


//geeft aan op welke poort de app werkt
app.listen(PORT, function () {
  console.log('Bekijk de app via poort: ', PORT)
})