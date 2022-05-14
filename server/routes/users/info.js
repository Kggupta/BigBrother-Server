const express = require('express');
const {getUser} = require('../../utils/DatabaseUtils.js')
const recordRoutes = express.Router();
const PARAMS = [ {endp: 'name', param: 'shackName'}, 
                 {endp: 'donator', param: 'donatorStatus'},
                 {endp: 'tokens', param: 'snapShotTokens'},
                 {endp: 'dm', param: 'dmremind'},
                 {endp: 'snapshots', param: 'snaps'},
               ]

PARAMS.forEach(param => {
    recordRoutes.route('/user/:id/'+param.endp).get(async function (req, res) {
        console.log(param.param)
        try {
            const data = await getUser(req.params.id, param.param || param.endp);
    
            res.status(200).json(data);
        }catch (err) {
            console.log(err)
            res.status(404).send(err.message)
        }
    })
})


recordRoutes.route('/user/:id/items/:location').get(async function (req, res) {
    let location;
    switch(req.params.location) {
        case "city":
            location = "beachItems";
            break;
        case "beach":
            location = "cityItems";
            break;
        default:
            location = "items";
            break;
    }
    try {
        const items = await getUser(req.params.id, location);
        res.json(items)
    }catch (err) {
        console.log(err)
        res.status(404).send(err.message)
    }
});


recordRoutes.route('/user/:id/streak').get(async function (req, res) {
    try {
        let streak = 0;
        const user = await getUser(req.params.id);
        if (Date.now() > user["streakExpire"]) 
            res.json(streak);
        else
            res.json(user["streak"])
    }catch (err) {
        console.log(err)
        res.status(404).send(err.message)
    }
});

recordRoutes.route('/user/:id/snapshots/:snapid').get(async function (req, res) {
    try {
        const snaps = await getUser(req.params.id, "snaps");
        const data = snaps.find(element => element["id"] === req.params.snapid.toLowerCase())
        if (!data) throw Error("Snap ID not found.")
        res.json(data);
    }catch (err) {
        console.log(err)
        res.status(404).send(err.message)
    }
});




module.exports = recordRoutes;