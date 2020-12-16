

self.addEventListener('push', e => {
    const data = e.data.json()
    console.log('Service Worker');
    console.log(data);
    self.registration.showNotification(data.title, {
        body: data.message,
        icon:'https://pbs.twimg.com/profile_images/1255590754061336584/yoWbVZcd_400x400.jpg'
    })
})

self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click received.');
  
    event.notification.close();
  
    event.waitUntil(
      clients.openWindow('https://developers.google.com/web')
    );
  });