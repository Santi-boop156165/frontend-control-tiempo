import { useState, useEffect, useRef } from "react";

const TimerCard = ({ name, minutes, handleColor, id, identifications }) => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [isRedBackground, setIsRedBackground] = useState(false);
  const startTimeRef = useRef(null);
  const initialTimeRef = useRef(null);
  const intervalRef = useRef(null);
  const isInitializedRef = useRef(false);
  const lastMinutesRef = useRef(null); // Para detectar cambios en minutes

  // Inicializar o recuperar el estado del timer
  useEffect(() => {
    // Validar que minutes sea un número válido
    const validMinutes = Number.isFinite(minutes) && minutes > 0 ? minutes : 0;
    const newInitialTime = validMinutes * 60;

    // Detectar si los minutos cambiaron
    const minutesChanged =
      lastMinutesRef.current !== null &&
      lastMinutesRef.current !== validMinutes;

    // Si ya se inicializó y los minutos no cambiaron, no hacer nada
    if (isInitializedRef.current && !minutesChanged) return;

    // Actualizar referencia de los últimos minutos
    lastMinutesRef.current = validMinutes;

    const storedStartTime = localStorage.getItem(`startTime_${id}`);
    const storedInitialTime = localStorage.getItem(`initialTime_${id}`);
    const storedIsRedBackground = localStorage.getItem(`isRedBackground_${id}`);

    if (storedIsRedBackground === "true") {
      setIsRedBackground(true);
    }

    // Si los minutos cambiaron, reiniciar el timer
    if (minutesChanged) {
      startTimeRef.current = Date.now();
      initialTimeRef.current = newInitialTime;
      localStorage.setItem(`startTime_${id}`, startTimeRef.current.toString());
      localStorage.setItem(
        `initialTime_${id}`,
        initialTimeRef.current.toString(),
      );
      // Resetear fondo rojo
      setIsRedBackground(false);
      localStorage.removeItem(`isRedBackground_${id}`);
    }
    // Si existe un timer guardado y es la primera inicialización, recuperarlo
    else if (storedStartTime && storedInitialTime) {
      const parsedStartTime = parseInt(storedStartTime, 10);
      const parsedInitialTime = parseInt(storedInitialTime, 10);

      // Validar que los valores parseados sean números válidos
      if (!isNaN(parsedStartTime) && !isNaN(parsedInitialTime)) {
        startTimeRef.current = parsedStartTime;
        initialTimeRef.current = parsedInitialTime;
      } else {
        // Si los datos guardados son inválidos, crear nuevo timer
        startTimeRef.current = Date.now();
        initialTimeRef.current = newInitialTime;
        localStorage.setItem(
          `startTime_${id}`,
          startTimeRef.current.toString(),
        );
        localStorage.setItem(
          `initialTime_${id}`,
          initialTimeRef.current.toString(),
        );
      }
    } else {
      // Si no existe, crear uno nuevo
      startTimeRef.current = Date.now();
      initialTimeRef.current = newInitialTime;
      localStorage.setItem(`startTime_${id}`, startTimeRef.current.toString());
      localStorage.setItem(
        `initialTime_${id}`,
        initialTimeRef.current.toString(),
      );
    }

    // Calcular el tiempo restante inicial
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    const remaining = Math.max(0, initialTimeRef.current - elapsed);
    setRemainingTime(remaining);

    // Marcar como inicializado
    isInitializedRef.current = true;
  }, [id, minutes]); // Depende de id y minutes

  // Actualizar el tiempo cada segundo
  useEffect(() => {
    // No iniciar el intervalo hasta que se haya inicializado
    if (!isInitializedRef.current) return;

    intervalRef.current = setInterval(() => {
      if (startTimeRef.current !== null && initialTimeRef.current !== null) {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        const remaining = Math.max(0, initialTimeRef.current - elapsed);
        setRemainingTime(remaining);

        // Si el tiempo llegó a cero, cambiar el fondo a rojo
        if (remaining === 0 && !isRedBackground) {
          setIsRedBackground(true);
          localStorage.setItem(`isRedBackground_${id}`, "true");
        }
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [id, isRedBackground]);

  const formatTime = (seconds) => {
    const roundedSeconds = Math.round(seconds);
    const mins = Math.floor(roundedSeconds / 60);
    const secs = roundedSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getColorBadgeClass = (color) => {
    const colorMap = {
      verde: "bg-green-500",
      rojo: "bg-red-500",
      azul: "bg-blue-500",
      amarillo: "bg-yellow-500",
      morado: "bg-purple-500",
      naranja: "bg-orange-500",
    };
    return colorMap[color?.toLowerCase()] || "bg-gray-500";
  };

  const isTimeExpired = remainingTime === 0;
  const isTimeWarning = remainingTime > 0 && remainingTime <= 300; // últimos 5 minutos

  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 ${
        isTimeExpired
          ? "bg-gradient-to-br from-red-500 to-red-600 animate-pulse"
          : isTimeWarning
            ? "bg-gradient-to-br from-orange-400 to-orange-500"
            : "bg-gradient-to-br from-blue-500 to-blue-600"
      }`}
    >
      {/* Badge de estado */}
      <div className="absolute top-3 right-3">
        {isTimeExpired ? (
          <span className="px-3 py-1 bg-white text-red-600 text-xs font-bold rounded-full shadow-lg">
            ⚠ EXPIRADO
          </span>
        ) : isTimeWarning ? (
          <span className="px-3 py-1 bg-white text-orange-600 text-xs font-bold rounded-full shadow-lg">
            ⏰ URGENTE
          </span>
        ) : null}
      </div>

      <div className="p-6">
        {/* Nombre */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-white mb-1 flex items-center">
            <svg
              className="w-6 h-6 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            {name}
          </h3>
        </div>

        {/* Identificación */}
        <div className="flex items-center mb-3 text-white/90">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-semibold">
            Numero de Identidad: {identifications}
          </span>
        </div>

        {/* Color de Manilla */}
        <div className="flex items-center mb-4">
          <span className="text-white/90 text-sm font-medium mr-2">
            Manilla:
          </span>
          <div className="flex items-center bg-white/20 rounded-full px-3 py-1">
            <div
              className={`w-4 h-4 rounded-full ${getColorBadgeClass(handleColor)} mr-2 ring-2 ring-white`}
            ></div>
            <span className="text-white font-semibold capitalize text-sm">
              {handleColor}
            </span>
          </div>
        </div>

        {/* Timer - Protagonista */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-white/30">
          <div className="text-center">
            <p className="text-white/80 text-sm font-medium mb-1">
              TIEMPO RESTANTE
            </p>
            <p
              className={`text-5xl font-black ${
                isTimeExpired ? "text-white" : "text-white"
              } tracking-wider font-mono`}
            >
              {formatTime(remainingTime)}
            </p>
            {isTimeExpired && (
              <p className="text-white text-sm mt-2 font-semibold">
                ¡Tiempo finalizado!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerCard;
