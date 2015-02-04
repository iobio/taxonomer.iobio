function onFileButtonClicked() { 
  $('#url-input-group').css('visibility', 'hidden');
}

function onFilesSelected(event) {
	if (event.target.files.length == 2) {
		// merge fastq mate pair files
	
	} else if (event.target.files.length == 1) {
		// read fastq
		var fileType0 = /[^.]+$/.exec(event.target.files[0].name)[0];
		if (fileType0 != 'fastq') { alert('file must be a .fastq file'); return; }
		var file = event.target.files[0];
		goFile(file);
	} else {
		alert('select 1 fastq file or 2 fastq files that are mate pairs')
	}
}

function onUrlEntered() {

  // Grab the url here
  var url = $('#url-input').val();

  $('#url-input-group').css('visibility', 'hidden');

  // stream your file here
  goUrl(url);
  window.location.search = 'url=' + url;
}

function displayUrlBox() {
  $('#url-input-group').css('visibility', 'visible');
  $("#url-input").focus();

}

var generateUid = function (separator) {
    /// <summary>
    ///    Creates a unique id for identification purposes.
    /// </summary>
    /// <param name="separator" type="String" optional="true">
    /// The optional separator for grouping the generated segmants: default "-".    
    /// </param>

    var delim = separator || "-";

    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
};ß