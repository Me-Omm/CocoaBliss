const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'customers'
});

router.post('/placeorder', (req,res)=>{
    const order_total=req.session.cartTotal;
    req.session.name=req.body.name;
    req.session.flat=req.body.flat;
    req.session.street=req.body.street;
    req.session.city=req.body.city;
    req.session.pincode=req.body.pincode;
    req.session.phone=req.body.phone;
    const updatedQuantity=req.session.cartQty;
    const sql='UPDATE PRODUCT SET QTY=QTY-? WHERE PRODUCT_ID=1';
    db.query(sql, [updatedQuantity], (err, result) => {
        if (err) throw err;
    });

    const sqlOrders = 'INSERT INTO orders(order_total,order_date,delivery_status,id,shipping_name, flat, street,city,pincode,phone_number) VALUES (?, null, ?, ?,?,?,?,?,?,?)';
    values=[order_total+49, 'Yet to be delivered', req.session.user_id, req.session.name,req.session.flat,req.session.street,req.session.city,req.session.pincode, req.session.phone];
    db.query(sqlOrders, values, (err, result) => {
        if (err) throw err;
        res.render('orderplaced');
    });
})

module.exports=router;