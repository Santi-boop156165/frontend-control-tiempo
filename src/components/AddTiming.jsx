import { useEffect, useState } from "react";
import { ApiGetTime } from "../api/Api_get";
import { ApiGetById } from "../api/Api_get";
import { ApiUpdateTime } from "../api/Api_put";
import { sendTiming, sendUserData } from "../api/Api_post";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import toast from "react-hot-toast";

const AddTiming = () => {
  const params = useParams();
  const [clientData, setClientData] = useState({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    minutes_spent: "",
    consentNumber: "",
    handleColor: "",
    annotations: "",
  });

  const getClient = async () => {
    try {
      const response = await ApiGetById(params.clientId);
      const time = await ApiGetTime(params.clientId);
      setClientData(response.cliente);

      if (params.timeId) {
        const existingTime = time.control_tiempo.find(
          (t) => t.id === parseInt(params.timeId, 10),
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
        navigate(`/control/${params.clientId}`);
      } else {
        formData.cliente = params.clienteId;
        await sendTiming(formData);

        // Sincronizar con la API de usuarios para que aparezca en Control_Tiempo
        const updatedClient = await ApiGetById(params.clienteId);
        const updatedTime = await ApiGetTime(params.clienteId);
        const fullClientData = {
          ...updatedClient.cliente,
          control_tiempo: updatedTime.control_tiempo,
        };
        await sendUserData(fullClientData);

        toast.success("Registro exitoso");
        navigate(`/tiempo`);
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
    <main className="flex items-center justify-center bg-gradient-to-b from-slate-200 to-green-100 min-h-screen p-8">
      <section className="max-w-2xl w-full mx-auto bg-white rounded-xl shadow-2xl p-8 md:p-12 relative">
        {/* Botón de retorno */}
        <NavLink
          to={`/control/${params.clientId}`}
          className="absolute top-6 left-6 text-gray-600 hover:text-gray-900 transition-all hover:scale-110"
          title="Volver atrás"
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

        {/* Header */}
        <header className="mb-8 pt-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            {params.timeId ? "Editar Registro" : "Agregar Tiempo"}
          </h2>
          <p className="text-center text-gray-600">
            Cliente:{" "}
            <span className="font-semibold">{clientData.first_name}</span>
          </p>
        </header>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            {/* Fecha */}
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-semibold text-gray-700 mb-2"
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
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            {/* Minutos */}
            <div>
              <label
                htmlFor="minutes_spent"
                className="block text-sm font-semibold text-gray-700 mb-2"
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
                min="1"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            {/* Número de Consentimiento */}
            <div>
              <label
                htmlFor="consentNumber"
                className="block text-sm font-semibold text-gray-700 mb-2"
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
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            {/* Color de Manilla */}
            <div>
              <label
                htmlFor="handleColor"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Color de Manilla:
              </label>
              <select
                name="handleColor"
                id="handleColor"
                value={formData.handleColor}
                onChange={handleInputChange}
                required
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all bg-white"
              >
                <option value="">Seleccionar color</option>
                <option value="verde">Verde</option>
                <option value="rojo">Rojo</option>
                <option value="azul">Azul</option>
                <option value="amarillo">Amarillo</option>
                <option value="morado">Morado</option>
                <option value="naranja">Naranja</option>
              </select>
            </div>

            {/* Anotaciones */}
            <div>
              <label
                htmlFor="annotations"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Notas (opcional):
              </label>
              <textarea
                name="annotations"
                id="annotations"
                value={formData.annotations}
                onChange={handleInputChange}
                rows="4"
                placeholder="Agregar notas o comentarios adicionales..."
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all resize-none"
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(`/control/${params.clientId}`)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {params.timeId ? "✓ Actualizar" : "✓ Registrar"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default AddTiming;
