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
].concat(self.__WB_MANIFEST);

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
