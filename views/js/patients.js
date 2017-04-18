$(document).ready(function(){
  //declare the patient array that we will modify later on
  var patient = [];

  //send a JQuery GET request to our server for data at the specified endpoint
  $.get("../profile/patients/search", (data, status) => {

    //we parse the data recieved into a JS object that we can use.
    var obj = JSON.parse(data);

    /*We loop through the assigned obj variable and push to the patients array specific
    values that we have retrieved from our database. This will allow us to use these
    values for the quick search AJAX later */

    for(var i = 0; i < obj.length; i++){
      patient.push(''+obj[i].name+':'+obj[i]._id+'');
    }

    });

    /*This selects the autocomplete input from patients.ejs, using a JQuery
      plugin, we can use live suggested results based on what the user has
      already inputted. For example, "Jo" will return a suggested patient record
      of "John Smith" followed by the patient's ID

      Using the doSearch function, we can allow the user to click on the suggested
      auto complete name which will then take them to that patient's record page
      by adding the correct ID to the end of the API endpoint for retireving a
      specific patient

      */
    $('#autocomplete').autocomplete({
      minLength: 2,
      source: patient,
      select: (event, ui) => {
        doSearch(ui.item.label);
        getApt(ui.item.label);
      }
    });

    let doSearch = (term) => {
      let urlId = term.substr(term.length - 24)
      window.location.href = '/profile/patients/view/'+urlId+''
    }

});
