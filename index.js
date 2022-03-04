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