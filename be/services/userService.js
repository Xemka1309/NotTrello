const User = require("../models/userModel");

module.exports = (async function(body){
    return User.create(body);
});
