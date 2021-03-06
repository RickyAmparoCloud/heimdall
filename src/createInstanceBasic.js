'use strict'

const { post, put } = require('./api');
const util = require('./utils')

module.exports = async (req, props, config) => {
    const instance = {   
        name: `${req.elementKey}-${Date.now()}`,
        tags: [
            req.elementKey // tag instances w/ element key to filter out non-relevant instances when retrieving all instances for a data source
        ],
        element:{
            key: req.elementKey 
        },
        configuration: util.buildConfiguration(config.properties, props)    
    }

    if (req.uniqueName) {
        instance.name = req.uniqueName
    }
    
    if (req.instanceId) {
        return await put(`instances/${req.instanceId}`, instance, req.authData)
    } else {
        return await post('instances', instance, req.authData)
    }
}