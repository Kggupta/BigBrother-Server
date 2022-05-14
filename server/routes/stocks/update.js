const express = require('express');
const {getStock, updateStock} = require('../../utils/DatabaseUtils.js')
const recordRoutes = express.Router();

recordRoutes.route('/stock/:id/name').patch(async (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    if (name == undefined) {
        res.sendStatus(400);
        return;
    }
    try {
        await getStock(id);
        const updates = {$set:{}};
        updates.$set["item"] = name;
        updateStock(id, updates);
    } catch (err) {
        console.log(err);
        res.status(404).send("Stock not found.");
    }
});

recordRoutes.route('/stock/:id/new').patch(async (req, res) => {
    let id = req.params.id;
    let price = req.body.price;
    if (!price || !Number.isInteger(price)) {
        res.sendStatus(400);
        return;
    }
    try {
        await getStock(id);
        const updates = {$push:{}};
        updates.$push["priceArray"] = {value: price, date: Date.now()};
        updateStock(id, updates);
    } catch (err) {
        console.log(err);
        res.status(404).send("Stock not found.");
    }
});

module.exports = recordRoutes