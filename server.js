const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path'); // Ajoutez cette ligne pour importer le module 'path'
const app = express();
const port = 3000;



// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'members'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Endpoint to handle form submission
app.post('/api/submit-form', (req, res) => {
  const { nom, prenom, date, phone } = req.body;
  const formData = { nom, prenom, date, phone };
  
  // Insert form data into the database
  connection.query('INSERT INTO formulaire_client SET ?', formData, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    console.log('Form data inserted into MySQL:', result);
    res.json({ message: 'Form data inserted successfully' });
  });
});

// Route for the root URL
app.get('/', (req, res) => {
 /*  res.send('Bienvenue sur le serveur !'); */
 res.sendFile(path.join(__dirname, 'public', 'index.html'));


  
});

// Servir des fichiers statiques depuis le dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));
// Start the server

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
