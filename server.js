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
  let pageTitle = "Inscription étudiants"; // Définir les variables
  let appName = "Application - EJS"; 
  const lang = ["Twig","EJS", "Blade"];
  const currentDate = new Date().toLocaleDateString('fr-FR');

  res.render('index', { // rappel dans la méthode des variables à passe à la vue
    pageTitle, 
    appName,
    lang,
    currentDate
  }); // Passer les variables à la vue index.ejs
});



// Route pour afficher les données depuis la base de données
app.get('/donnees', (req, res) => {
  // Effectuer une requête SQL pour récupérer les données depuis la base de données
  connection.query('SELECT * FROM formulaire_client', (err, rows) => {
      if (err) {
          console.error('Erreur lors de la récupération des données depuis la base de données:', err);
          res.status(500).send('Erreur lors de la récupération des données');
          return;
      }
      // Passer les données récupérées à la vue lors du rendu de la page
      
      // Définir des variables pour le footer
      const annee = new Date()
      const formattedDate = annee.toLocaleDateString('fr-FR');
       // Obtenir l'année actuelle
      const auteur = 'GiusMili'; // Remplacez par votre nom ou le nom de l'auteur
      
      // Passer les données récupérées et les variables du footer à la vue lors du rendu de la page
      res.render('donnees', 
      { 
        donnees: rows, 
        annee: formattedDate, 
        auteur: auteur 
      });
  });
});

// partie update
// Route pour afficher la page de modification/suppression
/* app.get('/modifier', (req, res) => {
  // Code pour afficher la page de modification
  res.render('modifier');
});
 */
app.get('/modifier/:id', (req, res) => {
  const id = req.params.id;

  // Récupérer les données de l'élément à partir de la base de données
  connection.query('SELECT * FROM formulaire_client WHERE id = ?', [id], (err, rows) => {
    if (err) {
      console.error('Erreur lors de la récupération des données de l\'élément:', err);
      res.status(500).send('Erreur lors de la récupération des données de l\'élément');
      return;
    }

    // Afficher la page de modification avec les données récupérées
    res.render('modifier', { element: rows[0] });

    // Envoyer une réponse confirmant la modification réussie
    console.log("Success")
  });
});

app.post('/modifier/:id', (req, res) => {
  const id = req.params.id; // Récupérer l'ID depuis les paramètres de l'URL
  const { nom, prenom, date, phone } = req.body; // Récupérer les données du formulaire

  // Effectuer la mise à jour des données dans la base de données
  connection.query(
    'UPDATE formulaire_client SET nom = ?, prenom = ?, date = ?, phone = ? WHERE id = ?',
    [nom, prenom, date, phone, id],
    (err, result) => {
      if (err) {
        console.error('Erreur lors de la mise à jour des données :', err);
        res.status(500).send('Erreur lors de la mise à jour des données');
        return;
      }
      console.log('Données mises à jour avec succès');
      res.redirect('/donnees'); // Rediriger l'utilisateur vers une autre page après la mise à jour
    }
  );
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

