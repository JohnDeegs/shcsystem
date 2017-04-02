$(document).ready(function(){

  let $appDiv = $('#appData');

  //get the url of the current webpage so we can find out the specific patient we're looking at
  let url = window.location.href;
  console.log(url);

  //the url has been returned as a string, so we run the substr JS method to shorten it to MongoDB's id length which is 24
  //this returns to us a 24 character string id that we can now use to make an API call to the appointments collection of
  //our DB
  let urlId = url.substr(url.length - 24);
  console.log(urlId);

  //Calls the appointment data for this patient from this endpoint.
  $.get('../../../profile/patients/appointments/'+urlId+'', (data, status) => {

    //Parses the data
    let obj = JSON.parse(data);

    //displays appointment db data on page
    $appDiv.append(''+obj.date+'');

    //console.log(obj);
    });

    //test data
    var data = {
      date : '1-1-2016',
      report : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      belongs_to : [''+urlId+'']
    };
    /*data.date = '1-1-2016';
    data.report = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';
    data.belongs_to.push(urlId);*/


    $.post('../../../profile/patients/appointments/add/'+urlId+'', data, (result) => {
        console.log("posted");
    });

});
