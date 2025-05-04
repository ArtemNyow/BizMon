const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes'); 
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use('/api', routes); // <-- Кореневий префікс для всіх маршрутів

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
