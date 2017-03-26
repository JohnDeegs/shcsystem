// app/models/user.js
// load the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the schema for our user model
let patientSchema = mongoose.Schema({

        name: String,
        age: String,
        address: String,
        gender: String,
        phone: String,
        belongs_to: [
          {type: Schema.Types.ObjectId, ref: 'User'}
        ]

});

// create the model and expose it to our app
module.exports = mongoose.model('PatientInfos', patientSchema);
