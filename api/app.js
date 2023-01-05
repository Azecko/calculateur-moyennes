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

app.get('/get/grades', (req, res) => {
    connection.query(
        'SELECT * from grades',
        function(err, results, fields) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.send(results)
        }
      );
});

app.get('/new/grade', (req, res) => {
    const name = req.query.name
    const grade = req.query.grade
    let sql = ''
    if (name && grade) {
        sql = `INSERT INTO grades (name, grade) VALUES ('${name}', '${grade}');`
    } else {
        sql = `INSERT INTO grades (name, grade) VALUES ('', '');`
    }
    connection.query(
        sql,
        function (err, results, fields) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(results)
        }
    );
});

app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);
