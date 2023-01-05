const express = require('express');

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'secret',
  database: 'calculateur_moyennes'
});

const app = express();

const port = 4000;

app.get('/getGrades', (req, res) => {
    connection.query(
        'SELECT * from grades',
        function(err, results, fields) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.send(results)
        }
      );
});

app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);
