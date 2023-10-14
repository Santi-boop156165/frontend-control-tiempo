import React, { useState, useEffect } from 'react';



const TimerCard = ({ name, minutes, handleColor, id, identifications }) => {
  const [remainingTime, setRemainingTime] = useState(minutes * 60);
  const [isRedBackground, setIsRedBackground] = useState(false);
  let worker;

  useEffect(() => {
    worker = new Worker('/timerWorker.js');
    worker.postMessage({ start: true });
    
    worker.addEventListener('message', function(event) {
      console.log("Mensaje recibido en el componente:", event.data);
      const deltaTime = event.data / 1000; // Convertir a segundos
      setRemainingTime(prevTime => prevTime - deltaTime);
    });
  
    return () => {
      worker.terminate();
    };
  }, []);


  useEffect(() => {
    const storedIsRedBackground = localStorage.getItem(`isRedBackground_${id}`);
    if (storedIsRedBackground === 'true') {
      setIsRedBackground(true);
    }
  }, [name]);

  const formatTime = (seconds) => {
    const roundedSeconds = Math.round(seconds); // Redondea al segundo más cercano
    const mins = Math.floor(roundedSeconds / 60);
    const secs = roundedSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const cardBackgroundClass = isRedBackground ? 'bg-red-300' : 'bg-white';

  return (
    <div className={`p-4 border rounded-lg shadow-md ${cardBackgroundClass}`}>
      <p className="text-xl font-semibold">{name}</p>
      <p className="text-xl font-semibold">{identifications}</p>
      <p className="text-xl font-semibold">Color de Manilla : {handleColor}</p>
      <p className="text-2xl mt-2">
        Minutos: {formatTime(remainingTime)}
      </p>
    </div>
  );
};

export default TimerCard;