const connection = require('../db/Connection');

/**
 * Get a document from the mongo server
 * @param {String} collection - The collection to get from
 * @param {String} id - the id to use
 * @param {String} param - 
 * @returns Document
 */
async function getDocument(collection, id, param) {
    const dbConnect = connection.getDb();
    let document = undefined;
    switch(collection) {
        case "franchises":
            document = await dbConnect
            .collection(collection)
            .findOne({franchiseKey:id})
            break;
        default:
            await dbConnect
            .collection(collection)
            .findOne({id})
            break;
    }
    if (document == undefined) {
        throw Error("Document not found.")
    } else if (param) {
        if (document[param] == undefined) {throw Error("Parameter doesn't exist.")}
        return document[param];
    } else {
        return document;
    }
}


/**
 * Update a document in the mongo server
 * @param {String} collection - The collection
 * @param {*} id - The document id
 * @param {*} updates - The updates to make
 */
async function updateDocument(collection, id, updates) {
    const dbConnect = connection.getDb();
    dbConnect
        .collection(collection)
        .updateOne({id}, updates, function (err, _result) {
            if (err) {
              throw Error("Could not update parameter.")
            } else {
              console.log(`Successfully updated: COLLECTION ${collection} at ID ${id} - (${JSON.stringify(updates)})`);
            }
        });
}

/**
 * Delete from the database
 * 
 * @param {String} collection - The collection to delete from
 * @param {String} id - ID
 * @returns 
 */
function deleteDocument(collection, id) {
    const dbConnect = connection.getDb();
    dbConnect
        .collection(collection)
        .deleteOne({id});
}


/**
 * Get franchise document
 * @param {String} id - Franchise ID
 * @param {*} param - Mongo parameter
 * @returns 
 */
async function getFranchise(id, param) {
    return await getDocument('franchises', id, param);
}

/**
 * Update franchise document
 * @param {String} id - Franchise ID
 * @param {*} param - Mongo parameter
 * @returns 
 */
 async function updateFranchise(id, updates) {
    const dbConnect = connection.getDb();
    dbConnect
        .collection('franchises')
        .updateOne({franchiseKey:id}, updates, function (err, _result) {
            if (err) {
              throw Error("Could not update parameter.")
            } else {
              console.log(`Successfully updated: COLLECTION franchises at ID ${id} - (${JSON.stringify(updates)})`);
            }
        });
}


/**
 * Get guild document
 * @param {String} id 
 * @param {String} param 
 * @returns 
 */
async function getGuild(id, param) {
    return await getDocument('guilds', id, param);
}


/**
 * Get stock document
 * @param {String} id - STOCK ID
 * @param {String} param - Mongo parameter
 * @returns 
 */
async function getStock(id, param) {
    return await getDocument('sauces', id, param);
}


/**
 * Get user document
 * @param {String} id - USER ID
 * @param {String} param - Mongo parameter
 * @returns USER
 */
async function getUser(id, param) {
    return await getDocument('users', id, param);
}


/**
 * Update user parameters
 * @param {String} id - USER ID
 * @param {Object} updates - Mongo undates
 */
async function updateUser(id, updates) {
    await updateDocument('users', id, updates);
}


/**
 * Update guild parameters
 * @param {String} id - GUILD ID
 * @param {Object} updates - Mongo updates
 */
async function updateGuild(id, updates) {
    await updateDocument('guilds', id, updates);
}


/**
 * Update stock parameters
 * @param {String} id - STOCK ID
 * @param {Object} updates - Mongo updates
 */
async function updateStock(id, updates) {
    await updateDocument('sauces', id, updates);
}

/**
 * Delete user from db
 * @param {String} id - USER ID
 */
async function deleteUser(id) {
    await deleteDocument('users', id);
}


module.exports = {getUser, getGuild, getStock,
                  updateUser, updateGuild, updateStock,
                  deleteUser, getFranchise, updateFranchise}