const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
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
  let pageTitle = "Inscription étudiants"; // Définir la variable pageTitle
  let appName = "Application - EJS"; // Définir la variable appName
  const lang = ["Twig","EJS", "Blade"];

  res.render('index', { 
    pageTitle, 
    appName,
    lang
  }); // Passer les variables à la vue index.ejs
});

// Servir des fichiers statiques depuis le dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configuration du répertoire pour les fichiers de vues
app.set('views', path.join(__dirname, 'views'));

// Configuration du moteur de template (EJS)
app.set('view engine', 'ejs');

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
