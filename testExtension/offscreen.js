// offscreen.js

console.log('in offscreen js')

let logInterval = setInterval(() => {
    console.log('Logging every second from offscreen.js');
  }, 1000);
  
const result = window.open('https://www.electronjs.org/')
console.log('result of window open ', result)
