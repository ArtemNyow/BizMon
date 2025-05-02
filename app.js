const express = require('express');
const path = require('path');

const app = express();

// Налаштування EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Публічні файли (CSS, зображення)
app.use(express.static(path.join(__dirname, 'public')));

// Роутинг сторінок
app.get('/', (req, res) => res.render('pages/index'));
app.get('/customers', (req, res) =>res.render('pages/customers/customers'));
app.get('/pricing', (req, res) => res.render('pages/pricing/pricing'));
app.get('/resources', (req, res) => res.render('pages/resources/resources'));


// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
