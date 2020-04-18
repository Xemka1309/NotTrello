const User = require("../models/userModel");

module.exports = (async function(body){
    await User.create(body)
        .then(user => {
            console.log(user);
            return body})
        .catch(err =>
            console.log(err));
        //.resolve("Success");
});
