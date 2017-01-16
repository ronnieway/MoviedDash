'use strict';

self.addEventListener('load', function () {
	// At first, let's check if we have permission for notification
	// If not, let's ask for it
	if (window.Notification && Notification.permission !== 'granted') {
		Notification.requestPermission(function (status) {
			if (Notification.permission !== status) {
				Notification.permission = status;
			}
		});
	} else {
		console.log('Not granted');
	}
});

self.addEventListener('install', function (event) {
	event.waitUntil(caches.open('RDDashboard').then(function (cache) {
		return cache.addAll(['/index.html', '/css/main.css', '/js/main.js', '/others/2016.11.csv', '/others/2016.12.csv', '/others/2016Total.csv', '/others/2017.01.csv', '/others/cities.csv']);
	}));
});

self.addEventListener('activate', function (event) {
	event.waitUntil(caches.keys().then(function (cacheNames) {
		return Promise.all(cacheNames.filter(function (cacheName) {
			return cacheName !== 'RDDashboard';
		}).map(function (cacheName) {
			console.log('Deleting ' + cacheName);
			return caches.delete(cacheName);
		}));
	}));
});

self.addEventListener('fetch', function (event) {
	console.log('WORKER: fetch event in progress.');

	// We should only cache GET requests, and deal with the rest of method in the client-side, 
	//	by handling failed POST,PUT,PATCH,etc. requests.
	//
	if (event.request.method !== 'GET') {
		// If we don't block the event as shown below, then the request will go to
		//	the network as usual.
		//
		console.log('WORKER: fetch event ignored.', event.request.method, event.request.url);
		return;
	}
	// Similar to event.waitUntil in that it blocks the fetch event on a promise.
	//	Fulfillment result will be used as the response, and rejection will end in a
	//	HTTP response indicating failure.
	//
	event.respondWith(caches
	// This method returns a promise that resolves to a cache entry matching
	//	the request. Once the promise is settled, we can then provide a response
	//	to the fetch request.
	//
	.match(event.request).then(function (cached) {
		// Even if the response is in our cache, we go to the network as well.
		//	This pattern is known for producing "eventually fresh" responses,
		//	where we return cached responses immediately, and meanwhile pull
		//	a network response and store that in the cache.
		//	Read more:
		//	https://ponyfoo.com/articles/progressive-networking-serviceworker
		//
		var networked = fetch(event.request)
		// We handle the network request with success and failure scenarios.
		.then(fetchedFromNetwork, unableToResolve)
		// We should catch errors on the fetchedFromNetwork handler as well.
		.catch(unableToResolve);

		// We return the cached response immediately if there is one, and fall
		//	back to waiting on the network as usual.
		//
		console.log('WORKER: fetch event', cached ? '(cached)' : '(network)', event.request.url);
		return cached || networked;

		function fetchedFromNetwork(response) {
			// We copy the response before replying to the network request.
			//	This is the response that will be stored on the ServiceWorker cache.
			//
			var cacheCopy = response.clone();
			console.log('WORKER: fetch response from network.', event.request.url);

			caches
			// We open a cache to store the response for this request.
			.open('RDDashboard').then(function add(cache) {
				// We store the response for this request. It'll later become
				//	available to caches.match(event.request) calls, when looking
				//	for cached responses.
				//
				cache.add(event.request);
			}).then(function () {
				console.log('WORKER: fetch response stored in cache.', event.request.url);
			});

			// Return the response so that the promise is settled in fulfillment.
			return response;
		}

		// When this method is called, it means we were unable to produce a response
		//	from either the cache or the network. This is our opportunity to produce
		//	a meaningful response even when all else fails. It's the last chance, so
		//	you probably want to display a "Service Unavailable" view or a generic
		//	error response.
		//
		function unableToResolve() {
			// There's a couple of things we can do here.
			//	- Test the Accept header and then return one of the `offlineFundamentals`
			//	e.g: `return caches.match('/some/cached/image.png')`
			//	- You should also consider the origin. It's easier to decide what
			//	"unavailable" means for requests against your origins than for requests
			//	against a third party, such as an ad provider.
			//	- Generate a Response programmaticaly, as shown below, and return that.
			//

			console.log('WORKER: fetch request failed in both cache and network.');

			// Here we're creating a response programmatically. The first parameter is the
			//	response body, and the second one defines the options for the response.
			//
			return new Response('<h1>Service Unavailable</h1>', {
				status: 503,
				statusText: 'We can not get data, sorry',
				headers: new Headers({
					'Content-Type': 'text/html'
				})
			});
		}
	}));
});

self.addEventListener('unhandledrejection', function (err, promise) {
	console.log('Error with ' + promise);
	console.log(err);
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzd0dldERhdGEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG5cdC8vIEF0IGZpcnN0LCBsZXQncyBjaGVjayBpZiB3ZSBoYXZlIHBlcm1pc3Npb24gZm9yIG5vdGlmaWNhdGlvblxuXHQvLyBJZiBub3QsIGxldCdzIGFzayBmb3IgaXRcblx0aWYgKHdpbmRvdy5Ob3RpZmljYXRpb24gJiYgTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gIT09ICdncmFudGVkJykge1xuXHRcdE5vdGlmaWNhdGlvbi5yZXF1ZXN0UGVybWlzc2lvbihmdW5jdGlvbiAoc3RhdHVzKSB7XG5cdFx0XHRpZiAoTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gIT09IHN0YXR1cykge1xuXHRcdFx0XHROb3RpZmljYXRpb24ucGVybWlzc2lvbiA9IHN0YXR1cztcblx0XHRcdH1cblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHRjb25zb2xlLmxvZygnTm90IGdyYW50ZWQnKTtcblx0fVxufSk7XG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignaW5zdGFsbCcsIGZ1bmN0aW9uIChldmVudCkge1xuXHRldmVudC53YWl0VW50aWwoY2FjaGVzLm9wZW4oJ1JERGFzaGJvYXJkJykudGhlbihmdW5jdGlvbiAoY2FjaGUpIHtcblx0XHRyZXR1cm4gY2FjaGUuYWRkQWxsKFsnL2luZGV4Lmh0bWwnLCAnL2Nzcy9tYWluLmNzcycsICcvanMvbWFpbi5qcycsICcvb3RoZXJzLzIwMTYuMTEuY3N2JywgJy9vdGhlcnMvMjAxNi4xMi5jc3YnLCAnL290aGVycy8yMDE2VG90YWwuY3N2JywgJy9vdGhlcnMvMjAxNy4wMS5jc3YnLCAnL290aGVycy9jaXRpZXMuY3N2J10pO1xuXHR9KSk7XG59KTtcblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdhY3RpdmF0ZScsIGZ1bmN0aW9uIChldmVudCkge1xuXHRldmVudC53YWl0VW50aWwoY2FjaGVzLmtleXMoKS50aGVuKGZ1bmN0aW9uIChjYWNoZU5hbWVzKSB7XG5cdFx0cmV0dXJuIFByb21pc2UuYWxsKGNhY2hlTmFtZXMuZmlsdGVyKGZ1bmN0aW9uIChjYWNoZU5hbWUpIHtcblx0XHRcdHJldHVybiBjYWNoZU5hbWUgIT09ICdSRERhc2hib2FyZCc7XG5cdFx0fSkubWFwKGZ1bmN0aW9uIChjYWNoZU5hbWUpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdEZWxldGluZyAnICsgY2FjaGVOYW1lKTtcblx0XHRcdHJldHVybiBjYWNoZXMuZGVsZXRlKGNhY2hlTmFtZSk7XG5cdFx0fSkpO1xuXHR9KSk7XG59KTtcblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdmZXRjaCcsIGZ1bmN0aW9uIChldmVudCkge1xuXHRjb25zb2xlLmxvZygnV09SS0VSOiBmZXRjaCBldmVudCBpbiBwcm9ncmVzcy4nKTtcblxuXHQvLyBXZSBzaG91bGQgb25seSBjYWNoZSBHRVQgcmVxdWVzdHMsIGFuZCBkZWFsIHdpdGggdGhlIHJlc3Qgb2YgbWV0aG9kIGluIHRoZSBjbGllbnQtc2lkZSwgXG5cdC8vXHRieSBoYW5kbGluZyBmYWlsZWQgUE9TVCxQVVQsUEFUQ0gsZXRjLiByZXF1ZXN0cy5cblx0Ly9cblx0aWYgKGV2ZW50LnJlcXVlc3QubWV0aG9kICE9PSAnR0VUJykge1xuXHRcdC8vIElmIHdlIGRvbid0IGJsb2NrIHRoZSBldmVudCBhcyBzaG93biBiZWxvdywgdGhlbiB0aGUgcmVxdWVzdCB3aWxsIGdvIHRvXG5cdFx0Ly9cdHRoZSBuZXR3b3JrIGFzIHVzdWFsLlxuXHRcdC8vXG5cdFx0Y29uc29sZS5sb2coJ1dPUktFUjogZmV0Y2ggZXZlbnQgaWdub3JlZC4nLCBldmVudC5yZXF1ZXN0Lm1ldGhvZCwgZXZlbnQucmVxdWVzdC51cmwpO1xuXHRcdHJldHVybjtcblx0fVxuXHQvLyBTaW1pbGFyIHRvIGV2ZW50LndhaXRVbnRpbCBpbiB0aGF0IGl0IGJsb2NrcyB0aGUgZmV0Y2ggZXZlbnQgb24gYSBwcm9taXNlLlxuXHQvL1x0RnVsZmlsbG1lbnQgcmVzdWx0IHdpbGwgYmUgdXNlZCBhcyB0aGUgcmVzcG9uc2UsIGFuZCByZWplY3Rpb24gd2lsbCBlbmQgaW4gYVxuXHQvL1x0SFRUUCByZXNwb25zZSBpbmRpY2F0aW5nIGZhaWx1cmUuXG5cdC8vXG5cdGV2ZW50LnJlc3BvbmRXaXRoKGNhY2hlc1xuXHQvLyBUaGlzIG1ldGhvZCByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgY2FjaGUgZW50cnkgbWF0Y2hpbmdcblx0Ly9cdHRoZSByZXF1ZXN0LiBPbmNlIHRoZSBwcm9taXNlIGlzIHNldHRsZWQsIHdlIGNhbiB0aGVuIHByb3ZpZGUgYSByZXNwb25zZVxuXHQvL1x0dG8gdGhlIGZldGNoIHJlcXVlc3QuXG5cdC8vXG5cdC5tYXRjaChldmVudC5yZXF1ZXN0KS50aGVuKGZ1bmN0aW9uIChjYWNoZWQpIHtcblx0XHQvLyBFdmVuIGlmIHRoZSByZXNwb25zZSBpcyBpbiBvdXIgY2FjaGUsIHdlIGdvIHRvIHRoZSBuZXR3b3JrIGFzIHdlbGwuXG5cdFx0Ly9cdFRoaXMgcGF0dGVybiBpcyBrbm93biBmb3IgcHJvZHVjaW5nIFwiZXZlbnR1YWxseSBmcmVzaFwiIHJlc3BvbnNlcyxcblx0XHQvL1x0d2hlcmUgd2UgcmV0dXJuIGNhY2hlZCByZXNwb25zZXMgaW1tZWRpYXRlbHksIGFuZCBtZWFud2hpbGUgcHVsbFxuXHRcdC8vXHRhIG5ldHdvcmsgcmVzcG9uc2UgYW5kIHN0b3JlIHRoYXQgaW4gdGhlIGNhY2hlLlxuXHRcdC8vXHRSZWFkIG1vcmU6XG5cdFx0Ly9cdGh0dHBzOi8vcG9ueWZvby5jb20vYXJ0aWNsZXMvcHJvZ3Jlc3NpdmUtbmV0d29ya2luZy1zZXJ2aWNld29ya2VyXG5cdFx0Ly9cblx0XHR2YXIgbmV0d29ya2VkID0gZmV0Y2goZXZlbnQucmVxdWVzdClcblx0XHQvLyBXZSBoYW5kbGUgdGhlIG5ldHdvcmsgcmVxdWVzdCB3aXRoIHN1Y2Nlc3MgYW5kIGZhaWx1cmUgc2NlbmFyaW9zLlxuXHRcdC50aGVuKGZldGNoZWRGcm9tTmV0d29yaywgdW5hYmxlVG9SZXNvbHZlKVxuXHRcdC8vIFdlIHNob3VsZCBjYXRjaCBlcnJvcnMgb24gdGhlIGZldGNoZWRGcm9tTmV0d29yayBoYW5kbGVyIGFzIHdlbGwuXG5cdFx0LmNhdGNoKHVuYWJsZVRvUmVzb2x2ZSk7XG5cblx0XHQvLyBXZSByZXR1cm4gdGhlIGNhY2hlZCByZXNwb25zZSBpbW1lZGlhdGVseSBpZiB0aGVyZSBpcyBvbmUsIGFuZCBmYWxsXG5cdFx0Ly9cdGJhY2sgdG8gd2FpdGluZyBvbiB0aGUgbmV0d29yayBhcyB1c3VhbC5cblx0XHQvL1xuXHRcdGNvbnNvbGUubG9nKCdXT1JLRVI6IGZldGNoIGV2ZW50JywgY2FjaGVkID8gJyhjYWNoZWQpJyA6ICcobmV0d29yayknLCBldmVudC5yZXF1ZXN0LnVybCk7XG5cdFx0cmV0dXJuIGNhY2hlZCB8fCBuZXR3b3JrZWQ7XG5cblx0XHRmdW5jdGlvbiBmZXRjaGVkRnJvbU5ldHdvcmsocmVzcG9uc2UpIHtcblx0XHRcdC8vIFdlIGNvcHkgdGhlIHJlc3BvbnNlIGJlZm9yZSByZXBseWluZyB0byB0aGUgbmV0d29yayByZXF1ZXN0LlxuXHRcdFx0Ly9cdFRoaXMgaXMgdGhlIHJlc3BvbnNlIHRoYXQgd2lsbCBiZSBzdG9yZWQgb24gdGhlIFNlcnZpY2VXb3JrZXIgY2FjaGUuXG5cdFx0XHQvL1xuXHRcdFx0dmFyIGNhY2hlQ29weSA9IHJlc3BvbnNlLmNsb25lKCk7XG5cdFx0XHRjb25zb2xlLmxvZygnV09SS0VSOiBmZXRjaCByZXNwb25zZSBmcm9tIG5ldHdvcmsuJywgZXZlbnQucmVxdWVzdC51cmwpO1xuXG5cdFx0XHRjYWNoZXNcblx0XHRcdC8vIFdlIG9wZW4gYSBjYWNoZSB0byBzdG9yZSB0aGUgcmVzcG9uc2UgZm9yIHRoaXMgcmVxdWVzdC5cblx0XHRcdC5vcGVuKCdSRERhc2hib2FyZCcpLnRoZW4oZnVuY3Rpb24gYWRkKGNhY2hlKSB7XG5cdFx0XHRcdC8vIFdlIHN0b3JlIHRoZSByZXNwb25zZSBmb3IgdGhpcyByZXF1ZXN0LiBJdCdsbCBsYXRlciBiZWNvbWVcblx0XHRcdFx0Ly9cdGF2YWlsYWJsZSB0byBjYWNoZXMubWF0Y2goZXZlbnQucmVxdWVzdCkgY2FsbHMsIHdoZW4gbG9va2luZ1xuXHRcdFx0XHQvL1x0Zm9yIGNhY2hlZCByZXNwb25zZXMuXG5cdFx0XHRcdC8vXG5cdFx0XHRcdGNhY2hlLmFkZChldmVudC5yZXF1ZXN0KTtcblx0XHRcdH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnV09SS0VSOiBmZXRjaCByZXNwb25zZSBzdG9yZWQgaW4gY2FjaGUuJywgZXZlbnQucmVxdWVzdC51cmwpO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vIFJldHVybiB0aGUgcmVzcG9uc2Ugc28gdGhhdCB0aGUgcHJvbWlzZSBpcyBzZXR0bGVkIGluIGZ1bGZpbGxtZW50LlxuXHRcdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHRcdH1cblxuXHRcdC8vIFdoZW4gdGhpcyBtZXRob2QgaXMgY2FsbGVkLCBpdCBtZWFucyB3ZSB3ZXJlIHVuYWJsZSB0byBwcm9kdWNlIGEgcmVzcG9uc2Vcblx0XHQvL1x0ZnJvbSBlaXRoZXIgdGhlIGNhY2hlIG9yIHRoZSBuZXR3b3JrLiBUaGlzIGlzIG91ciBvcHBvcnR1bml0eSB0byBwcm9kdWNlXG5cdFx0Ly9cdGEgbWVhbmluZ2Z1bCByZXNwb25zZSBldmVuIHdoZW4gYWxsIGVsc2UgZmFpbHMuIEl0J3MgdGhlIGxhc3QgY2hhbmNlLCBzb1xuXHRcdC8vXHR5b3UgcHJvYmFibHkgd2FudCB0byBkaXNwbGF5IGEgXCJTZXJ2aWNlIFVuYXZhaWxhYmxlXCIgdmlldyBvciBhIGdlbmVyaWNcblx0XHQvL1x0ZXJyb3IgcmVzcG9uc2UuXG5cdFx0Ly9cblx0XHRmdW5jdGlvbiB1bmFibGVUb1Jlc29sdmUoKSB7XG5cdFx0XHQvLyBUaGVyZSdzIGEgY291cGxlIG9mIHRoaW5ncyB3ZSBjYW4gZG8gaGVyZS5cblx0XHRcdC8vXHQtIFRlc3QgdGhlIEFjY2VwdCBoZWFkZXIgYW5kIHRoZW4gcmV0dXJuIG9uZSBvZiB0aGUgYG9mZmxpbmVGdW5kYW1lbnRhbHNgXG5cdFx0XHQvL1x0ZS5nOiBgcmV0dXJuIGNhY2hlcy5tYXRjaCgnL3NvbWUvY2FjaGVkL2ltYWdlLnBuZycpYFxuXHRcdFx0Ly9cdC0gWW91IHNob3VsZCBhbHNvIGNvbnNpZGVyIHRoZSBvcmlnaW4uIEl0J3MgZWFzaWVyIHRvIGRlY2lkZSB3aGF0XG5cdFx0XHQvL1x0XCJ1bmF2YWlsYWJsZVwiIG1lYW5zIGZvciByZXF1ZXN0cyBhZ2FpbnN0IHlvdXIgb3JpZ2lucyB0aGFuIGZvciByZXF1ZXN0c1xuXHRcdFx0Ly9cdGFnYWluc3QgYSB0aGlyZCBwYXJ0eSwgc3VjaCBhcyBhbiBhZCBwcm92aWRlci5cblx0XHRcdC8vXHQtIEdlbmVyYXRlIGEgUmVzcG9uc2UgcHJvZ3JhbW1hdGljYWx5LCBhcyBzaG93biBiZWxvdywgYW5kIHJldHVybiB0aGF0LlxuXHRcdFx0Ly9cblxuXHRcdFx0Y29uc29sZS5sb2coJ1dPUktFUjogZmV0Y2ggcmVxdWVzdCBmYWlsZWQgaW4gYm90aCBjYWNoZSBhbmQgbmV0d29yay4nKTtcblxuXHRcdFx0Ly8gSGVyZSB3ZSdyZSBjcmVhdGluZyBhIHJlc3BvbnNlIHByb2dyYW1tYXRpY2FsbHkuIFRoZSBmaXJzdCBwYXJhbWV0ZXIgaXMgdGhlXG5cdFx0XHQvL1x0cmVzcG9uc2UgYm9keSwgYW5kIHRoZSBzZWNvbmQgb25lIGRlZmluZXMgdGhlIG9wdGlvbnMgZm9yIHRoZSByZXNwb25zZS5cblx0XHRcdC8vXG5cdFx0XHRyZXR1cm4gbmV3IFJlc3BvbnNlKCc8aDE+U2VydmljZSBVbmF2YWlsYWJsZTwvaDE+Jywge1xuXHRcdFx0XHRzdGF0dXM6IDUwMyxcblx0XHRcdFx0c3RhdHVzVGV4dDogJ1dlIGNhbiBub3QgZ2V0IGRhdGEsIHNvcnJ5Jyxcblx0XHRcdFx0aGVhZGVyczogbmV3IEhlYWRlcnMoe1xuXHRcdFx0XHRcdCdDb250ZW50LVR5cGUnOiAndGV4dC9odG1sJ1xuXHRcdFx0XHR9KVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KSk7XG59KTtcblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCd1bmhhbmRsZWRyZWplY3Rpb24nLCBmdW5jdGlvbiAoZXJyLCBwcm9taXNlKSB7XG5cdGNvbnNvbGUubG9nKCdFcnJvciB3aXRoICcgKyBwcm9taXNlKTtcblx0Y29uc29sZS5sb2coZXJyKTtcbn0pOyJdLCJmaWxlIjoic3dHZXREYXRhLmpzIn0=
