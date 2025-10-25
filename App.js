// app.js
require('dotenv').config(); // load .env
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors())

// routes
const siswaRoutes  = require('./src/routes/siswaRoutes');

// middleware global
app.use(express.json()); // parse JSON body

// mount routes
app.use('/api/siswa', siswaRoutes);

// basic error handler (simple)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});