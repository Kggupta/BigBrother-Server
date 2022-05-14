const express = require('express');
const {getUser, deleteUser, updateUser} = require('../../utils/DatabaseUtils.js')
const RANKS = ["Gordon", "None", "Executive", "Head", "Sous", "Apprentice"]
const TWELVE_HOURS = 43200000;
const recordRoutes = express.Router();

recordRoutes.route('/user/:id').delete(async (req, res) => {
    const id = req.params.id;
    try {
        await getUser(id);
        deleteUser(id);

        res.status(200).send("Successfully deleted user.");
    } catch (err) {
        console.log(err)
        res.status(404).send(err.message)
    }
});

recordRoutes.route('/user/:id/name').patch(async (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    if (!name) {
        res.sendStatus(400);
        return;
    }
    try {
        await getUser(id);
        const updates = {$set:{}};
        updates.$set["shackName"] = name;
        updateUser(id, updates, name);
        res.status(200).send("Success.");
    } catch (err) {
        console.log(err);
        res.status(404).send("User not found.");
    }
});



recordRoutes.route('/user/:id/donator').patch(async (req, res) => {
    let id = req.params.id;
    let status = req.body.status;
    if (!RANKS.includes(status)) {
        res.sendStatus(400);
        return;
    }
    try {
        await getUser(id);
        const updates = {$set:{}};
        updates.$set["donatorStatus"] = status;
        updateUser(id, updates, status);
        res.status(200).send("Success.");
    } catch (err) {
        console.log(err);
        res.status(404).send("User not found.");
    }
});

recordRoutes.route('/user/:id/newvote').patch(async function (req, res) {
    let id = req.params.id;
    try {
        await getUser(id);
        const updates = {$set: {}, $inc:{}};
        updates.$inc["snapShotTokens"] = 1;
        updates.$set["dateAvailable"] = Date.now() + TWELVE_HOURS;
        updateUser(id, updates, 1);
        res.status(200).send("Success.")
    }catch (err) {
        console.log(err)
        res.status(404).send(err.message)
    }
});


module.exports = recordRoutes;