const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'secret',
  database: 'calculateur_moyennes'
});

const app = express();
app.use(express.json());

const corsOptions = {
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

function returnError(res, message) {
  res.status(400).send({
    message: message
  });
}

app.get('/grades', (req, res) => {
    connection.query(
        'SELECT * from grades',
        function(err, results, fields) {
          res.setHeader('Access-Control-Allow-Origin', '*');

          res.send({
              grades: results,
              average: Math.round(results.reduce((sum, entry) => sum + entry.grade, 0) / results.filter((entry) => entry.grade).length * 2) / 2
          })
        }
      );
});

app.post('/grade', (req, res) => {
    connection.query(
      `INSERT INTO grades (name, grade) VALUES (NULL, NULL);`,
        function (err, results, fields) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(results)
        }
    );
});

app.put('/grade', (req, res) => {
  const name = req.query.name
  const grade = req.query.grade
  connection.query(
    `UPDATE grades SET name = ?, grade = ? WHERE id = ?`, [name ? name : null, grade ? grade : null, req.query.id],
      function (err, results, fields) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.send(results)
      }
  );
});

app.put('/subject', (req, res) => {
  if (Object.keys(req.body).length === 0) {
    returnError(res, 'Body must not be empty');
    return;
  }

  const name = req.body.name

  if (name.length > 64 || name.length === 0) {
    returnError(res, 'The value must be at most 64 characters long');

    return;
  }

  connection.query(
    `INSERT INTO subject (id, name) VALUES (1, ?) ON DUPLICATE KEY UPDATE name=?;`, [name, name]
  );

  connection.query(
    `SELECT * from subject WHERE id = 1;`,
      function (err, results) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.send(results[0])
      }
  );
});

app.delete('/grade', (req, res) => {
  connection.query(
      'DELETE FROM grades WHERE id = ?', [req.query.id],
      function(err, results, fields) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(results)
      }
    );
});

module.exports = {
    app,
    connection
}
