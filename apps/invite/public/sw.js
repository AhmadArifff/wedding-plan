// NikahPlan Studio - Development Service Worker
// Automatically cleans up and unregisters any stale service workers cached on localhost
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.registration.unregister().then(() => {
      return self.clients.matchAll();
    }).then((clients) => {
      // Clean slate for localhost development
      clients.forEach((client) => {
        // No action needed; silent unregistration
      });
    })
  );
});

