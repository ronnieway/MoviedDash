var appCache = 'MovieDash';
var dataCache = 'MovieDashData';
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(dataCache).then(function(cache) {
			return cache.addAll([
				'/index.html',
				'/css/main.css',
				'/js/main.js',
			]);
		})
    );
});

self.addEventListener('activate', function(event) {
	console.log('SWORKER: activating');
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(cacheNames.map(function(cacheName) {
				if (cacheName !== appCache && cacheName !== dataCache) {
					console.log('SWORKER: Deleting '+ cacheName);
					return caches.delete(cacheName);
				}
			}));
		})
	);
});

self.addEventListener('fetch', function(event) {
	console.log('SWORKER: is fetching ' + event.request.url + ' now.');
	if (event.request.url.startsWith('http')) {
		event.respondWith (
			fetch(event.request)
			.then(function(response) {
				return caches.open(appCache).then(function(cache) {
					cache.put(event.request.url, response.clone());
					console.log('SWORKER: fetched cached data');
					return response;
				});
			})
		);
	} else {
		event.respondWith(
			caches.match(event.request).then(function(response) {
				console.log('SWORKER: fetch event', response ? '(cached)' : '(network)', event.request.url);
				return response || fetch(event.request);
			})
		);
	}
});
