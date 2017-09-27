var SmoothScroll = require('smooth-scroll');

var scroll = new SmoothScroll(
	'.site-nav a[href*="#"], .modal-section-results a[href*="#"]',
	{ header: '#site-header' }
);
