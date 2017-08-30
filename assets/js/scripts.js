var scroll = new SmoothScroll('a[href*="#"]',{
	header: '#site-header'
});

(function(){

	function toggleClasses(e){
		$nav = document.querySelector('.site-nav');
		$nav.classList.toggle('open');
		console.log('toggled');
	};


	document.querySelector('.nav-toggle').addEventListener('click', toggleClasses);

	$links = document.querySelectorAll('.nav-item');
	for (var i = 0; i < $links.length; i++) {
		$links[i].addEventListener('click', toggleClasses);
	}
})();