const express = require('express');

const mysql = require('mysql2');

const cors = require('cors');

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'secret',
  database: 'calculateur_moyennes'
});

const app = express();

const corsOptions = {
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

const port = 4000;

app.get('/grades', (req, res) => {
    connection.query(
        'SELECT * from grades',
        function(err, results, fields) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.send(results)
        }
      );
});

app.post('/grade', (req, res) => {
    connection.query(
      `INSERT INTO grades (name, grade) VALUES ('', '');`,
        function (err, results, fields) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(results)
        }
    );
});

app.put('/grade', (req, res) => {
  const id = req.query.id
  const name = req.query.name
  const grade = req.query.grade
  connection.query(
    `UPDATE grades SET name = ?, grade = ? WHERE id = ?`, [name, grade, id],
      function (err, results, fields) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.send(results)
      }
  );
});

app.delete('/grade', (req, res) => {
  const id = req.query.id
  connection.query(
      'DELETE FROM grades WHERE id = ?', [id],
      function(err, results, fields) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(results)
      }
    );
});

app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);
