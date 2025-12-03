//*const CACHE_NAME = 'flask-pwa-cache-v1';
// Lista de archivos para precachear (App Shell)
//const urlsToCache = [
  //'/',
  //'/index.html', // O el nombre de tu plantilla principal
  //'/static/css/style.css', // Rutas a tus archivos CSS
  //'/static/js/main.js',    // Rutas a tus archivos JS
  //'/offline.html'          // Una página que se mostrará cuando no haya conexión
  // Incluye todos los assets esenciales (imágenes, fuentes, etc.)
//];
// sw.js

const CACHE_NAME = 'flask-pwa-cache-v1';
const urlsToCache = [
  // '/',  <-- COMENTA O ELIMINA ESTA LÍNEA TEMPORALMENTE
  '/manifest.json', // Asegúrate de que esta ruta sea correcta
  '/offline.html',
  '/static/css/style.css', // (Si tienes CSS)
  '/static/js/main.js',    // (Si tienes JS)
  // ... todos los demás assets estáticos (logo, iconos, etc.)
];

// ... el resto de tu código del Service Worker

// Evento de Instalación: Precachea los archivos esenciales
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache and precaching assets');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de Fetch: Intercepta las solicitudes de red
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Devuelve la versión en caché si está disponible
        if (response) {
          return response;
        }
        // Si no está en caché, intenta ir a la red
        return fetch(event.request).catch(() => {
            // Si la red falla y se está solicitando una página HTML, muestra la página offline
            if (event.request.mode === 'navigate') {
                return caches.match('/offline.html');
            }
        });
      })
  );
});

// Evento de Activación: Limpia cachés viejas
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});