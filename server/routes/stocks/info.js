const express = require('express');
const {getStock} = require('../../utils/DatabaseUtils.js')
const recordRoutes = express.Router();

const PARAMS = [ {endp: 'name', param: 'item'}, 
                {endp: 'prices', param: 'priceArray'},  ] 

PARAMS.forEach(param => {
    recordRoutes.route('/stock/:id/'+param.endp).get(async function (req, res) {
        try {
            const data = await getStock(req.params.id, param.param || param.endp);
    
            res.status(200).json(data);
        }catch (err) {
            console.log(err)
            res.status(404).send(err.message)
        }
    })
})


recordRoutes.route('/stock/:id/latest').get(async function (req, res) {
    try {
        const prices = await getStock(req.params.id, "priceArray");

        res.status(200).json(prices[prices.length - 1]);
    }catch (err) {
        console.log(err)
        res.status(404).send(err.message)
    }
});

module.exports = recordRoutes
