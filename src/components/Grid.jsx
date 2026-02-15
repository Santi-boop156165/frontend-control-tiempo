import { useEffect, useState } from "react";
import { ApiGet } from "../api/Api_get";
import { NavLink } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaUserClock, FaHome } from "react-icons/fa";
const Grid = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const response = await ApiGet(currentPage, search);
      if (response && response.clientes) {
        setData(response.clientes);
        setTotalPages(response.total_pages || 0);
      } else {
        setData([]);
        setTotalPages(0);
      }
    } catch (error) {
      console.error("Error en fetchData:", error);
      setData([]);
      setTotalPages(0);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, search]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previewPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onSearch = (e) => {
    setCurrentPage(1);
    setSearch(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-200 to-green-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header con buscador y botón home */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Buscador con ícono */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  value={search}
                  onChange={onSearch}
                  type="search"
                  placeholder="Buscar cliente por nombre, apellido, identificación..."
                  className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Botón Home */}
            <NavLink
              to={`/`}
              className="inline-flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
              title="Volver al inicio"
            >
              <FaHome className="text-xl" />
            </NavLink>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-green-500 to-green-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Apellidos
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Edad
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Identificación
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Teléfono
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Control de tiempo
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.length > 0 ? (
                  data.map((cliente, index) => (
                    <tr
                      key={index}
                      className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-green-50 transition-colors`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {cliente.first_name} {cliente.second_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {cliente.first_surname} {cliente.second_surname}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {cliente.age}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {cliente.identification}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {cliente.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {cliente.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <NavLink
                          to={`/control/${cliente.id}`}
                          className="inline-flex items-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all shadow-md hover:shadow-lg font-medium"
                        >
                          <FaUserClock className="text-lg mr-2" />
                          Tiempo
                        </NavLink>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center">
                        <svg
                          className="w-16 h-16 text-gray-300 mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                        <p className="text-lg font-medium">
                          No se encontraron clientes
                        </p>
                        <p className="text-sm">
                          Intenta con otro término de búsqueda
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Paginación */}
        {data.length > 0 && (
          <div className="flex items-center justify-between mt-6 bg-white rounded-xl shadow-lg p-4">
            <button
              onClick={previewPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow font-medium"
            >
              <FaArrowLeft className="text-lg" />
              Anterior
            </button>

            <span className="px-4 py-2 bg-green-100 border-2 border-green-300 rounded-lg text-sm font-semibold text-gray-700">
              Página {currentPage} de {totalPages}
            </span>

            <button
              onClick={nextPage}
              disabled={currentPage >= totalPages}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow font-medium"
            >
              Siguiente
              <FaArrowRight className="text-lg" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Grid;
