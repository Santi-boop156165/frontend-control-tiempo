let lastTime = Date.now();

self.addEventListener('message', function(e) {
  console.log("Mensaje recibido en el worker", e.data);
  if (e.data.start) {
    lastTime = Date.now();
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      console.log("Enviando tiempo delta:", deltaTime);
      self.postMessage(deltaTime);
    }, 1000);
  }
}, false);