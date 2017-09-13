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

			$bio = findAncestor($button = e.target.parentNode, 'bio');
			$bio.classList.toggle('is-open');
		});
	});

})();

(function(){
	$('.bg-images').imagesLoaded(function(){

		var controller = new ScrollMagic.Controller();

		function scrollImages(controller) {
			var doc_height = $(document).height();
			var window_height = $(window).height();
			var images_height = $('.bg-images').height();

			console.log(images_height);

			var duration = doc_height - window_height;
			var offset = -(images_height - window_height);
			console.log(doc_height, window_height, images_height, duration, offset);

			
			var tween = new TimelineMax()
				.add([
					TweenMax.to( ".bg-images", 1, { y: (offset) })
				]);

			var scene = new ScrollMagic.Scene({ triggerElement: '#site-main', duration: (duration)})
				.setTween(tween)
				.addTo(controller);
		}

		scrollImages(controller);

		$(window).resize(function(){
			controller.destroy();
			controller = null;
			controller = new ScrollMagic.Controller();
			scrollImages(controller);
		});
	})
})();