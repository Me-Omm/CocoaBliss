const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'customers'
});

router.get('/ordersummary', (req,res)=>{
    const cart_number=req.session.cartID;
    const sql3 = 'SELECT * FROM CART1 WHERE CART_ID=?';
    db.query(sql3, [cart_number], (err, result) => {
        if (err) throw err;
    res.render('ordersummary', {cartDetails : result});
    });
    });

module.exports=router;