import React, { useState, useEffect } from 'react';



const TimerCard = ({ name, minutes, handleColor, id, identifications }) => {
  const initialRemainingTime = parseInt(localStorage.getItem(`remainingTime_${id}`)) || minutes * 60;
  const [remainingTime, setRemainingTime] = useState(initialRemainingTime);
  const [isRedBackground, setIsRedBackground] = useState(false);

  useEffect(() => {
    if (remainingTime > 1) {
      const timer = setTimeout(() => {
        setRemainingTime((prevTime) => {
          const newTime = prevTime - 1;
          localStorage.setItem(`remainingTime_${id}`, newTime);

          if (newTime === 20 && !isRedBackground) { 
            setIsRedBackground(true);
            localStorage.setItem(`isRedBackground_${id}`, 'true'); 
          }

          return newTime;
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [remainingTime, name, isRedBackground]);

  useEffect(() => {
    const storedIsRedBackground = localStorage.getItem(`isRedBackground_${id}`);
    if (storedIsRedBackground === 'true') {
      setIsRedBackground(true);
    }
  }, [name]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
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