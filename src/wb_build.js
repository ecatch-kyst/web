// DOCS: https://karannagupta.com/using-custom-workbox-service-workers-with-create-react-app/
// DOCS: https://developers.google.com/web/tools/workbox/modules/workbox-sw

const workboxBuild = require('workbox-build');

// buildSW will autogenerate a SW but buildSW you decied what the serviceWorker shall contain
// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  // This will return a Promise
  return workboxBuild.generateSW({
    globDirectory: 'build',
    globPatterns: [
      '**\/*.{html,json,js,css}',
    ],
    swDest: 'build/sw.js',
    runtimeCaching: [{
      // Match any request ends with .png, .jpg, .jpeg or .svg.
      urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

      // Apply a cache-first strategy.
      handler: 'CacheFirst',

      options: {
        // Use a custom cache name.
        cacheName: 'images',

        // Only cache 10 images.
        expiration: {
          maxEntries: 10,
        },
      },
    }],
  });
}

const buildSW2 = () => {
  // This will return a Promise
  return workboxBuild.injectManifest({
    swSrc: 'src/sw_template.js', // this is your sw template file
    swDest: 'build/sw.js', // this will be created in the build step
    globDirectory: 'build',
    globPatterns: [
      '**\/*.{js,css,html,png}',
    ]
  }).then(({count, size, warnings}) => {
    // Optionally, log any warnings and details.
    warnings.forEach(console.warn);
    console.log(`${count} files will be precached, totaling ${size} bytes.`);
  });
}

buildSW2();