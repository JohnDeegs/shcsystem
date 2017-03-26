// app/models/user.js
// load the things we need
const mongoose = require('mongoose');

// define the schema for our user model
let infoSchema = mongoose.Schema({

        userinformation        : {
        employeeOf: String,
        name: String,
        age: Number,
        image: String,
        address: String
    }

});

// create the model and expose it to our app
module.exports = mongoose.model('UserInfo', infoSchema);
