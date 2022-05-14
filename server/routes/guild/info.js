const express = require('express');
const {getGuild} = require('../../utils/DatabaseUtils.js')
const PARAMS = [{endp: 'patreon'}, 
                {endp: 'prefix/tacoshack', param: 'tacoprefix'}, 
                {endp: 'prefix/bb', param:'bbprefix'}, 
                {endp: 'channels/mod', param:'customerChannels'}, 
                {endp: 'channels/warn', param: 'warnChannel'}, 
                {endp: 'whitelist', param:'whitelistedWords'},
                {endp: 'roles/ping', param:'pingRole'}, 
                {endp: 'delay', param:'pingDelay'}, 
                {endp: 'channels/ping', param:'customerPingChannels'},
                {endp: 'channels/unscramble', param:'unscrambleChannels'},
                {endp: 'unscrambleTime'} ] 
const recordRoutes = express.Router();


PARAMS.forEach(param => {
    recordRoutes.route('/guild/:id/'+param.endp).get(async function (req, res) {
        try {
            const data = await getGuild(req.params.id, param.param || param.endp);
    
            res.status(200).json(data);
        }catch (err) {
            console.log(err)
            res.status(404).send(err.message)
        }
    })
})

module.exports = recordRoutes