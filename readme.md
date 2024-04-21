# 🔥 Activité PHP 
![cover](./public/asset/cover.PNG)
🚀Intégration et analyse formulaire : développement d'une structure fonctionnelle MVC

[![forthebadge](https://forthebadge.com/images/badges/built-by-developers.svg)](https://forthebadge.com)
# SQL and Express js
> Pour faire fonctionner express js et mySQL ensemble 
* Installer node js
* Créez un dossier pour votre projet et accédez-y via votre terminal
* Initialisez un projet Node.js avec npm init -y pour créer un fichier package.json.
* ```npm install express mysql body-parser```
* Créez un fichier server.js dans votre dossier.
* installer npm install ejs
* Dans server.js, placez le code suivant :
```js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password', // Mettez votre mot de passe MySQL ici
  database: 'students'
});

connection.connect();

app.post('/students', (req, res) => {
  const { name, age, cursus } = req.body;
  connection.query('INSERT INTO students (name, age, cursus) VALUES (?, ?, ?)', [name, age, cursus], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Student added successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```
* Assurez-vous d'avoir une base de données MySQL configurée avec une table students contenant les colonnes name, age, et cursus.
* Exécutez votre serveur avec la commande node server.js.
* Pour ajouter un étudiant, envoyez une requête POST avec les détails de l'étudiant à l'URL http://localhost:3000/students.
* Express.js communique avec une base de données MySQL pour enregistrer des étudiants.


