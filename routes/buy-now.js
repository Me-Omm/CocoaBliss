const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'customers'
});

router.post('/buynow', (req,res)=>{
    const {user_qty}= req.body;
    const sql2 = 'INSERT INTO CART1(product_id,cart_qty,cart_total,id) VALUES (?, ?, ?, ?)';
    const values=[1, user_qty, user_qty*100, req.session.user_id];
    db.query(sql2, values, (err, result) => {
        if (err) throw err;
        const cartID=result.insertId;
        req.session.cartID=cartID;
        const cart_total=user_qty*100;
        req.session.cartTotal=cart_total;
        const cart_quantity=user_qty;
        req.session.cartQty=cart_quantity;
        if(cart_quantity<=req.session.qty)
        {
            res.redirect('/ordersummary');
        }
        else{
            res.send('Unfortunately, the requested quantity is not available at the moment')
        }
    });
})


module.exports = router;