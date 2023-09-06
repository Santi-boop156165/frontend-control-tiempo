import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ApiGetById } from "../api/Api_get";
import { ApiDeleteById } from "../api/Api.delete";
import { NavLink, useNavigate } from "react-router-dom";

const ControlTiempoDetalle = () => {
  const { clienteId } = useParams();
  const [clienteDetalle, setClienteDetalle] = useState({});
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 2;

  const timeClientsPagination = () => {
    return clienteDetalle.control_tiempo
      ? clienteDetalle.control_tiempo.slice(
          currentPage,
          currentPage + itemsPerPage
        )
      : [];
  };

  const nextPage = () => {
    if (currentPage + itemsPerPage < clienteDetalle.control_tiempo.length) {
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
      setClienteDetalle(response.cliente);
    };

    fetchClienteDetalle();
  }, [clienteId]);

  const handleDelete = async (id) => {
    try {
      await ApiDeleteById(id);
      navigate("/clientes");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="flex items-center justify-center bg-gradient-to-b from-slate-200 to-green-100 min-h-screen p-8">
      <section className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-20">
        <header className="mb-4">
          <h2 className="text-2xl font-semibold text-center">
            Detalles del control de tiempo
          </h2>
        </header>
        <div className="grid grid-cols-2 gap-12">
          <section className="mb-4 sm:mb-0">
            <h3 className="text-xl">Información del cliente:</h3>
            <p>
              <strong>Nombre:</strong> {clienteDetalle.first_name}
            </p>
            <p>
              <strong>Teléfono:</strong> {clienteDetalle.phone}
            </p>
            <p>
              <strong>Correo:</strong> {clienteDetalle.email}
            </p>
          </section>
          <section>
            <h3 className="text-xl">Control de tiempo:</h3>
            {timeClientsPagination().length > 0 ? (
              <ul>
                {timeClientsPagination().map((item) => (
                  <li key={item.id} className="mb-2">
                    <p>
                      <strong>Fecha:</strong> {item.date}
                    </p>
                    <p>
                      <strong>Minutos:</strong> {item.minutes_spent}
                    </p>
                    <p>
                      <strong>Color Manilla:</strong> {item.handleColor}
                    </p>
                    <p>
                      <strong># Consentimiento</strong> {item.consentNumber}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay datos de control de tiempo disponibles.</p>
            )}
            {timeClientsPagination().length > 0 && (
              <div className="border-t border-black mt-8 pt-8">
                <div className="flex gap-6">
                  <button onClick={previewPage}>Anterior</button>
                  <button onClick={nextPage}>Siguiente</button>
                </div>
              </div>
            )}
          </section>
        </div>
        <footer className="flex flex-col justify-center mt-4 gap-6">
          <NavLink
            to={`/`}
            className="bg-indigo-500 text-white  text-center  py-2 px-4 rounded-md hover:bg-indigo-600"
          >
            Volver al menú principal
          </NavLink>
          {clienteId && (
            <>
              <button
                onClick={() => handleDelete(clienteId)}
                className="bg-red-400 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Eliminar Cliente
              </button>
              <NavLink
                to={`/update/${clienteId}`}
                className="bg-stone-400 text-white py-2 px-4 rounded-md hover:bg-stone-600 text-center"
              >
                Editar Cliente
              </NavLink>
            </>
          )}
        </footer>
      </section>
    </main>
  );
};

export default ControlTiempoDetalle;
