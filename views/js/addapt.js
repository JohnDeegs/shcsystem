$(document).ready(function(){

  //activates the time picker plugin
  $('#time').timepicker();

  //get the url of the current webpage so we can find out the specific patient we're looking at
  let url = window.location.href;
  console.log(url);

  //the url has been returned as a string, so we run the substr JS method to shorten it to MongoDB's id length which is 24
  //this returns to us a 24 character string id that we can now use to make an API call to the appointments collection of
  //our DB
  let urlId = url.substr(url.length - 24);
  console.log(urlId);

  /*when the form button has been clicked this function executes
    it selects the form itself and assigns it a new "action". Here it submits it to our API
    using the url variable made earlier. This is to ensure that we assign the appointment
    to the correct patient
  */
  $('#form-btn').on("click", function() {
    $('#saveForm').attr('action', '../../../../profile/patients/appointments/add/'+urlId+'');
    $("#saveForm").submit();
    e.preventDefault();
  });

});
