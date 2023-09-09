import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ApiGetById } from "../api/Api_get";
import { ApiGetTime } from "../api/Api_get";
import { NavLink, useNavigate } from "react-router-dom";

const ControlTiempoDetalle = () => {
  const { clienteId } = useParams();
  const [clienteDetalle, setClienteDetalle] = useState({});
  const [clienteTiempo, setClienteTiempo] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);


  console.log(clienteTiempo);
  console.log(clienteDetalle);

  const itemsPerPage = 1;

  const timeClientsPagination = () => {
    return clienteTiempo
      ? clienteTiempo.slice(
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
      const time = await ApiGetTime(clienteId);
      setClienteDetalle(response.cliente);
      setClienteTiempo(time.control_tiempo);
    };
    fetchClienteDetalle();
  }, [clienteId]);

  

  return (
    <main className="flex items-center justify-center bg-gradient-to-b from-slate-200 to-green-100 min-h-screen p-8">
      <section className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-20">
        <header className="mb-4">
          <h2 className="text-2xl font-semibold text-center">
            Detalles del control de tiempo
          </h2>
 
        </header>
        <div className="grid grid-cols-2 gap-12">
          <section className="mb-4 sm:mb-0 flex flex-col gap-6">
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
          <section className="flex flex-col gap-6">



            <h3 className="text-xl">Control de tiempo:</h3>

            {timeClientsPagination().length > 0 ? (
              <ul>
                {timeClientsPagination().map((item) => (
                  <li key={item.id} className="mb-2 flex flex-col gap-6">
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
                    <p>
                      <strong>Anotaciones</strong>{" "}
                      {item.annotations
                        ? item.annotations
                        : "no tiene anotaciones"}
                    </p>
                    <NavLink
            to={`/update_timing/${clienteId}/${item.id}`}
            className="bg-yellow-400 text-white  text-center  py-2 px-4 rounded-md hover:bg-yellow-600 w-44 "
          >
            Editar Tiempo
          </NavLink>
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
              <NavLink
                to={`/update/${clienteId}`}
                className="bg-red-300 text-white py-2 px-4 rounded-md hover:bg-red-600 text-center"
              >
                Agregar Tiempo
              </NavLink>
            </>
          )}
        </footer>
      </section>
    </main>
  );
};

export default ControlTiempoDetalle;
