$(document).ready(function() {

  //In order to speed up the browser DOM we assign the JQuery selectors to JS variables
    let $aptFuture = $('#aptFuture');
    let $aptHistory = $('#aptHistory');
    let $divBtnFuture = $('#divBtnFuture');
    let $divBtnHistory = $('#divBtnHistory')

    let $divBtnOptions = $('#divBtnOptions');

    let $btnTextEdit = $('#btnTextEdit');
    let $btnTextDelete = $('#btnTextDelete');

    //get the url of the current webpage so we can find out the specific patient we're looking at
    let url = window.location.href;
    console.log(url);

    //the url has been returned as a string, so we run the substr JS method to shorten it to MongoDB's id length which is 24
    //this returns to us a 24 character string id that we can now use to make an API call to the appointments collection of
    //our DB
    let urlId = url.substr(url.length - 24);
    console.log(urlId);

    //activate the API endpoints upon clicking the following buttons
    $btnTextEdit.click(function(){
      window.location.href='../../../profile/patients/edit/'+urlId+'';
    })

    $btnTextDelete.click(function(){
      window.location.href='../../../profile/patients/delete/'+urlId+'';
    })

    //Calls the appointment data for this patient from this endpoint.
    $.get('../../../profile/patients/appointments/get/' + urlId + '', (data, status) => {

        //Parses the data
        let obj = JSON.parse(data);

        //allows us to use the data in for loop
        let x = Object.keys(obj).length;

        //empty dates array which will hold all the dates from our db
        let dates = [];

        //get todays date
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

        //formatting string to include 0s before single digit days and/or months
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }
        //sets todays date into one single string
        let thisDate = yyyy + '/' + mm + '/' + dd;

        //sets these to strings for our if/else statement later
        let presentYear = yyyy.toString();
        let presentMonth = mm.toString();
        let presentDay = dd.toString();

        //pushes all of our dates in our db to our empty dates array above
        for (var i = 0; i < x; i++) {
            dates.push(obj[i].date);
        }

        //these will store the future and past dates that we'll sort in our if/else statement
        let upcomingDates = [];
        let pastDates = [];

        for (let i = 0; i < x; i++) {

            let objDate = obj[i].date;

            let aptYear = objDate.substring(0, 4);
            let aptMonth = objDate.substring(5, 7);
            let aptDay = objDate.substring(8, 10);

            if (presentYear == aptYear) {
                if (presentMonth == aptMonth) {
                    if (presentDay == aptDay) {
                        upcomingDates.push(obj[i]);
                    } else if (presentDay < aptDay) {
                        upcomingDates.push(obj[i]);
                    } else {
                        pastDates.push(obj[i]);
                    }
                } else if (presentMonth < aptMonth) {
                    upcomingDates.push(obj[i]);
                } else {
                    pastDates.push(obj[i]);
                }
            } else if (presentYear < aptYear) {
                upcomingDates.push(obj[i]);
            } else {
                pastDates.push(obj[i]);
            }
        }

        //We sort the future appointments by the most recent
        upcomingDates.sort(function(a, b) {
            var keyA = new Date(a.date),
                keyB = new Date(b.date);
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });

        //We sort the past appointments by the most recent
        pastDates.sort(function(a, b) {
            var keyA = new Date(a.date),
                keyB = new Date(b.date);
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });

        /*We loop through the upcomingDates object and append
          the correct value that we want to the corresponding div
        */
        for (let i = 0; i < upcomingDates.length; i++) {
            $aptFuture.append('<div id="future"><h3>' + upcomingDates[i].date + ' ' + upcomingDates[i].time + '</h3><p id="report">' + upcomingDates[i].report + '</p><a href="../../../profile/patients/appointments/edit/' + upcomingDates[i]._id + '"><button id="btnText" class="btn btn-success">Edit</button></a><a href="../../../profile/patients/appointments/delete/' + upcomingDates[i]._id + '"><button id="btnText" class="btn btn-success">Delete</button></a></div>');
        }

        for (let i = 0; i < pastDates.length; i++) {
            $aptHistory.append('<div id="future"><h3>' + pastDates[i].date + ' ' + pastDates[i].time + '</h3><p id="report">' + pastDates[i].report + '</p><a href="../../../profile/patients/appointments/edit/' + pastDates[i]._id + '"><button id="btnText" class="btn btn-success">Edit</button></a><a href="../../../profile/patients/appointments/delete/' + pastDates[i]._id + '"><button id="btnText" class="btn btn-success">Delete</button></a></div>');
        }

    });


    /* Using this JQuery, we can use animations to fade in and out the list of appointments on click */
    $divBtnHistory.click(function() {
        $('#aptHistory').fadeToggle("fast", "linear");
    });

    $divBtnFuture.click(function() {
        $('#aptFuture').fadeToggle("fast", "linear");
    });

    $divBtnOptions.click(function() {
      $('#showForm').fadeToggle("fast", "linear");
    });


});
