// define a prefix for your cache names. It is recommended to use your project name
workbox.core.setCacheNameDetails({prefix:  "easyNoteReader"});

// Start of Precaching##########################
// __precacheManifest is the list of resources you want to precache. This list will be generated and imported automatically by workbox during build time
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
// End of Precaching############################

// Start of CachFirst Strategy##################
// all the api request which matchs the following pattern will use CacheFirst strategy for caching
workbox.routing.registerRoute(
/http:\/\/get\.geojs\.io\/v1\/ip\/country\.json/,
new  workbox.strategies.CacheFirst()
);
// End of CachFirst Strategy####################