// app/models/user.js
// load the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the schema for our user model
let infoSchema = mongoose.Schema({

        photo: String,
        name: String,
        work: String,
        city: String,
        belongs_to: [
          {type: Schema.Types.ObjectId, ref: 'User'}
        ]

});

// create the model and expose it to our app
module.exports = mongoose.model('UserInfos', infoSchema);
