const express = require('express');
const {getFranchise, updateFranchise} = require('../../utils/DatabaseUtils.js')
const recordRoutes = express.Router();

const PARAMS = [ {endp: "stats/members", param: "member"},
                {endp: "stats/coowner", param: "coowner"},
                {endp: "stats/income", param: "income"},
                {endp: "stats/owner", param: "owner"},
                {endp: "stats/age", param: "age"},
                {endp: "imports/next", param: "nextImport"},
                {endp: "cutoff/donation/weekly", param: "donCutW"},
                {endp: "cutoff/donation/daily", param: "donCutD"},
                {endp: "cutoff/shifts/weekly", param: "shiftCutW"},
                {endp: "cutoff/shifts/daily", param:"shiftCutD"},
                {endp: "data/logs", param: "logChannel"},
                {endp: "data/ad/nitro", param: "recnitro"},
                {endp: "data/ad", param: "recnormal"},
                {endp: "data/official", param: "officialguild"},
                {endp: "stats/level", param: "level"}]

PARAMS.forEach(param => {
    recordRoutes.route('/franchise/:id/' + param.endp).patch(async (req, res) => {
        let id = req.params.id;
        let value = req.body.value;
        if (value == undefined) { res.sendStatus(400); return; }
        try {
            await getFranchise(id);
            const updates = {$set:{}};
            updates.$set[param.param || param.endp] = value;
            updateFranchise(id, updates);
        } catch (err) {
            console.log(err);
            res.status(404).send("Franchise not found.")
        }
    })
})

module.exports = recordRoutes