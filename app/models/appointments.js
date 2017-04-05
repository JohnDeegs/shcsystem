// app/models/user.js
// load the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the schema for our user model
let aptSchema = mongoose.Schema({


        date: String,
        time: String,
        report: String,
        belongs_to: [
          {type: Schema.Types.ObjectId, ref: 'PatientInfos'}
        ]

});

// create the model and expose it to our app
module.exports = mongoose.model('AptInfos', aptSchema);
