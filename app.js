const express = require('express');
const app = express();//route handling
const morgan = require('morgan');//node pkg for dynamically processing changes so we don't have to refresh server all the time 
const mongoose = require('mongoose');//db schema
const productRoutes = require('./API/routes/products');
const orderRoutes = require('./API/routes/orders');

const admin = process.env.MONGO_ATLAS_PW;

//start mongoose server
mongoose.connect('mongodb://username:@@@@@@@@@@@@!@cluster0-shard-00-00-aekpg.mongodb.net:27017,cluster0-shard-00-01-aekpg.mongodb.net:27017,cluster0-shard-00-02-aekpg.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true });

//Route middleware PKGs app.use()
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {//handles origin headers
    res.header('Access-Control-Allow-Origin', '*');//provides access 
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {//allows us to limit the methods we want to support
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
});

//Routes created to handle requests
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

//Error handlers for when app is not able to route requests
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: { message: error.message }
    });
});

module.exports = app;//export so that you can import the module in other files
