const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'customers'
});

router.get('/products', (req, res) => {
    const sql = `SELECT qty FROM product`;
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (result.length > 0) {
            const quantity = result[0].qty;
            req.session.qty = quantity;
            res.render('product', { quantity });
        } else {
            res.send('No products found');
        }
    });
});

module.exports = router;