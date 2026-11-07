const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const buyerRoutes = require('./routes/buyer');
const orderRoutes = require('./routes/order');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error: ', err));

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/buyers', buyerRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Knitwear API running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server running on port' + PORT);
});