import { useEffect, useState } from "react";
import { ApiGetUsers } from "../api/Api_get";
import { ApiDeleteByUserId } from "../api/Api.delete";
import TimerCard from "./TimeCard";
import Logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";

const Control_Tiempo = () => {
  const [data, setData] = useState([]);

  const handleDelete = async (userId, userName) => {
    const confirmed = window.confirm(
      `¿Estás seguro de que deseas eliminar a ${userName}?`,
    );
    if (confirmed) {
      try {
        // Eliminar del caché temporal (usuarios)
        const userDeleted = await ApiDeleteByUserId(userId);

        if (userDeleted) {
          setData((prevData) =>
            prevData.filter((cliente) => cliente.id !== userId),
          );
          // Limpiar todos los datos relacionados en localStorage
          localStorage.removeItem(`startTime_${userId}`);
          localStorage.removeItem(`initialTime_${userId}`);
          localStorage.removeItem(`isRedBackground_${userId}`);
        } else {
          console.error(
            "No se pudo completar la eliminación en todas las APIs",
          );
        }
      } catch (error) {
        console.error("Error al eliminar cliente:", error);
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await ApiGetUsers();
        // Normalizar y filtrar clientes que tengan control_tiempo válido
        const validClientes = (response.clientes || []).filter((cliente) => {
          if (!cliente.control_tiempo) return false;

          // Si es un objeto, convertirlo a array
          if (!Array.isArray(cliente.control_tiempo)) {
            cliente.control_tiempo = [cliente.control_tiempo];
          }
        console.log("Cliente:", cliente);
          return cliente.control_tiempo.length > 0;
        });
        console.log("Clientes válidos:", validClientes);
        setData(validClientes);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        setData([]);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-200 to-green-100 py-8 px-4">
      {/* Header con logo y botón volver */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 relative">
          {/* Botón de retorno */}
          <NavLink
            to="/"
            className="absolute top-6 left-6 text-gray-600 hover:text-gray-900 transition-all hover:scale-110"
            title="Volver al menú principal"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </NavLink>

          {/* Logo centrado */}
          <div className="flex items-center justify-center">
            <img src={Logo} alt="Logo" className="h-32 w-auto" />
          </div>

          {/* Título */}
          <h1 className="text-center text-2xl font-bold text-gray-800 mt-4">
            Control de Tiempo en Vivo
          </h1>
        </div>
      </div>

      {/* Grid de tarjetas */}
      <div className="max-w-7xl mx-auto">
        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((cliente) => {
              // Obtener el último registro de control_tiempo (más reciente)
              const controlTiempoArray = Array.isArray(cliente.control_tiempo)
                ? cliente.control_tiempo
                : [cliente.control_tiempo];
              const controlTiempo =
                controlTiempoArray[controlTiempoArray.length - 1];

              if (!controlTiempo) return null;

              return (
                <div key={cliente.id} className="flex flex-col gap-3">
                  <TimerCard
                    id={cliente.id}
                    name={
                      `${cliente.first_name || ""} ${cliente.first_surname || ""}`.trim() ||
                      "Sin nombre"
                    }
                    minutes={controlTiempo.minutes_spent || 0}
                    handleColor={controlTiempo.handleColor || "verde"}
                    identifications={cliente.identification || "N/A"}
                  />
                  <button
                    className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                    onClick={() =>
                      handleDelete(
                        cliente.id,
                        `${cliente.first_name || ""} ${cliente.second_name || ""}`.trim() ||
                          "este cliente",
                      )
                    }
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Eliminar
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <svg
              className="w-24 h-24 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No hay clientes en control
            </h3>
            <p className="text-gray-600">
              Agrega clientes con tiempo para verlos aquí
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Control_Tiempo;
