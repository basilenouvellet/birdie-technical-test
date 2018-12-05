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
app.get('/data', function (req, res, next) {
    const { variable } = req.query;

    if (variable) {
        const sqlQuery = [
            `SELECT \`${variable}\`, COUNT(\`${variable}\`) AS count, AVG(age) AS average_age`,
            `FROM ${table}`,
            `GROUP BY \`${variable}\``,
            'ORDER BY average_age DESC',
            // 'LIMIT 100',
        ].join(' ');

        console.log(sqlQuery);

        db.query(sqlQuery, function (error, results) {
            if (error) {
                console.error(error);
                next();
            }
            res.send(results);
        });
    } else {
        console.log('Empty variable in SQL request', variable);
        next();
    }

});

app.use('/columns', function (req, res) {
    const sqlQuery = `SHOW columns from ${table}`;

    db.query(sqlQuery, function (error, results) {
        if (error) throw error;
        res.send(results);
    });
});

app.listen(port, function () {
    console.log(`Server running on port ${port}!`);
});
