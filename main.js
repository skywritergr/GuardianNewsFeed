var app = (function(){
	'use strict';
	var ukNewsAPIURL = 'http://content.guardianapis.com/uk-news?api-key=9wur7sdh84azzazdt3ye54k4&show-fields=all&order-by=newest';
	var footballAPIURL = 'http://content.guardianapis.com/football?api-key=9wur7sdh84azzazdt3ye54k4&show-fields=all&order-by=newest';
	var travelAPIURL = 'http://content.guardianapis.com/travel?api-key=9wur7sdh84azzazdt3ye54k4&show-fields=all&order-by=newest';

	function getSection(APIUrl, sectionID){
		atomic.get(APIUrl)
		.success(function(data){
			data.response.results.forEach(function(el){
				var resultHTML = '<li><a href="'+ el.webUrl +'"><img src="'+ el.fields.thumbnail +'"><p>'+ el.webTitle + ' - ' + el.fields.trailText +'</p></a></li>';
				document.getElementById(sectionID).getElementsByTagName('OL')[0].insertAdjacentHTML('beforeend',resultHTML);

			});
		})
		.error(function(data){
			console.error('Whoops! Something went wrong.');
		});
	}

	function getData(){
		//set news as the default tab if there is no direct link already.
		if(document.location.hash === ''){
			document.getElementById('news').getElementsByTagName('a')[0].click();
		}

		// fetch the data for each tab.
		getSection(ukNewsAPIURL, 'news');
		getSection(footballAPIURL, 'football');
		getSection(travelAPIURL, 'travel');
	}

	return {
		getData: getData
	}
})();

app.getData();