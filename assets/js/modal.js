var $ = require('jquery');
var JFTransformer = require('./jotformTransformer.js');

$(document).ready(function(){
	$html = $('html');
	$page1 = $('.modal-section-questions');
	$page2 = $('.modal-section-results');
	$form = $('#modal-form');

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

	function updateQuestions(data) {
		$form.find('[type="radio"]').each(function(i){
			$(this).val(data.options[i]);
		})
	}

	function formSubmitted(e) {
		e.preventDefault();

		$page1.toggleClass('is-hidden');
		JFTransformer.submitAnswer( $form.serializeArray()[0].value )
			.then(function(){
				return JFTransformer.getResults();
			})
			.then(function(answers){
				updateResults(answers);
				$page2.toggleClass('is-hidden');
			});
	}

	toggleModalDisplay();

	JFTransformer.getQuestions()
		.then(function(response){
			updateQuestions(response);
			$page1.toggleClass('is-hidden');
		});

	$('[type="radio"]').on('change', formSubmitted);
	$form.submit(formSubmitted);
	$('.modal-section-results .btn').click(toggleModalDisplay);
});

