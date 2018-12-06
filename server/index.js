// @flow

const express = require('express');
const mysql = require('mysql');

const app = express();

const port = process.env.port || 8080;

// database
const db = mysql.createConnection({
  host: 'birdie-test.cyosireearno.eu-west-2.rds.amazonaws.com',
  port: 3306,
  user: 'test-read',
  password: 'xnxPp6QfZbCYkY8',
  database: 'birdietest',
});

const table = 'census_learn_sql';

// connect to database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// routes
app.get('/data', (req, res, next) => {
  const { variable } = req.query;

  if (variable) {
    const sqlQuery = [
      `SELECT \`${variable}\`, COUNT(\`${variable}\`) AS count, AVG(age) AS average_age`,
      `FROM ${table}`,
      `GROUP BY \`${variable}\``,
      'ORDER BY average_age DESC',
    ].join(' ');

    console.log('SELECT', variable);

    db.query(sqlQuery, (error, results) => {
      if (error) throw error;
      res.send(results);
    });
  } else {
    console.log('Empty variable in SQL request', variable);
    next();
  }
});

app.get('/columns', (req, res) => {
  const sqlQuery = `SHOW columns from ${table}`;

  db.query(sqlQuery, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// launch server
app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
