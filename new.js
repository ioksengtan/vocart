var appUrl = 'https://script.google.com/macros/s/AKfycbzR4fhfQmSrbFrf336DHrKKodAUsRTN-Yf7_tyXStyH1Q8glYc/exec';
function new_vocart(){
	parameter = {
		"url":"https://docs.google.com/spreadsheets/d/1xRnAGXr3d7rL9PDIYtG9L6F827TEthKmCoje_veaKNo/edit#gid=0",
        "command":"postArticleVocarts",
        "data":$('#input_text').val(),
	};
		
	$('#button_new').html('uploading');
	$.post(appUrl, parameter, function(data) {
		console.log('new article id:' + data);
		$('#button_new').html('updated');
	});
	
}