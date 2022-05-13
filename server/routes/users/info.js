const express = require('express');
const {getUser} = require('../../utils/UserUtils.js')
const recordRoutes = express.Router();

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

recordRoutes.route('/user/:id/name').get(async function (req, res) {
    try {
        const name = await getUser(req.params.id, "shackName");
        res.json(name)
    }catch (err) {
        console.log(err)
        res.status(404).send(err.message)
    }
});

recordRoutes.route('/user/:id/donator').get(async function (req, res) {
    try {
        const donator = await getUser(req.params.id, "donatorStatus");
        res.json(donator)
    }catch (err) {
        console.log(err)
        res.status(404).send(err.message)
    }
});

recordRoutes.route('/user/:id/tokens').get(async function (req, res) {
    try {
        const tokens = await getUser(req.params.id, "snapShotTokens");
        res.json(tokens)
    }catch (err) {
        console.log(err)
        res.status(404).send(err.message)
    }
});

recordRoutes.route('/user/:id/dm').get(async function (req, res) {
    try {
        const dm = await getUser(req.params.id, "dmremind");
        res.json(dm)
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


recordRoutes.route('/user/:id/snapshots').get(async function (req, res) {
    try {
        const snaps = await getUser(req.params.id, "snaps");
        res.json(snaps)
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