function onFileButtonClicked() { 
  $('#url-input-group').css('visibility', 'hidden');
}

function onFilesSelected(event) {
  alert("read your file here");
}

function onUrlEntered() {

  // Grab the url here
  var url = $('#url-input').val();

  $('#url-input-group').css('visibility', 'hidden');

  // stream your file here
  go(url);

}

function displayUrlBox() {
  $('#url-input-group').css('visibility', 'visible');
  $("#url-input").focus();

}