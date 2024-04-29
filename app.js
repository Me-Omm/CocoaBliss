const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql2');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    store: new session.MemoryStore()
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'customers'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database');
});

const indexRoute = require('./routes/index');
app.use('/', indexRoute);
const productRoute = require('./routes/products');
app.use('/', productRoute);
const buynowRoute = require('./routes/buy-now');
app.use('/', buynowRoute);
const ordersummaryRoute = require('./routes/ordersummary');
app.use('/', ordersummaryRoute);
const placeorderRoute = require('./routes/placeorder');
app.use('/', placeorderRoute);
const viewordersRoute = require('./routes/view-orders');
app.use('/', viewordersRoute);
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
