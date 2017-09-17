var $ = require('jquery');

$(document).ready(function(){
	$html = $('html');
	$section_questions = $('.modal-section-questions');
	$section_results = $('.modal-section-results');
	$form = $('#modal-form');
	$questions = $form.find('input[type="radio"]');
	$results_btns = $section_results.find('.btn');

	function toggleModalDisplay() {
		$html.toggleClass('modal-open');
		$html.toggleClass('no-scroll');
	}

	toggleModalDisplay();

	$questions.on('click', function(){
		$('#modal-form').submit();
	})

	$form.on('submit', function(e){
		e.preventDefault();

		$data = $(this).serializeArray();
		console.log($data[0].value);

		$section_questions.toggleClass('is-hidden');
		$section_results.toggleClass('is-hidden');
	})

	$results_btns.on('click', function(e){
		toggleModalDisplay();
	});
})