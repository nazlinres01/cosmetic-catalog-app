// server.js
const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const errorHandler = require('./middleware/errorHandler');
const db = require('./db');

const app = express();
const PORT = 3000;

// JSON verilerini işlemesi için Express'e built-in middleware ekliyoruz
app.use(bodyParser.json());

// MongoDB bağlantısı
db.connect();

// Ürün rotalarını kullanıyoruz
app.use('/api/products', productRoutes);

// Hata işleme middleware'ini kullanıyoruz
app.use(errorHandler);

// Ana sayfa
app.get('/', (req, res) => {
  res.send('Welcome to the Cosmetic Product Catalog API!');
});

// Sunucuyu başlatıyoruz
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
