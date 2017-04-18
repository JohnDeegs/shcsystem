$(document).ready(function(){
  //In order to speed up the browser DOM we assign the JQuery selectors to JS variables
  let $pNumber = $("#pNumber");

  /*With this JQuery GET request we are aiming to find the correct amount of patients
  stored for a user so we get the correct number to display on the user's profile
  page

  After the GET request has retrieved the data from the DB, we append it to the
  div that displays the doctor's number of patients
  */
  $.get("../profile/patients/count", (data, status) => {

    $pNumber.append(''+data.count+'');

  });

});
