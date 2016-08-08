
function validEmail(email) { // see:
  conole.log("entered thank_you.js");
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}
// get all data in form and return object
function getFormData() {
  var elements = document.getElementById("form-info-1").elements; // all form elements
  console.log(elements);
  var fields = Object.keys(elements).map(function(k) {
    if(elements[k].name !== undefined) {
      return elements[k].name;
    }
  }).filter(function(item, pos, self) {
    return self.indexOf(item) == pos && item;
  });
  var data = {};
  fields.forEach(function(k){
    data[k] = elements[k].value;
  });
  console.log(data);
  console.log('check 1');
  return data;
}

function handleFormSubmit(event) {  // handles form submit withtout any jquery
  event.preventDefault();           // we are submitting via xhr below
  var data = getFormData();         // get the values submitted in the form
  if( !validEmail(data.email) ) {   // if email is not valid show error
    //document.getElementById('email-invalid').style.display = 'block';
    return false;
  } else {
    console.log('check 2');
    var url = event.target.action + '?';  //
    console.log('check 3');
    var xhr = new XMLHttpRequest();
    console.log('check 4');
    xhr.open('POST', url, false);
    console.log('check 5');
    // xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        console.log( xhr.status, xhr.statusText )
        console.log(xhr.responseText);
        console.log("");
        //document.getElementById('how-it-works-upload').style.display = 'none';
       //document.getElementById('image-display-viewer').style.display = 'none'; // hide form
        document.getElementById('thank-you-message').style.display = 'block';
        return;
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&')
    xhr.send(encoded);
  }
}
// function loaded() {
//   console.log('contact form submission handler loaded successfully');
//   // bind to the submit event of our form
//   var form = document.getElementById('form-info');
//   form.addEventListener("submit", handleFormSubmit, false);
// };
// document.addEventListener('DOMContentLoaded', loaded, false);