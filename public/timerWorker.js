let lastTime = Date.now();

self.addEventListener('message', function(e) {
  if (e.data.start) {
    lastTime = Date.now();
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      self.postMessage(deltaTime);
    }, 1000);
  }
}, false);