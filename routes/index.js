const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'customers'
});


//let use=null;
router.get('/', (req, res) => {
    res.render('login');
});


router.post('/login', (req, res) => {
    let { username, password } = req.body;
    username = username.toLowerCase().trim(); // Convert to lowercase and trim whitespace
    const sql = `SELECT * FROM users WHERE LOWER(username) = ? AND password = ?`;

    console.log('Login attempt:', username, password);

    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        console.log('Query result:', result);

        if (result.length > 0) {
            const user_id = result[0].id;
            req.session.user_id = user_id;
            console.log('User logged in:', req.session.user_id);
            res.redirect('/products');
        } else {
            console.log('Incorrect username or password');
            res.status(401).send('Incorrect username or password');
        }
    });
});


router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;

    db.query(sql, [username, password], (err, result) => {
        if (err) throw err;
        res.send('Signup successful');
    });
});
module.exports = router;
