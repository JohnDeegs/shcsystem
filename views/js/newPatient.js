$(document).ready(function(){

  //In order to speed up the browser DOM we assign the JQuery selectors to JS variables
  let $saveForm = $('#saveForm');
  let $formbtn = $('#form-btn');

  /*On click of the form-btn, trigger this function
    We assign the value of the user gender input in the saveForm to a variable with the same name.
    We switch the input to lower case to match the condition of the EJS for loop on the patients.ejs in
    order to get the correct gender.
  */

  $formbtn.click(() => {

    let gender = $('#gender').val();

    $('#gender').val(gender.toLowerCase());

    $saveForm.submit();

  });


});
