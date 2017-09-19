var $ = require('jquery');
// var JF = require('./jotform.js');

const jf_api_key = 'd7d54abea4a6385adda90e55f26ddf55';
const jf_form_id = '72595797285174';

$(document).ready(function(){
	$html = $('html');
	$page1 = $('.modal-section-questions');
	$page2 = $('.modal-section-results');

	if (typeof JF != 'undefined') {
		JF.initialize({ apiKey: jf_api_key });
		console.log('JF Initialized');
	}

	function toggleModalDisplay() {
		$html.toggleClass('modal-open');
		$html.toggleClass('no-scroll');
	}

	function toggleModalPages() {
		$page1.toggleClass('is-hidden');
		$page2.toggleClass('is-hidden');
		$results = getJFFormResults();
		updateResults($results);
	}

	function getJFFormResults() {
		return ['12','12','12','12'];
	}

	function updateResults($array) {
		$('.modal-result-number').each(function($i){
			$(this).text($array[$i] + "%");
		});
	}

	toggleModalDisplay();

	$('[name="modal-question"]').on('change', function(e){
		console.log("Changed");
		e.preventDefault();
		toggleModalPages();
	});

	$('#modal-form').submit(function(e){
		console.log("Submitted");
		e.preventDefault();
		toggleModalPages();
	});

	$('.modal-section-results .btn').click(function(e){
		console.log("Closing Modal");
		toggleModalDisplay();
	});
});

