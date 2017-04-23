const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const infoSchema = require('./models/userinfo.js');
const patientSchema = require('./models/patients.js');
const aptSchema = require('./models/appointments.js');
const db = ('./config/db.js').url;

// app/routes.js
module.exports = (app, passport) => {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', (req, res) => {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', (req, res) => {
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn,(req, res) => {

      let user_id = req.user.id;

      /*infoSchema.findOne({
      belongs_to: user_id //allows us to get data specific to the user
      }, (err, info) => {
        if(err){
          console.log("Error");
          return false;
        }else{

          console.log("Found user already");
        }
      });*/

      infoSchema.findOne({
      belongs_to: user_id //allows us to get data specific to the user
      }, (err, info) => {
        if(err){
          console.log("Error occured");
          return false;
        }else{
          if(!info){
            info = new infoSchema();

            info.photo = "";
            info.name = "First Timer User? Edit your information by clicking the Edit button";
            info.location = "";
            info.work = "";
            info.belongs_to = [req.user.id];

            info.save();
          }
          res.render('profile.ejs', {
            userData: info
          });
        }
        });

    });

    // Allow the doctor to save his/her own information
    //app.post('/profile', isLoggedIn, (req, res) => {

  //  });


    //======================================
    // EDIT PROFILE ========================
    //======================================
    //This allows the doctor to edit his/her own information

    app.get('/profile/edit', isLoggedIn, (req, res) => {
      res.render('editProfile.ejs', {
        user: req.user
      });
    });

    //======================================
    // Save PROFILE ========================
    //======================================
    //This allows the doctor to save his/her own information

    app.post('/profile/edit/save', isLoggedIn, (req, res) => {
      let input = JSON.parse(JSON.stringify(req.body));

      let id = req.user.id;
      console.log(input.name);

      let query = {'belongs_to': id};

      infoSchema.findOneAndUpdate(query, input, {upsert:false}, (err, doc) => {
        if (err) throw err;
        console.log(doc);
      })

      res.redirect('/profile');
    });

    //======================================
    // PATIENTS ============================
    //======================================

    //Get all patients

    app.get('/profile/patients', isLoggedIn, (req, res) => {

      patientSchema.find({})
      .exec((err, patients) => {
        if(!!err){
          console.log("Error occurred");
        }else{
          console.log("Got data!");
          res.render('patients.ejs', {
            user: req.user,
            patientData: patients
          });
        }
      })

    });

    //Get total number of patients

    app.get('/profile/patients/count', isLoggedIn, (req, res) => {

      let user_id = req.user.id;

      patientSchema.find({belongs_to: user_id}).exec((err, results) => {
        let count = results.length;
        console.log(count);
        res.send({count});
      });

    });

    //add

    app.get('/profile/patients/addnew', isLoggedIn, (req, res) => {

      res.render('newPatient.ejs');

    });

    app.post('/profile/patients/add', isLoggedIn, (req, res) => {

      let data = new patientSchema();

      data.name = req.body.name;
      data.age = req.body.age;
      data.gender = req.body.gender;
      data.address = req.body.address;
      data.phone = req.body.phone;
      data.belongs_to.push(req.user.id);

      data.save();

      console.log("Success!");

      res.redirect('/profile/patients');

    });

    app.get('/profile/patients/view/:id', isLoggedIn, (req, res) => {
      let id = req.params.id;

      patientSchema.findOne({
      _id : id //allows us to get data specific to the user
    }, (err, patientArg) => {
        if(err){
          console.log("Error occured");
          return false;
        }else{
          res.render('onePatient.ejs', {
            onePatientData: patientArg
          });
        }
        });

    });

    //======================================
    // SEACRH PATIENTS =====================
    //======================================

    app.get('/profile/patients/search', isLoggedIn, (req, res) => {
      let key = req.query.key;

      patientSchema.find({})
      .exec((err, patients) => {
        if(!!err){
          console.log("Error occurred");
        }else{
          let jsonData = JSON.stringify(patients);
          console.log("Got data!");
          res.send(jsonData);
        }
      });

    });

    //=========================================
    // EDIT PATIENTS ==========================
    //=========================================

    app.get('/profile/patients/edit/:id', isLoggedIn, (req, res) => {

      let id = req.params.id;
      console.log(id);

      patientSchema.findOne({
      _id : id //allows us to get data specific to the user
    }, (err, onePatientArg) => {
        if(err){
          console.log("Error occured");
          return false;
        }else{
          res.render('editPatient.ejs', {
            onePatientData: onePatientArg
          });
        }
        });

    });

    //=========================================
    // DELETE PATIENTS ========================
    //=========================================

    app.get('/profile/patients/delete/:id', isLoggedIn, (req, res) => {

      let id = req.params.id;
      console.log(id);

      patientSchema.findOneAndRemove({_id: id}, (err, user) => {
        if(err) throw err;

        console.log("OBSOLETE!");


      });

      res.redirect('/profile/patients');
    });

    //=========================================
    // APPOINTMENTS ===========================
    //=========================================

    app.get('/profile/patients/appointments/get/:id', isLoggedIn, (req, res) => {

      let id = req.params.id;
      console.log(id);

      /*aptSchema.findOne({
      belongs_to : id //allows us to get data specific to the user
    }, (err, aptArg) => {
        if(err){
          console.log("Error occured");
          return false;
        }else{
          let jsonData = JSON.stringify(aptArg);
          console.log("Got data from app.get('/profile/patients/appointments/:id')");
          console.log(jsonData)
          res.send(jsonData);
        }
      });*/

        aptSchema.find({
          'belongs_to': id
        }, (err, docs) => {
          if(err) throw err;


          let jsonData = JSON.stringify(docs);
          console.log(docs);
          res.send(jsonData);
        });

    });


    //----------------------
    // ADD NEW APPOINTMENTS
    //----------------------

    app.get('/profile/patients/appointments/addNew/:id', isLoggedIn, (req, res) => {

      res.render('newApt.ejs');

    });

    app.post('/profile/patients/appointments/add/:id', isLoggedIn, (req, res) => {

      //create a new instance of our appointment model
      let data = new aptSchema();

      let input = JSON.parse(JSON.stringify(req.body));

      let id = req.params.id;
      console.log(id);

      //get the data send from our client side POST req and assign it to our schema
      data.date = input.date;
      data.report = input.report;
      data.time = input.time;
      data.belongs_to.push(id);

      //console.log(data);

      //save the new schema to our db
      data.save();

      res.redirect('/profile/patients')

      console.log("Success!");

    });

    //Edit appointments

    app.get('/profile/patients/appointments/edit/:id', isLoggedIn, (req, res) => {

      let id = req.params.id;
      console.log(id);

      aptSchema.findOne({
      _id : id //allows us to get data specific to the user
    }, (err, oneAptArg) => {
        if(err){
          console.log("Error occured");
          return false;
        }else{
          res.render('oneApt.ejs', {
            oneAppData: oneAptArg
          });
        }
        });

    });

    app.post('/profile/patients/appointments/save/:id', isLoggedIn, (req, res) => {

      let input = JSON.parse(JSON.stringify(req.body));

      let id = req.params.id;
      console.log(id);

      let query = {'_id': id};
      console.log(query);

      aptSchema.findOneAndUpdate(query, input, {upsert:false}, (err, doc) => {
        if (err) throw err;
        console.log(doc);
      })

      res.redirect('/profile/patients');
    });

    //===========DELETE APT ==============

    app.get('/profile/patients/appointments/delete/:id', isLoggedIn, (req, res) => {

      let id = req.params.id;
      console.log(id);

      aptSchema.findOneAndRemove({_id: id}, (err, user) => {
        if(err) throw err;

        console.log("OBSOLETE!");

      });

      res.redirect('/profile/patients')

    });


    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
