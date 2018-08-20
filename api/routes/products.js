const express = require('express');
const router = express.Router();//creates post/get and other HTTP requests
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {//handles get requests
    Product.find()
        .select('name price _id description')
        .exec()
        .then(docs => {
            if (docs.length >= 0) {
                res.status(200).json(docs);
            }
            else {
                res.status(404).json({ message: 'No entries found' })
            }
        });
});

router.get('/:productId', (req, res, next) => {//handles get requests
    const id = req.params.productId;
    Product.findById(id)
        .select('name price _id description')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.post('/', (req, res, next) => {//handles post requests
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    });//creates mongo obj to save to db

    product
        .save()
        .then(result => {//stores obj in db
            //console.log(result);
            res.status(201).json({
                //message: "Handling POST requests to /products",
                createdProduct: result
            });
        })
        .catch(err => console.log(err));
});

router.patch('/:productId', (req, res, next) => {//handles get requests
    const id = req.params.productId;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.delete('/', (req, res, next) => {//handles get requests
    Product.remove()
        .exec()
        .then(docs => {
            if (!docs) {
                res.status(404).send({ message: "Docs not found" });
            }
            res.send({ message: "Documents deleted successfully!" });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });

});

router.delete('/:productId', (req, res, next) => {//handles get requests
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(docs => {
            if (!docs) {
                res.status(404).send({ message: "Docs not found" });
            }
            res.send({
                message: 'Product with id' + id + ' deleted successfully!',
                productId: id
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;//used for importing routes to app.js file