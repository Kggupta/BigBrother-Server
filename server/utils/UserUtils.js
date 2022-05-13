
const connection = require('../db/Connection');

/**
 * Get the user from the database
 * @param {String} id - User ID
 * @param {String} param - OPTIONAL: The user parameter to get.
 * @returns 
 */
async function getUser(id, param) {
    const dbConnect = connection.getDb();

    const user = await dbConnect
        .collection('users')
        .findOne({id})
    if (!user) {
        throw Error("User not found.")
    } else if (param) {
        if (!user[param]) {throw Error("Parameter doesn't exist.")}
        return user[param];
    } else {
        return user;
    }
}


/**
 * Delete the user from the database
 * 
 * @param {String} id - User ID
 * @returns 
 */
function deleteUser(id) {
    const dbConnect = connection.getDb();
    dbConnect
        .collection('users')
        .deleteOne({id});
}


/**
 * Update a user parameter with value
 * @param {String} id - The user ID
 * @param {Object} param - the query for the update
 * @param {Any} value - The new value
 */
async function updateUser(id, updates, value) {
    const dbConnect = connection.getDb();
    
    dbConnect
        .collection('users')
        .updateOne({id}, updates, function (err, _result) {
            if (err) {
              throw Error("Could not update parameter.")
            } else {
              console.log(`Successfully updated: ID ${id} - (${JSON.stringify(updates)} = ${value})`);
            }
          });
}

module.exports = {getUser, deleteUser, updateUser}