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

  let pateintData = [
  {
    _id: new ObjectID(),
    phone: '085741235',
    address: '1 Flower Lane',
    gender: 'female',
    age: '8',
    name: 'Louise Burke',
    belongs_to: [ObjectID("58d6f77a70fb928c20738e04")]
  },
  {
    _id: new ObjectID(),
    phone: '085741235',
    address: '4 Rose Street',
    gender: 'male',
    age: '14',
    name: 'David Rollins',
    belongs_to: [ObjectID("58d6f77a70fb928c20738e04")]
  },
  {
    _id: new ObjectID(),
    phone: '085741235',
    address: '8 Daffodil Park',
    gender: 'female',
    age: '21',
    name: 'Alexia Hart',
    belongs_to: [ObjectID("58d6f77a70fb928c20738e04")]
  },
  {
    _id: new ObjectID(),
    phone: '085741235',
    address: '12 Tulip Road',
    gender: 'male',
    age: '26',
    name: 'Jordan Belfort',
    belongs_to: [ObjectID("58d6f77a70fb928c20738e04")]
  },
  {
    _id: new ObjectID(),
    phone: '085741235',
    address: '10 Violet Avenue',
    gender: 'female',
    age: '42',
    name: 'Celine Dion',
    belongs_to: [ObjectID("58d6f77a70fb928c20738e04")]
  }
];

  //Add above data to patient collumn

  patientColl.insert(pateintData);

  //==================================================
  //===========ADD USER ==============================
  //==================================================

  let aptColl = this.db.collection('aptinfos');

  let aptData = [
    {
      _id: new ObjectID(),
      time: '2:00pm',
      report: 'Injured wrist',
      date: '2015-04-09',
      belongs_to: [ObjectID("58d94118876764114858157d")]
    },
    {
      _id: new ObjectID(),
      time: '5:00pm',
      report: 'Migraines',
      date: '2016-07-02',
      belongs_to: [ObjectID("58d94118876764114858157d")]
    },
    {
      _id: new ObjectID(),
      time: '2:00pm',
      report: 'Kidney Stone, sent consulatation to St.Vincents hospital Dublin.',
      date: '2017-01-02',
      belongs_to: [ObjectID("58d94118876764114858157d")]
    },
    {
      _id: new ObjectID(),
      time: '4:00pm',
      report: 'Broken Ankle',
      date: '2012-10-02',
      belongs_to: [ObjectID("58d94118876764114858157d")]
    },
    {
      _id: new ObjectID(),
      time: '2:00pm',
      report: 'Gum Disease',
      date: '2011-07-02',
      belongs_to: [ObjectID("58d94118876764114858157d")]
    }
  ]

  aptColl.insert(aptData);

  //==================================================
  //===========ADD APPOINTMENTS ======================
  //==================================================




};

module.exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  coll.remove({}, done);
};
