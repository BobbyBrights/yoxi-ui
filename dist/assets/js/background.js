var $ = require('jquery');
var imagesLoaded = require('imagesloaded');
var ScrollMagic = require('scrollmagic');
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import {TweenMax, Power2, TimelineLite} from "gsap";

imagesLoaded.makeJQueryPlugin( $ );

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
});