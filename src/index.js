const path = require('path');
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const methodOverride = require('method-override')
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(methodOverride('_method'))

// Template engine
// Config default directory for views
app.engine('.hbs', handlebars({
  extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => {
  console.log(`Match app listening at http://localhost:${port}`)
})