var httpRequest;
var requestedData;
var allIDs = [];
var searchItem = 0;

function searchClicked() {
	document.getElementById('search-selected').style.display='block';
	document.getElementById('upload-selected').style.display='none';
	document.getElementById('search-button').style.color='#00cafe';
	document.getElementById('upload-button').style.color='white';
	document.getElementById('bottom-section-upload').style.display='none';
	document.getElementById('bottom-section-search').style.display='block';
};

function uploadClicked() {
	document.getElementById('search-selected').style.display='none';
	document.getElementById('upload-selected').style.display='block';
	document.getElementById('search-button').style.color='white';
	document.getElementById('upload-button').style.color='#00cafe';
	document.getElementById('bottom-section-search').style.display='none';
	document.getElementById('bottom-section-upload').style.display='block';
};

function key_down(e) {
    if(window.event && window.event.keyCode === 13) {
    	if(document.getElementById('search-bar').value !='') {
			document.getElementById('how-it-works').style.display='none';
			getSearchQuery();
    	}
		else 
			document.getElementById('search-bar').placeholder = 'Must enter an item to begin...';
    }
};

function getSearchQuery() {
	searchItem = document.getElementById('search-bar').value;
	console.log(searchItem);
    cleanAll();
    document.getElementById('image-search-bottom').style.display='initial';
    request(searchItem);
};

function cleanAll() {
	allIDs=[];
	document.getElementById('how-it-works').style.display='none';
	document.getElementById('image-selection').innerHTML='';
	document.getElementById('image-selection-form').innerHTML='';
};

function request(searchItem)
{
    console.log("Entered query function");
    httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
        console.log("request failed");
        return false;
    }

    httpRequest.onreadystatechange = displayContents; 
    httpRequest.open('GET', 'https://www.googleapis.com/customsearch/v1?q=' + searchItem + '&cx=005483833404371296958:6au7lags92i&num=10&searchType=image&key=AIzaSyAoVPF3SSCABAlSjtY9WLvZ9blIpNnOoY8', true);
    httpRequest.send();
};
function displayContents() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                requestedData = JSON.parse(httpRequest.responseText);
                parseData();
            } else {
                console.log("There was a problem with the request"); 
            }
        } 
};
function parseData() {
    for (var i = 0; i < 10; i++) {
        var urlid = requestedData["items"][i]["link"];
        allIDs.push(urlid);
    }
    embedResults(allIDs, 10);
};
function embedResults(allIDs, count) {

	document.getElementById('image-selection').innerHTML += '<h2>Select an image</h2>';
	document.getElementById('image-selection').innerHTML += '<div id="image-container" class="image-container"></div>'
    for (var i = 0; i < 10; i++) {
        document.getElementById('image-container').innerHTML +=  '<div id="image-formatting-' + i + '" class="image-formatting"><img class="image-' + i + ' hover-image" id="image-' + i + '" onclick="isSelected(' + i + ')" src="' + allIDs[i] + '" onerror="imageError(' + i + ')"/></div>';
        var proportion = document.getElementById('image-' + i).style.height / document.getElementById('image-' + i).style.width;
        document.getElementById('image-' + i).style.height = "150px";
        var newWidth = 150 / proportion;
        document.getElementById('image-' + i).style.width = newWidth;   
    }
};
function imageError(index) {
	document.getElementById('image-formatting-' + index).style.display='none';
};
function isSelected(num) {
    unselectAll();
    var x = document.getElementsByClassName('image-' + num);
    x[0].style.outline = "thick solid #00cafe";
    showSurvey(num);
    document.getElementById('scrolling-link').click();
};

function unselectAll() {
    for (var i = 0; i < 10; i++) {
        var z = document.getElementsByClassName('image-' + i);
        z[0].style.outline= '0px solid #00cafe'; 
    }
};
function showSurvey(num) {
	searchItem = searchItem.replace(/\s+/g, '-');;
	document.getElementById('image-selection-form').innerHTML='';
	document.getElementById('image-selection-form').innerHTML+='<div class="form-information"><p class="information-text">Thank you for selecting your desired model. We will now reconstruct a 3D model of the image you selected. Please fill out the data below and we will in touch within 48 hours!</p></div>';
	document.getElementById('image-selection-form').innerHTML+='<form action="https://script.google.com/macros/s/AKfycbxFQcPIQYXI3wSwo14dRTJ4lyF_Ci5xWxk0HYOxdoY5n2d291I/exec" method="POST" id="form-info"><br><br>name <input class="input-field" type="text" name="full-name" value="" placeholder="full name" required><br>email <input class="input-field" type="text" name="email" value="" required><br><div class="additional-notes">notes<textarea class="notes" type="text" name="additional-notes" value="" placeholder="e.g. recolor to blue"></textarea></div><input class="submit-button" type="submit" value="START"><input type="hidden" name="searched-item" value="' + searchItem + '"><input type="hidden" name="url-searched-item" value=' + allIDs[num] + '><br><br><br></form>';
	loaded();
};
function readURL(input) {
	document.getElementById('path').value = document.getElementById('myfile').value.replace("C:\\fakepath\\", '');
    fileName = document.getElementById('path').value;
    document.getElementById('how-it-works-upload').style.display='none';
    document.getElementById('image-display-viewer').style.display='block';

    if (input.files && input.files[0]) {
    	var reader = new FileReader();

    	reader.onload = function(e) {
    		$('#image-display')
    			.attr('src', e.target.result)
    			//var proportion = input.files[0].width/input.files[0].height;
    			.width(320)
    			.height(300)
    		document.getElementById('form-viewer').innerHTML='';
    		document.getElementById('form-viewer').innerHTML+='<div class="form-information"><br><br><p class="information-text">Thank you for selecting your desired model. We will now reconstruct a 3D model of the image you selected. Please fill out the data below and we will in touch within 48 hours!</p></div>';
    		document.getElementById('form-viewer').innerHTML+='<form id="form-info-1" action="https://script.google.com/macros/s/AKfycbxFQcPIQYXI3wSwo14dRTJ4lyF_Ci5xWxk0HYOxdoY5n2d291I/exec" data-type="JSON" method="POST"><br><br>name <input class="input-field" type="text" name="full-name" value="" placeholder="full name" required><br>email <input class="input-field" type="text" name="email" value="" required><br><div class="additional-notes">notes<textarea class="notes" type="text" name="additional-notes" value="" placeholder="e.g. recolor to blue"></textarea></div><input class="submit-button" type="submit" value="START"><input type="hidden" name="searched-item" value="' + searchItem + '"><input type="hidden" name="url-searched-item" value="upload a file"><br><br><br></form>';
    		loaded();
    	};

    	reader.readAsDataURL(input.files[0]);
    }
};

function loaded() {
  console.log('contact form submission handler loaded successfully');
  // bind to the submit event of our form
  var form = document.getElementById('form-info-1');
  var form2 = document.getElementById('form-info');
  if (form !== null)
  	form.addEventListener("submit", handleFormSubmit, false);
  if (form2 !== null)
  	form2.addEventListener("submit", handleFormSubmit, false);
};
document.addEventListener('DOMContentLoaded', loaded, false);



