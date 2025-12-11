require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const apiRoutes = require(path.join(__dirname, 'src', 'routes', 'api.route.js'));
const cors = require('cors');

const { sequelize } = require('./src/models');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);
app.get('/', (req, res) => res.send("Backend running"));

// Test DB connection
sequelize.authenticate()
  .then(() => console.log("SQL Server Connected"))
  .catch(err => console.log("DB connection failed: ", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
