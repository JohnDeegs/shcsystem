'use strict';

const mongoose = require('mongoose');

const ObjectID = require('mongodb').ObjectID;

module.exports.id = "my-migration";

module.exports.up = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging


  //==================================================
  //===========ADD USER ==============================
  //==================================================




  //==================================================
  //===========ADD PATIENTS============================
  //==================================================

  let patientColl = this.db.collection('patientinfos');

  let placeHolder = [];

  placeHolder.push(new ObjectID());

  let pateintData = [
  {
    _id: placeHolder[0],
    phone: '085741235',
    address: '1 Flower Lane',
    gender: 'female',
    age: '8',
    name: 'Louise Burke',
    belongs_to: [ObjectID("58fd08d2049309338811bee3")]
  },
  {
    _id: new ObjectID(),
    phone: '085741235',
    address: '4 Rose Street',
    gender: 'male',
    age: '14',
    name: 'David Rollins',
    belongs_to: [ObjectID("58fd08d2049309338811bee3")]
  },
  {
    _id: new ObjectID(),
    phone: '085741235',
    address: '8 Daffodil Park',
    gender: 'female',
    age: '21',
    name: 'Alexia Hart',
    belongs_to: [ObjectID("58fd08d2049309338811bee3")]
  },
  {
    _id: new ObjectID(),
    phone: '085741235',
    address: '12 Tulip Road',
    gender: 'male',
    age: '26',
    name: 'Jordan Belfort',
    belongs_to: [ObjectID("58fd08d2049309338811bee3")]
  },
  {
    _id: new ObjectID(),
    phone: '085741235',
    address: '10 Violet Avenue',
    gender: 'female',
    age: '42',
    name: 'Celine Dion',
    belongs_to: [ObjectID("58fd08d2049309338811bee3")]
  }
];

  //Add above data to patient collumn

  patientColl.insert(pateintData);

  //==================================================
  //===========ADD APPOINTMENTS ======================
  //==================================================

  let aptColl = this.db.collection('aptinfos');

  let aptData = [
    {
      _id: new ObjectID(),
      time: '2:00pm',
      report: 'Injured wrist',
      date: '2018-04-09',
      belongs_to: [ObjectID(''+placeHolder[0]+'')]
    },
    {
      _id: new ObjectID(),
      time: '5:00pm',
      report: 'Migraines',
      date: '2016-07-02',
      belongs_to: [ObjectID(''+placeHolder[0]+'')]
    },
    {
      _id: new ObjectID(),
      time: '2:00pm',
      report: 'Kidney Stone, sent consulatation to St.Vincents hospital Dublin.',
      date: '2017-01-02',
      belongs_to: [ObjectID(''+placeHolder[0]+'')]
    },
    {
      _id: new ObjectID(),
      time: '4:00pm',
      report: 'Broken Ankle',
      date: '2019-10-02',
      belongs_to: [ObjectID(''+placeHolder[0]+'')]
    },
    {
      _id: new ObjectID(),
      time: '2:00pm',
      report: 'Gum Disease',
      date: '2011-07-02',
      belongs_to: [ObjectID(''+placeHolder[0]+'')]
    }
  ]

  aptColl.insert(aptData);

  //==================================================
  //===========ADD APPOINTMENTS ======================
  //==================================================

  let infoColl = this.db.collection('userinfos');

  let infoData = [
    {
      _id: new ObjectID(),
      name: 'John Doe',
      work: 'IFSC Clinic',
      city: 'Dublin 1',
      belongs_to: [ObjectID("58fd08d2049309338811bee3")]
    }
  ]

  infoColl.insert(infoData);

};

module.exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  coll.remove({}, done);
};
