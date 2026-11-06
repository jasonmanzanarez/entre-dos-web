// Recibe los avisos de Entre Dos aunque la app esté cerrada.
self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch { d = { title: 'Entre Dos', body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Entre Dos', { body: d.body || '', icon: 'icon.png', badge: 'icon.png', tag: 'entre-dos', renotify: true }));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil((async () => {
    const abiertas = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of abiertas) if ('focus' in c) return c.focus();
    return self.clients.openWindow(self.registration.scope);
  })());
});
