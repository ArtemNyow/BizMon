const express = require('express');
const path = require('path');

const frontendApp = express();
frontendApp.set('view engine', 'ejs');
frontendApp.set('views', path.join(__dirname, 'pages'));
frontendApp.use(express.static(path.join(__dirname, 'public')));

frontendApp.get('/', (req, res) => res.render('index'));  
frontendApp.get('/customers', (req, res) => res.render('customers/customers'));  
frontendApp.get('/pricing', (req, res) => res.render('pricing/pricing'));  
frontendApp.get('/resources', (req, res) => res.render('resources/resources')); 

module.exports = frontendApp;