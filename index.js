var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const util = require('util');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mysqlpractice"
});
const query = util.promisify(con.query).bind(con);

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

// create Table
// con.query("CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255))", function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
// })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// get all users
app.get('/api/users', async (req, res, next) => {
    const users = await query("SELECT * FROM users")
    res.send(users)
});

// create user
app.post('/api/users', async (req, res, next) => {
    const { name, email, password } = req.body
    let user = await query(`SELECT * FROM users WHERE email = "${email}"`)
    if (user.length > 0)
        return res.status(400).send('User already exists')

    const items = [`"${name}"`, `"${email}"`, `"${password}"`]
    user = await query(`INSERT INTO users (name,email,password) VALUES (${items})`, [name, email, password])
    res.status(201).send(user)
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})









