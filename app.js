const express = require('express');
const path = require('path');
require('dotenv').config();
const connectDB = require('./backend/config/db');
const apiRoutes = require('./backend/routes');

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public + Frontend
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'frontend'));
app.use(express.static(path.join(__dirname, 'public')));

// API роутинг
app.use('/api', apiRoutes); // <- ПРАВИЛЬНО: routes/index.js експортує router

// Frontend pages
app.get('/', (req, res) => res.render('pages/index'));
app.get('/pricing', (req, res) => res.render('pages/pricing/pricing'));
app.get('/resources', (req, res) => res.render('pages/resources/resources'));
app.get('/customers', (req, res) => res.render('pages/customers/customers'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 App running at http://localhost:${PORT}`);
});
