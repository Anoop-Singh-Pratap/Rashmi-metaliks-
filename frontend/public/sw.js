// Service Worker for Rashmi Metaliks - Enhanced SEO Performance
const CACHE_NAME = 'rashmi-metaliks-v1.0.0';
const STATIC_CACHE = 'rashmi-static-v1.0.0';
const DYNAMIC_CACHE = 'rashmi-dynamic-v1.0.0';

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/di-pipes',
  '/di-fittings',
  '/about-rashmi',
  '/contact',
  '/lovable-uploads/Rashmi-logo-light.png',
  '/favicon.ico',
  '/manifest.json'
];

// Resources to cache on first access
const CACHE_ON_ACCESS = [
  '/lovable-uploads/',
  '/fonts/',
  'https://fonts.googleapis.com/',
  'https://fonts.gstatic.com/'
];

// Install event - cache critical resources
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Caching critical resources');
        return cache.addAll(CRITICAL_RESOURCES);
      })
      .then(() => {
        console.log('Service Worker: Critical resources cached');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Failed to cache critical resources', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests except fonts and images
  if (url.origin !== location.origin && 
      !url.hostname.includes('fonts.googleapis.com') &&
      !url.hostname.includes('fonts.gstatic.com') &&
      !url.hostname.includes('googletagmanager.com')) {
    return;
  }

  // Handle different types of requests
  if (request.destination === 'document') {
    event.respondWith(handleDocumentRequest(request));
  } else if (request.destination === 'image') {
    event.respondWith(handleImageRequest(request));
  } else if (request.destination === 'font') {
    event.respondWith(handleFontRequest(request));
  } else if (request.destination === 'script' || request.destination === 'style') {
    event.respondWith(handleAssetRequest(request));
  } else {
    event.respondWith(handleGenericRequest(request));
  }
});

// Handle document requests (HTML pages)
async function handleDocumentRequest(request) {
  try {
    // Try network first for fresh content
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful responses
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
  } catch (error) {
    // Fallback to cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page if available
    return caches.match('/offline.html') || new Response('Offline', { status: 503 });
  }
}

// Handle image requests with aggressive caching
async function handleImageRequest(request) {
  try {
    // Check cache first for images
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Fetch from network
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache images for long term
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
  } catch (error) {
    // Return placeholder image or cached version
    return caches.match('/placeholder-image.png') || 
           new Response('Image not available', { status: 404 });
  }
}

// Handle font requests with long-term caching
async function handleFontRequest(request) {
  try {
    // Check cache first for fonts
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Fetch from network
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache fonts for very long term
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
  } catch (error) {
    console.error('Font loading failed:', error);
    return new Response('Font not available', { status: 404 });
  }
}

// Handle CSS/JS assets
async function handleAssetRequest(request) {
  try {
    // Check cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Fetch from network
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache assets
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
  } catch (error) {
    console.error('Asset loading failed:', error);
    return new Response('Asset not available', { status: 404 });
  }
}

// Handle generic requests
async function handleGenericRequest(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Fetch from network
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful responses
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Generic request failed:', error);
    return new Response('Request failed', { status: 503 });
  }
}

// Background sync for analytics
self.addEventListener('sync', event => {
  if (event.tag === 'analytics-sync') {
    event.waitUntil(syncAnalytics());
  }
});

// Sync analytics data when online
async function syncAnalytics() {
  try {
    // Send any queued analytics data
    const analyticsData = await getStoredAnalytics();
    if (analyticsData.length > 0) {
      await sendAnalyticsData(analyticsData);
      await clearStoredAnalytics();
    }
  } catch (error) {
    console.error('Analytics sync failed:', error);
  }
}

// Helper functions for analytics
async function getStoredAnalytics() {
  // Implementation would depend on your analytics storage strategy
  return [];
}

async function sendAnalyticsData(data) {
  // Send to Google Analytics or your analytics service
  return fetch('/analytics', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  });
}

async function clearStoredAnalytics() {
  // Clear stored analytics data
}

// Push notification handling (if needed)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/lovable-uploads/Rashmi-logo-light.png',
      badge: '/favicon.ico',
      data: data.url
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.notification.data) {
    event.waitUntil(
      clients.openWindow(event.notification.data)
    );
  }
});

console.log('Service Worker: Loaded successfully');
