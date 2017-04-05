$(document).ready(function(){

  $('#time').timepicker();

  //get the url of the current webpage so we can find out the specific patient we're looking at
  let url = window.location.href;
  console.log(url);

  //the url has been returned as a string, so we run the substr JS method to shorten it to MongoDB's id length which is 24
  //this returns to us a 24 character string id that we can now use to make an API call to the appointments collection of
  //our DB
  let urlId = url.substr(url.length - 24);
  console.log(urlId);

  $('#form-btn').on("click", function() {
    $('#saveForm').attr('action', '../../../../profile/patients/appointments/add/'+urlId+'');
    $("#saveForm").submit();
    e.preventDefault();
  })

  //Calls the appointment data for this patient from this endpoint.
  $.post('../../../profile/patients/appointments/add/'+urlId+'', (data, status) => {

    //Parses the data
    let obj = JSON.parse(data);

    //displays appointment db data on page


    console.log(JSON.stringify(obj));
    });

});
