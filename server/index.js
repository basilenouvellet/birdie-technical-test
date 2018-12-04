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

// connect to database
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// routes
app.use('/data', function (req, res) {
    const sqlQuery = 'SELECT education, COUNT(education), AVG(age) '
        + 'FROM census_learn_sql '
        + 'GROUP BY education '
        + 'ORDER BY AVG(age) DESC '
        + 'LIMIT 100';

    db.query(sqlQuery, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

app.listen(port, function () {
    console.log(`Server running on port ${port}!`);
});
