/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var scroll = new SmoothScroll('a[href*="#"]', {
	header: '#site-header'
});

(function () {
	$links = document.querySelectorAll('.nav-item');
	$toggle = document.querySelector('.nav-toggle');

	$links = [].slice.call($links);
	$links.push($toggle);

	$links.forEach(function ($link) {
		$link.addEventListener('click', function (e) {
			document.querySelector('.site-nav').classList.toggle('open');
		});
	});
})();

(function () {
	function findAncestor($el, $class) {
		while (($el = $el.parentElement) && !$el.classList.contains($class)) {}
		return $el;
	}

	$buttons = document.querySelectorAll('.bio-toggle');
	$buttons.forEach(function ($button) {
		$button.addEventListener('click', function (e) {
			e.preventDefault();

			$bio = findAncestor($button = e.target.parentNode, 'bio');
			$bio.classList.toggle('is-open');
		});
	});
})();

(function () {
	$('.bg-images').imagesLoaded(function () {

		var controller = new ScrollMagic.Controller();

		function scrollImages(controller) {
			var doc_height = $(document).height();
			var window_height = $(window).height();
			var images_height = $('.bg-images').height();

			console.log(images_height);

			var duration = doc_height - window_height;
			var offset = -(images_height - window_height);
			console.log(doc_height, window_height, images_height, duration, offset);

			var tween = new TimelineMax().add([TweenMax.to(".bg-images", 1, { y: offset })]);

			var scene = new ScrollMagic.Scene({ triggerElement: '#site-main', duration: duration }).setTween(tween).addTo(controller);
		}

		scrollImages(controller);

		$(window).resize(function () {
			controller.destroy();
			controller = null;
			controller = new ScrollMagic.Controller();
			scrollImages(controller);
		});
	});
})();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);