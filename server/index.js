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
    db.query('SELECT * FROM census_learn_sql LIMIT 10', function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

app.listen(port, function () {
    console.log(`Server running on port ${port}!`);
});
