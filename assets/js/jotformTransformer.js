var JFTransformer = function() {
	const jf_api_key = 'd7d54abea4a6385adda90e55f26ddf55';
	const jf_form_id = '72595797285174';

	if (typeof JF != 'undefined') {
		JF.initialize({ apiKey: jf_api_key });
		console.log('JF Initialized');
	}

	function formatResponse(response) {
		return response.map(function(entry){
			return entry.answers['1'].answer;
		}).filter(function(entry){
			return entry !== undefined;
		}).map(function(entry){
			return (typeof(entry) === 'object') ? 'Other' : entry;
		});
	}

	function groupByAnswer(entries) {
		return entries.reduce(function(sum, entry){
			var index = sum.findIndex(function(answer){
				return answer.answer === entry;
			});
			if(index >= 0) {
				sum[index].count++;
			} else {
				sum.push({'answer': entry, 'count': 1}); 
			}
			return sum;
		}, []); 
	}

	function includePercents(answers) {
		var totalResponses = answers.reduce(function(sum, item){
			return sum + item.count;
		}, 0);

		return answers.map(function(item) {
			item.percent = Math.floor( (item.count / totalResponses) * 100);
			return item;
		});
	}

	function getQuestions() {
		return new Promise(function(resolve, reject){
			JF.getFormQuestions(jf_form_id, function(response){
				resolve({
					'question': response['1'].text,
					'options': response['1'].options.split('|')
				});
			});
		});
	}

	function getResults() {
		return new Promise(function(resolve, reject){
			JF.getFormSubmissions(jf_form_id, function(response){
				response = formatResponse(response);
				response = groupByAnswer(response);
				response = includePercents(response);
				resolve(response);
			});
		});
	}

	function submitAnswer(answer) {
		return new Promise(function(resolve,reject){
			JF.createFormSubmission(jf_form_id, { '1': answer }, function(response){
				console.log(response);
				resolve(response);
			});
		});
	}

	return {
		getResults: getResults,
		submitAnswer: submitAnswer,
		getQuestions: getQuestions,
	}
};

module.exports = JFTransformer();