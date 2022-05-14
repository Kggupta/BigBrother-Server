const express = require('express');
const {getFranchise} = require('../../utils/DatabaseUtils.js')
const recordRoutes = express.Router();

const PARAMS = [ {endp: "stats/members", param: "member"},
                 {endp: "stats/coowner", param: "coowner"},
                 {endp: "stats/income", param: "income"},
                 {endp: "stats/owner", param: "owner"},
                 {endp: "stats/recruiters", param: "recruiters"},
                 {endp: "stats/access", param: "access"},
                 {endp: "stats/age", param: "age"},
                 {endp: "imports/data", param: "importedData"},
                 {endp: "imports/next", param: "nextImport"},
                 {endp: "cutoff/donation/weekly", param: "donCutW"},
                 {endp: "cutoff/donation/daily", param: "donCutD"},
                 {endp: "cutoff/shifts/weekly", param: "shiftCutW"},
                 {endp: "cutoff/shifts/daily", param:"shiftCutD"},
                 {endp: "data/sheet", param: "sheet"},
                 {endp: "data/logs", param: "logChannel"},
                 {endp: "data/ad/nitro", param: "recnitro"},
                 {endp: "data/ad", param: "recnormal"},
                 {endp: "data/official", param: "officialguild"},
                 {endp: "data/donationroles", param: "autoDonConfig"},
                 {endp: "stats/items", param:"franchiseItems"},
                 {endp: "stats/level", param: "level"},
                 {endp: "stats/shifts", param: "shiftArray"},
                 {endp: "stats/balance", param: "richArray"}]

PARAMS.forEach(param => {
    recordRoutes.route('/franchise/:id/'+param.endp).get(async function (req, res) {
        try {
            const data = await getFranchise(req.params.id, param.param || param.endp);

            res.status(200).json(data);
        }catch (err) {
            console.log(err)
            res.status(404).send(err.message)
        }
    })
})     

recordRoutes.route('/franchise/:id/stats/shifts/latest').get(async function (req, res) {
    try {
        const data = await getFranchise(req.params.id, "shiftArray");

        res.status(200).json(data[data.length - 1]);
    }catch (err) {
        console.log(err)
        res.status(404).send(err.message)
    }
})

recordRoutes.route('/franchise/:id/stats/balance/latest').get(async function (req, res) {
    try {
        const data = await getFranchise(req.params.id, "richArray");

        res.status(200).json(data[data.length - 1]);
    }catch (err) {
        console.log(err)
        res.status(404).send(err.message)
    }
})

module.exports = recordRoutes