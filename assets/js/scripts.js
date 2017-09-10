var scroll = new SmoothScroll('a[href*="#"]',{
	header: '#site-header'
});

(function(){
	$links = document.querySelectorAll('.nav-item');
	$toggle = document.querySelector('.nav-toggle');

	$links = [].slice.call($links);
	$links.push( $toggle );

	$links.forEach(function($link){
		$link.addEventListener('click', function(e){
			document.querySelector('.site-nav').classList.toggle('open');
		});
	});
})();

(function(){
	function findAncestor($el, $class) {
		while ( ($el = $el.parentElement) && !$el.classList.contains($class));
		return $el;
	}

	$buttons = document.querySelectorAll('.bio-toggle');
	$buttons.forEach(function($button){
		$button.addEventListener('click', function(e) {
			e.preventDefault();

			$bio = findAncestor($button = e.target.parentNode, 'bio-body');
			$bio.classList.toggle('is-open');
		});
	});

})();