const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');

router.get('/', (req, res, next) => {//handles get requests
    Order.find()
        .select('_id product quantity date')//shows the params to be displayed
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

router.get('/:orderId', (req, res, next) => {//handles get requests
    const id = req.params.orderId;
    Order.findById(id)
        .select('_id product quantity date')
        .exec()
        .then(order => {
            console.log("From database", order);
            res.status(200).json(order);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.post('/', (req, res, next) => {//handles post requests
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        product: req.body.product,
        quantity: req.body.quantity,
        date: req.body.date
    });//creates mongo obj to save to db

    order
        .save()
        .then(result => {//stores obj in db
            res.status(201).json({
                message: "Handling POST requests to /orders",
                createdOrder: result
            });
        })
        .catch(err => console.log(err));
});

router.patch('/:orderId', (req, res, next) => {//handles get requests
    const id = req.params.orderId;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Order.update({ _id: id }, { $set: updateOps })
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
    Order.remove()
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

router.delete('/:orderId', (req, res, next) => {//handles get requests
    const id = req.params.orderId;
    Order.remove({ _id: id })
        .exec()
        .then(result => {
            if (!result) {
                res.status(404).send({ message: "Docs not found" });
            }
            res.send({
                message: 'Order with id' + id + ' deleted successfully!',
                orderId: id
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;//used for importing routes to app.js file