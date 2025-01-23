console.log('in service worker')
console.log('self.serviceWorker.state ', self.serviceWorker.state)
self.addEventListener('install', () => {
    console.log('Service Worker installed.');
});
  
self.addEventListener('activate', () => {
    console.log('Service Worker activated.');
});

async function createOffscreenDoc(){
    await chrome.offscreen.createDocument({
        url: './offscreen.html',
        reasons: ['IFRAME_SCRIPTING'],
        justification:
          'Some reason.',
    });
}

self.addEventListener('install', async () => {
    console.log('Service Worker installed.');
    await createOffscreenDoc();
});

chrome.runtime.onConnect.addListener((port)=> {
    console.log('chrome runtime connect called with port ', port)
})

if (self.serviceWorker.state === 'activated') {
    createOffscreenDoc();
}

console.log('change')