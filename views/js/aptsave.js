$(document).ready(function(){

  $('#time').timepicker();

  /*//get the url of the current webpage to get the current apt id to save to in mongodb
  let url = window.location.href;
  console.log(url);

  //the url has been returned as a string, so we run the substr JS method to shorten it to MongoDB's id length which is 24
  //this returns to us a 24 character string id that we can now use to make an API call to the appointments collection of
  //our DB
  let urlId = url.substr(url.length - 24);
  console.log(urlId);

  let form = document.getElementById('saveForm') || null;
  if(form){
    form.action = '/profile/patients/appointments/save/'+urlId+'';
  }*/

});
