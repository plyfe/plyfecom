// This file exists because there is currently
// no way to pass instantiation info to require.js
// in stitch setup. See http://github.hubspot.com/pace/ for 
// config methods.
paceOptions = {
	ajax: {
		trackMethods: [ 'PUT', 'GET', 'POST' ],
		ignoreURLs: [ 'optimizely', 
			'mentions?q',
			'cloudfront',
			'images',
			'interactions',
			'notifications',
			'page_metadata',
			'img/defaults',
			'ytimg' ]
	},
	minTime: 0,
	ghostTime: 0
}