const infoSchema = require('./models/userinfo.js');
const patientSchema = require('./models/patients.js');

// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {
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

      infoSchema.findOne({
      belongs_to: user_id //allows us to get data specific to the user
      }, (err, info) => {
            res.render('profile.ejs', {
              userData: info
            });
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
      var input = JSON.parse(JSON.stringify(req.body));

    //  console.log(input);

      const saveData = (args, err) => {
        if(!!err){
          console.log("Error retrieving data");
          return false;
        }else{
          let data = new infoSchema(args);
          //this pushes our user's unique ID to the collection
          data.belongs_to.push(req.user.id);
          data.save();
          console.log("Passed data successfully");
        }
      }

      saveData(input);

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

    app.post('/profile/patients/add', isLoggedIn, (req, res) => {

      let data = new patientSchema();

      data.name = 'John Smith';
      data.age = '21';
      data.gender = 'male';
      data.address = 'Flower Lane, Dublin 1';
      data.phone = '085736472';
      data.belongs_to.push(req.user.id);

      data.save();

      console.log("Success!");

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
