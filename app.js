// @Description: All server running configuration is setting up here.
// @CreatedAt:
// @Author-name: Md. Sazzad Bin Anwar

const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
require('dotenv').config();
const connect_MongoDB = require('./config/db/MongoDB');
require('colors');
const port = process.env.PORT || 8080;
const {
    errorHandler,
    notFound
} = require('./middleware/errorHandler');
require('./config/db/Redis');

//This will show the request path for every request only for development mode
if (process.env.NODE_ENV !== 'production') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'public')));

//@Description: To use monogdb connection
connect_MongoDB('eCommerce');

app.use('/api/v1/user', require('./routes/UserRoute'));
app.use('/api/v1/vendor', require('./routes/VendorRoute'));
app.use('/api/v1/category', require('./routes/Category'));
app.use('/api/v1/products', require('./routes/ProductRoute'));
app.use('/api/v1/orders', require('./routes/Orders'));

// app.get('*', (req, res) => {
//     res.cookie('XSRF-TOKEN', req.csrfToken())
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//     console.log('Build file connected');
// });
app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`App is listening on port ${port}!`.cyan.underline));