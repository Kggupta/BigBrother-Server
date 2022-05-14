const express = require('express');
const {getGuild, updateGuild} = require('../../utils/DatabaseUtils.js')
const recordRoutes = express.Router();

const PARAMS = [{endp: 'patreon'}, 
                {endp: 'prefix/tacoshack', param: 'tacoprefix'}, 
                {endp: 'prefix/bb', param:'bbprefix'}, 
                {endp: 'channels/warn', param: 'warnChannel'}, 
                {endp: 'roles/ping', param:'pingRole'}, 
                {endp: 'delay', param:'pingDelay'}, 
                {endp: 'unscrambleTime'} ] 

PARAMS.forEach(param => {
    recordRoutes.route('/stock/:id/' + param.endp).patch(async (req, res) => {
        let id = req.params.id;
        let value = req.body.value;
        if (value == undefined) { res.sendStatus(400); return; }
        try {
            await getGuild(id);
            const updates = {$set:{}};
            updates.$set[param.param || param.endp] = value;
            updateGuild(id, updates);
        } catch (err) {
            console.log(err);
            res.status(404).send("Guild not found.")
        }
    })
})

module.exports = recordRoutes