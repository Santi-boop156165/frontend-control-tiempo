import { NavLink } from "react-router-dom";
import { ApiDownloadReport } from "../api/Api_get";
import { useState } from "react";

const Menu = () => {
  const [showReportModal, setShowReportModal] = useState(false);

  const handleReportSelection = (periodo) => {
    ApiDownloadReport(periodo);
    setShowReportModal(false);
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-200 to-green-100 ">
        <div className="bg-white shadow-lg p-8 rounded-lg text-center w-[684px] h-96">
          <h1 className="text-3xl font-semibold mb-6">Menú Principal</h1>
          <NavLink
            to="/clientes"
            className="block bg-indigo-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-indigo-600"
          >
            Listar Clientes
          </NavLink>
          <NavLink
            to="/registro"
            className="block bg-green-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-green-600"
          >
            Registrar Clientes
          </NavLink>
          <NavLink
            to={`/tiempo`}
            className="block bg-blue-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-blue-600"
          >
            Ver Clientes Dentro del Local
          </NavLink>
          <button
            onClick={() => setShowReportModal(true)}
            className="block w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600"
          >
            Descargar Reporte Excel
          </button>
        </div>
      </div>

      {/* Modal de selección de reporte */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
              Seleccionar Tipo de Reporte
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Elige el periodo del reporte a descargar
            </p>

            <div className="space-y-3">
              <button
                onClick={() => handleReportSelection("diario")}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg font-semibold"
              >
                📅 Reporte Diario
              </button>

              <button
                onClick={() => handleReportSelection("semanal")}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg font-semibold"
              >
                📊 Reporte Semanal
              </button>

              <button
                onClick={() => handleReportSelection("mensual")}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg font-semibold"
              >
                📈 Reporte Mensual
              </button>
            </div>

            <button
              onClick={() => setShowReportModal(false)}
              className="w-full mt-4 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-all font-medium"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
