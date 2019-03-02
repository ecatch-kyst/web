// Code form:
//https://developers.google.com/web/tools/workbox/guides/precache-files/workbox-build#call_wzxhzdk7injectmanifestwzxhzdk8

if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js'
  );
  
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded 😬');

    workbox.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'SKIP_WAITING') {
        skipWaiting();
    
        // Reply to the window so it knows `skipWaiting()` was called.
        event.ports[0].postMessage(true);
      }
    })
 
    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([]);
 
/* custom cache rules*/
workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
    });
 
workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg)$/,
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
}
