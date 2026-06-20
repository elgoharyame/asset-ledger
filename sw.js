/* Asset Ledger service worker — offline shell + installable PWA.
 * Strategy: network-first for same-origin GETs (so new code lands on reload),
 * falling back to cache when offline. Cross-origin (Firebase, Google APIs,
 * Google Fonts) is never intercepted — those always go straight to network.
 */
const CACHE = 'asset-ledger-v3';
const SHELL = [
  './', './index.html', './config.js',
  './manifest.webmanifest', './icon-192.png', './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;                       // never cache writes
  if (new URL(req.url).origin !== location.origin) return; // let Firebase/Google/fonts hit network
  e.respondWith(
    fetch(req)
      .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })
      .catch(() => caches.match(req).then(m => m || caches.match('./index.html')))
  );
});
