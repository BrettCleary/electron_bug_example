# hello_electron

This simple reproducible example demonstrates the inability to call `window.open` in an offscreen document created in an extension service worker with `chrome.offscreen.createDocument`.

# Steps to reproduce

1. `pnpm i`
2. `pnpm run start`
3. Go to `chrome://inspect` and inspect the offscreen document
4. See that the result of `window.open` is null and a window at `https://www.electronjs.org/` has not been opened. The handler for `setWindowOpenHandler` has not fired either.

To re-run the example, delete the config folder first. Otherwise the service worker does not wake up currently.
