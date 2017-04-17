$(document).ready(function(){

  let $pNumber = $("#pNumber");

  $.get("../profile/patients/count", (data, status) => {

    $pNumber.append(''+data.count+'');

  });

});
