// DOCS: https://karannagupta.com/using-custom-workbox-service-workers-with-create-react-app/
// DOCS: https://developers.google.com/web/tools/workbox/modules/workbox-sw

// : 
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

/* global workbox */
if (workbox) {
  console.log('Workbox is loaded 😬');

  addEventListener('message', (event) => {
    if (event.data === 'skipWaiting') {
      self.skipWaiting();
  
      // Reply to the window so it knows `skipWaiting()` was called.
      //event.ports[0].postMessage(true);
      // This is not needed when using postMessage in serviceWorker_v4 but for messageSW but messageSW I cannot get to work
    }
  });

  /* injection point for manifest files.  */
  workbox.precaching.precacheAndRoute([]);

/* custom cache rules*/
workbox.routing.registerNavigationRoute('/index.html', {
    blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
  });

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    })
  );

} else {
  console.log('Workbox could not be loaded. No Offline support 😬');
}

