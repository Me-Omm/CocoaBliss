const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'customers'
});

router.get('/view-order' , (req,res)=>{
    const sql1 = `SELECT * FROM Orders where id = ?`;
    db.query(sql1, [req.session.user_id], (err, result) => {
        if (err) throw err;
        res.render('vieworders', {orders : result});
    });
})
module.exports=router;