$(document).ready(function(){

  var patient = [];

  $.get("../profile/patients/search", (data, status) => {

    var obj = JSON.parse(data);

    for(var i = 0; i < obj.length; i++){

      //var newId = obj[i]._id.substr(obj[i]._id.length - 5);

      patient.push(''+obj[i].name+':'+obj[i]._id+'');
    }

    console.log("Get");
    console.log(obj[0].name);
    });


    $('#autocomplete').autocomplete({
      minLength: 2,
      source: patient,
      select: (event, ui) => {
        console.log(ui.item.label);
        doSearch(ui.item.label);
        getApt(ui.item.label);
      }
    });

    let doSearch = (term) => {
      let urlId = term.substr(term.length - 24)
      window.location.href = '/profile/patients/view/'+urlId+''
    }

    console.log(patient);


    //Get patient appointments


});
