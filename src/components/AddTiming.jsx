import React, { useEffect, useState } from "react";
import { ApiGetTime } from "../api/Api_get";
import { ApiGetById } from "../api/Api_get";
import { ApiUpdateTime } from "../api/Api_put";
import { sendTiming } from "../api/Api_post";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
const AddTiming = () => {
  const params = useParams();
  const [clientData, setClientData] = useState({});
  const [clienteTiempo, setClienteTiempo] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    minutes_spent: "",
    consentNumber: "",
    handleColor: "",
    annotations: "",
  });

  const itemsPerPage = 4;

  const itemsTimePagination = () => {
    return clienteTiempo
      ? clienteTiempo.slice(currentPage, currentPage + itemsPerPage)
      : [];
  };

  const nextPage = () => {
    if (currentPage + itemsPerPage < clienteTiempo.length) {
      setCurrentPage(currentPage + itemsPerPage);
    }
  }

  const previewPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - itemsPerPage);
    }
  }

  const getClient = async () => {
    try {
      const response = await ApiGetById(params.clientId);

      const time = await ApiGetTime(params.clientId);
      setClientData(response.cliente);
      setClienteTiempo(time.control_tiempo);

      if (params.timeId) {
        const existingTime = time.control_tiempo.find(
          (t) => t.id === parseInt(params.timeId, 10)
        );
        if (existingTime) {
          setFormData(existingTime);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.clientId) {
      getClient(params.clientId);
    }
  }, [params.clientId, params.timeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (params.timeId) {
        await ApiUpdateTime(params.clientId, params.timeId, formData);
        toast.success("Actualización exitosa");
        navigate("/clientes");
      } else {
        formData.cliente = params.clienteId;
        await sendTiming(formData);
        console.log(formData);
        toast.success("Registro exitoso");
      }

      setFormData({
        date: "",
        minutes_spent: "",
        consentNumber: "",
        handleColor: "",
        annotations: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Ocurrió un error durante la operación");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">
        Horarios del Cliente: {clientData.first_name}
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">
                Fecha
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">
                Minutos
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">
                Número de Consentimiento
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">
                Color
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">
                Notas
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Map through your 'clienteTiempo' data here */}
            {itemsTimePagination().map((time, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="py-2 px-4 text-sm text-gray-600">{time.date}</td>
                <td className="py-2 px-4 text-sm text-gray-600">
                  {time.minutes_spent}
                </td>
                <td className="py-2 px-4 text-sm text-gray-600">
                  {time.consentNumber}
                </td>
                <td className="py-2 px-4 text-sm text-gray-600">
                  {time.handleColor}
                </td>
                <td className="py-2 px-4 text-sm text-gray-600">
                  {time.annotations}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {clienteTiempo.length > 0 && (
          <div className="flex justify-end  gap-6 items-center mt-4">
            <button
              onClick={previewPage}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Anterior
            </button>
            <button
              onClick={nextPage}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <h3 className="text-lg font-semibold mb-4">
          Editar tiempo en Base de datos:
        </h3>

        <div className="flex flex-col mb-4">
          <label
            htmlFor="date"
            className="mb-1 text-sm font-medium text-gray-600"
          >
            Fecha:
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            className="border rounded px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label
            htmlFor="minutes_spent"
            className="mb-1 text-sm font-medium text-gray-600"
          >
            Minutos:
          </label>
          <input
            type="number"
            name="minutes_spent"
            id="minutes_spent"
            value={formData.minutes_spent}
            onChange={handleInputChange}
            required
            className="border rounded px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label
            htmlFor="consentNumber"
            className="mb-1 text-sm font-medium text-gray-600"
          >
            Número de Consentimiento:
          </label>
          <input
            type="text"
            name="consentNumber"
            id="consentNumber"
            value={formData.consentNumber}
            onChange={handleInputChange}
            required
            className="border rounded px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label
            htmlFor="handleColor"
            className="mb-1 text-sm font-medium text-gray-600"
          >
            Color:
          </label>
          <input
            type="text"
            name="handleColor"
            id="handleColor"
            value={formData.handleColor}
            onChange={handleInputChange}
            required
            className="border rounded px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label
            htmlFor="annotations"
            className="mb-1 text-sm font-medium text-gray-600"
          >
            Notas:
          </label>
          <input
            type="text"
            name="annotations"
            id="annotations"
            value={formData.annotations}
            onChange={handleInputChange}
            className="border rounded px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {params.timeId ? "Actualizar" : "Registrar"}
        </button>
      </form>
    </div>
  );
};

export default AddTiming;
