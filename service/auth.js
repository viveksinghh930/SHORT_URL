// const sessionIdToUserMap= new Map();  // ---statefull--
require('dotenv').config();
const jwt = require('jsonwebtoken'); // ---stateless--
const secret = process.env.SECRETTOKEN; 

// function setUser(id, user) { // ---statefull--
//     // sessionIdToUserMap.set(id, user);// ---statefull--
// }
function setUser(user) { // ---stateless--
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secret);
}

//  function getUser(id) {  // ---statefull--
//  return   sessionIdToUserMap.get(id);
//  }


function getUser(token) { // ---stateless--
    if (!token) return null;
    try {
    return jwt.verify(token, secret);
        
    } catch (error) {
        return null;
    }
}
module.exports = { setUser, getUser };