const User = require("../models/userModel");

module.exports = (async function(body){
    await User.create(body).then(value => {
        console.log("value");
    }).catch(err => console.log(err))
        .resolve("Success");
});
