import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ApiGetById } from "../api/Api_get";
import { ApiGetTime } from "../api/Api_get";
import { NavLink } from "react-router-dom";

const ControlTiempoDetalle = () => {
  const { clienteId } = useParams();
  const [clienteDetalle, setClienteDetalle] = useState({});
  const [clienteTiempo, setClienteTiempo] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 1;

  const timeClientsPagination = () => {
    return clienteTiempo
      ? clienteTiempo.slice(currentPage, currentPage + itemsPerPage)
      : [];
  };

  const nextPage = () => {
    if (currentPage + itemsPerPage < clienteTiempo.length) {
      setCurrentPage(currentPage + itemsPerPage);
    }
  };

  const previewPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - itemsPerPage);
    }
  };

  useEffect(() => {
    const fetchClienteDetalle = async () => {
      const response = await ApiGetById(clienteId);
      const time = await ApiGetTime(clienteId);
      setClienteDetalle(response.cliente);
      setClienteTiempo(time.control_tiempo);
    };
    fetchClienteDetalle();
  }, [clienteId]);

  const totalPages = Math.ceil(clienteTiempo.length / itemsPerPage);
  const currentPageNumber = Math.floor(currentPage / itemsPerPage) + 1;

  return (
    <main className="flex items-center justify-center bg-gradient-to-b from-slate-200 to-green-100 min-h-screen p-8">
      <section className="max-w-4xl w-full mx-auto bg-white rounded-xl shadow-2xl p-8 md:p-12 relative">
        <NavLink
          to={`/clientes`}
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

        <header className="mb-8 pt-4">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Detalles del control de tiempo
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Card Información del cliente */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border-l-4 border-blue-500 shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              Información del cliente
            </h3>
            <div className="space-y-3 text-gray-700">
              <p className="flex items-start">
                <span className="font-semibold min-w-[90px]">Nombre:</span>
                <span>{clienteDetalle.first_name}</span>
              </p>
              <p className="flex items-start">
                <span className="font-semibold min-w-[90px]">Teléfono:</span>
                <span>{clienteDetalle.phone}</span>
              </p>
              <p className="flex items-start">
                <span className="font-semibold min-w-[90px]">Correo:</span>
                <span className="break-all">{clienteDetalle.email}</span>
              </p>
            </div>
          </div>

          {/* Card Control de tiempo */}
          <div className="bg-gradient-to-br from-green-100 rounded-lg p-6 border-l-4 border-purple-500 shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              Control de tiempo
            </h3>

            {timeClientsPagination().length > 0 ? (
              <div>
                {timeClientsPagination().map((item) => (
                  <div key={item.id} className="space-y-3 text-gray-700">
                    <p className="flex items-start">
                      <span className="font-semibold min-w-[130px]">
                        Fecha:
                      </span>
                      <span>{item.date}</span>
                    </p>
                    <p className="flex items-start">
                      <span className="font-semibold min-w-[130px]">
                        Minutos:
                      </span>
                      <span>{item.minutes_spent}</span>
                    </p>
                    <p className="flex items-start">
                      <span className="font-semibold min-w-[130px]">
                        Color Manilla:
                      </span>
                      <span className="capitalize">{item.handleColor}</span>
                    </p>
                    <p className="flex items-start">
                      <span className="font-semibold min-w-[130px]">
                        # Consentimiento:
                      </span>
                      <span>{item.consentNumber}</span>
                    </p>
                    <p className="flex items-start">
                      <span className="font-semibold min-w-[130px]">
                        Anotaciones:
                      </span>
                      <span className="italic text-gray-600">
                        {item.annotations || "no tiene anotaciones"}
                      </span>
                    </p>
                    <NavLink
                      to={`/update_timing/${clienteId}/${item.id}`}
                      className="inline-flex items-center justify-center bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all shadow-md hover:shadow-lg mt-4"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      Ver Registros
                    </NavLink>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No hay datos de control de tiempo disponibles.
              </p>
            )}
          </div>
        </div>

        {/* Paginación */}
        {timeClientsPagination().length > 0 && totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mb-8 py-4 bg-gray-50 rounded-lg">
            <button
              onClick={previewPage}
              disabled={currentPage === 0}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Anterior
            </button>
            <span className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-sm font-semibold text-gray-700 shadow-sm">
              Página {currentPageNumber} de {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage + itemsPerPage >= clienteTiempo.length}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow"
            >
              Siguiente
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Botón Agregar Tiempo */}
        <footer className="flex justify-center">
          {clienteId && (
            <NavLink
              to={`/update/${clienteId}`}
              className="inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-8 rounded-xl hover:from-green-600 hover:to-green-700 text-center font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Agregar Tiempo
            </NavLink>
          )}
        </footer>
      </section>
    </main>
  );
};

export default ControlTiempoDetalle;
