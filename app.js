const express = require('express');
const path = require('path');
require('dotenv').config();
const connectDB = require('./backend/config/db');
const apiRoutes = require('./backend/routes');

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'frontend'));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', apiRoutes); 


app.get('/', (req, res) => res.render('pages/index'));
app.get('/pricing', (req, res) => res.render('pages/pricing/pricing'));
app.get('/resources', (req, res) => res.render('pages/resources/resources'));
app.get('/customers', (req, res) => res.render('pages/customers/customers'));
app.get('/admin/dashboard', async (req, res) => {
  try {
    const User = require('./backend/models/User');
    const Subscriber = require('./backend/models/Subscriber');
    const Contact = require('./backend/models/ContactMessage');

    const users = await User.find();
    const subscribers = await Subscriber.find();
    const contacts = await Contact.find();

    res.render('pages/admin/dashboard', {
      users,
      subscribers,
      contacts
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});




// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 App running at http://localhost:${PORT}`);
});
