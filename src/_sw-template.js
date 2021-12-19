importScripts(
	'https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js',
);

self.__precacheManifest = [
	{
		url:
			'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
	},
	{
		url:
			'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css',
	},
	{
		url:
			'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/webfonts/fa-solid-900.woff2',
	},
	{
		url: 'https://fonts.gstatic.com/s/ubuntu/v15/4iCs6KVjbNBYlgoKcg72j00.woff2',
	},
].concat(self.__WB_MANIFEST);

workbox.precaching.precacheAndRoute(self.__precacheManifest);

// workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);


// workbox.routing.registerRoute(
//     new RegExp('.*(bootstrap|font-awesome|ubuntu).*'),
//     new workbox.strategies.CacheFirst()
// )

// self.skipWaiting();
