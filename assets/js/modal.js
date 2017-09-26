var $ = require('jquery');
var JFTransformer = require('./jotformTransformer.js');

$(document).ready(function(){
	$html = $('html');
	$page1 = $('.modal-section-questions');
	$page2 = $('.modal-section-results');

	function toggleModalDisplay() {
		$html.toggleClass('modal-open');
		$html.toggleClass('no-scroll');
	}

	function toggleModalPages() {
		$page1.toggleClass('is-hidden');
		$page2.toggleClass('is-hidden');
		
		JFTransformer.getResults()
			.then(function(answers){
				updateResults(answers);
			});
	}

	function updateResults(answers) {
		$('.modal-section-results .modal-result').each(function(){
			var text = $(this).find('.modal-result-description').text().trim();
			var $percent = $(this).find('.modal-result-number');
			var key = answers.findIndex(function(item){
				return item.answer === text;
			});

			if (key >= 0) {
				$percent.text(answers[key].percent + "%");
			}
		});
	}

	toggleModalDisplay();

	$('[name="modal-question"]').on('change', function(e){
		e.preventDefault();
		toggleModalPages();
	});

	$('#modal-form').submit(function(e){
		e.preventDefault();
		toggleModalPages();
	});

	$('.modal-section-results .btn').click(function(e){
		toggleModalDisplay();
	});
});

