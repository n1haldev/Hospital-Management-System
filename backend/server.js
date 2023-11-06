// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/message", (req, res) => {
//   res.json({message: "Hello bois!"});
// });

// app.listen(8000, () => {
//   console.log("Server running!");
// });

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'your_database_host',
  user: 'your_database_user',
  password: 'your_database_password',
  database: 'your_database_name',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Define an endpoint to handle patient registration
app.post('/register-patient', (req, res) => {
  const formData = req.body;

  // Insert patient data into the database
  const sql = 'INSERT INTO patients SET ?';
  db.query(sql, formData, (err, res) => {
    if (err) {
      console.error('Error inserting patient data:', err);
      res.status(500).json({ error: 'An error occurred while registering the patient.' });
    } else {
      console.log('Patient registration successful');
      res.status(200).json({ message: 'Patient registered successfully.' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
