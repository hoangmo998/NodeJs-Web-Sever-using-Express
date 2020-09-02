require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
var csurf = require('csurf');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);
const userRoute = require('./routes/user.route')
const productRoute = require('./routes/product.route');
const cartRoute = require('./routes/cart.route')
const authRoute = require('./routes/auth.route');
const transferRoute = require('./routes/transfer.route')
const apiProductRoute = require('./api/routes/product.route')

const authMiddleware = require('./middlewares/auth.middleware')
const sessionMiddleware = require('./middlewares/session.middleware')

const port = 3000;

const app = express();


app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/products', apiProductRoute)

app.use(cookieParser(process.env.SESSION_SECRET))

app.use(sessionMiddleware)
    // app.use(csurf({ cookie: true }));

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {
        name: 'AAA'
    })
});
app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/transfer', authMiddleware.requireAuth, transferRoute)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});