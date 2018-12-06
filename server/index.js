// @flow

const express = require('express');
const path = require('path');
const mysql = require('mysql');

const app = express();

const port = process.env.port || 8080;

// serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// database
const dbOptions = {
  host: 'birdie-test.cyosireearno.eu-west-2.rds.amazonaws.com',
  port: 3306,
  user: 'test-read',
  password: 'xnxPp6QfZbCYkY8',
  database: 'birdietest',
};

const db = mysql.createConnection(dbOptions);

const table = 'census_learn_sql';

// connect to database
db.connect((err) => {
  if (err) throw err;
  console.log(`Connected to database '${dbOptions.database}'`);
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

    console.log(`New SQL query: SELECT \`${variable}\` [...]`);

    db.query(sqlQuery, (error, results) => {
      if (error) throw error;
      res.send(results);
    });
  } else {
    throw new Error(`Empty variable in SQL request: ${variable}`);
  }
});

app.get('/columns', (req, res) => {
  const sqlQuery = `SHOW columns from \`${table}\``;

  console.log(`New SQL query: ${sqlQuery}`);

  db.query(sqlQuery, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// launch server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
