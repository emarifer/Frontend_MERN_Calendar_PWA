/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
importScripts(
	'https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js',
);

workbox.loadModule('workbox-background-sync');

const { NavigationRoute, registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;

self.__precacheManifest = [
	{
		url:
			'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css',
	},
	{
		url: 'https://fonts.gstatic.com/s/ubuntu/v15/4iCs6KVjbNBYlgoKcg72j00.woff2',
	},
].concat([{"revision":"825cea17f099f113dba8bb7ce230bff3","url":"asset-manifest.json"},{"revision":"6e1267d9d946b0236cdf6ffd02890894","url":"favicon.ico"},{"revision":"7f965a51d4822f9905576c374d9980b4","url":"index.html"},{"revision":"33dbdd0177549353eeeb785d02c294af","url":"logo192.png"},{"revision":"917515db74ea8d1aee6a246cfbcc0b45","url":"logo512.png"},{"revision":"0eaf92d85364520b90c3477de21b8fc1","url":"manifest.json"},{"revision":"fa1ded1ed7c11438a9b0385b1e112850","url":"robots.txt"},{"revision":"82814859f77a8328346dd35d76d1fbc4","url":"static/css/2.e9a09165.chunk.css"},{"revision":"b807010c6ee186c02f043fb0ba0ac9fa","url":"static/css/main.77633832.chunk.css"},{"revision":"e6e620859852fac4254cf8905f8fe6c4","url":"static/js/2.f3a1e82a.chunk.js"},{"revision":"2783cb611cfe78d22f7194d9d4695716","url":"static/js/2.f3a1e82a.chunk.js.LICENSE.txt"},{"revision":"7f484bdb834fab0e3f02644c1defdd36","url":"static/js/main.0acb68fa.chunk.js"},{"revision":"0bb2c1150843a02cb77c54b8b5e65baa","url":"static/js/runtime-main.0cfaf758.js"}]);

workbox.precaching.precacheAndRoute(self.__precacheManifest);
registerRoute(
	new NavigationRoute(
		workbox.precaching.createHandlerBoundToURL('/index.html'),
	),
);

// Forma alternativa, aunque no se almacena en el «app shell» (precache),
// sino en el «workbox-runtime» del Cache Storage
registerRoute(new RegExp('.*(bootstrap|webfonts).*'), new CacheFirst());

// Forma breve de manejar el cacheo del token y los eventos,
// pero que esta ligada a la ruta del localhost:4000:
// registerRoute(new RegExp('.*4000.*'), new NetworkFirst());

// Forma «elaborada» de manejo del cacheo del token y los eventos.
// Se usa un callback que devuelve true/false si la url que le entra
// contiene el segmento de url cuya request se quiere almacenar:
const cacheNetworkFirst = ['/api/auth/renew', '/api/events'];

registerRoute(({ request, url }) => {
	// console.log({ request, url });
	// if (cacheNetworkFirst.includes(url.pathname)) return true;

	// return false;
	return cacheNetworkFirst.includes(url.pathname) ? true : false;
}, new NetworkFirst());

// Configuracion offline de la aplicacion para POST, PUT Y DELETE
const bgSyncPlugin = new BackgroundSyncPlugin('posts-offline', {
	maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

// Post offline
registerRoute(
	new RegExp('.*events'),
	new NetworkOnly({
		plugins: [bgSyncPlugin],
	}),
	'POST',
);

// Put offline
registerRoute(
	new RegExp('.*events.*'),
	new NetworkOnly({
		plugins: [bgSyncPlugin],
	}),
	'PUT',
);

// Delete offline
registerRoute(
	new RegExp('.*events.*'),
	new NetworkOnly({
		plugins: [bgSyncPlugin],
	}),
	'DELETE',
);

self.skipWaiting();
