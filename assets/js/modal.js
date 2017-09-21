var $ = require('jquery');
var getJFFormResults = require('./jotformTransformer.js');


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
		var results = getJFFormResults();
		results.then(function(answers){
			updateResults(answers);
		});
	}

	function updateResults(answers) {
		var $results = $('.modal-section-results .modal-result');

		$results.each(function($i){
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

