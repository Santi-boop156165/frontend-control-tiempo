import { useForm } from "react-hook-form";
import { SendData, sendUserData } from "../api/Api_post";
import { ApiUpdateById } from "../api/Api_put";
import { ApiGetById } from "../api/Api_get";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [controlTiempoFields, setControlTiempoFields] = useState([]);
  const [clientData, setClientData] = useState({});
  const { register, handleSubmit, setValue } = useForm();
  const [addedControlFields, setAddedControlFields] = useState(false);

  const handleAddControlFields = () => {
    if (!addedControlFields) {
      setControlTiempoFields([...controlTiempoFields, {}]);
      setAddedControlFields(true);
    }
  };

  const onSubmit = async (data) => {
    try {
      const hasControlTiempo =
        data.control_tiempo && data.control_tiempo.length > 0;

      if (!params.clienteId) {
        await SendData(data);
        if (hasControlTiempo) {
          await sendUserData(data);
        }
        toast.success("Registro exitoso");
        navigate(hasControlTiempo ? "/tiempo" : "/clientes");
      } else {
        console.log(data);
        await ApiUpdateById(clientData.id, data);

        if (hasControlTiempo) {
          await sendUserData(data);
        }

        toast.success("Actualizacion exitosa");
        navigate(hasControlTiempo ? "/tiempo" : "/clientes");
      }
    } catch (error) {
      console.log(error + "ads");
      const dataError = error.response.data;

      const keys = Object.keys(dataError);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = dataError[key];
        console.log(value);
        toast.error(`${key}: ${value}`);
      }
    }
  };
  const getClient = async () => {
    try {
      const response = await ApiGetById(params.clienteId);
      setClientData(response.cliente);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.clienteId) {
      getClient(params.clienteId);
    }
  }, [params.clienteId]);

  useEffect(() => {
    if (Object.keys(clientData).length > 0) {
      const { ...clientDataWithoutControlTiempo } = clientData;

      Object.keys(clientDataWithoutControlTiempo).forEach((key) => {
        setValue(key, clientDataWithoutControlTiempo[key]);
      });
    }
  }, [clientData, setValue]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-200 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            {params.clienteId ? "Editar Cliente" : "Registro de Cliente"}
          </h2>
          <p className="text-gray-600">
            {params.clienteId
              ? "Actualiza la información del cliente"
              : "Completa los datos para registrar un nuevo cliente"}
          </p>
        </div>

        <form
          className="bg-white rounded-xl shadow-2xl p-8 md:p-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Información Personal */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-green-400 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              Información Personal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Primer Nombre *
                </label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
                  type="text"
                  placeholder="Juan"
                  autoComplete="given-name"
                  required
                  {...register("first_name")}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Segundo Nombre
                </label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
                  type="text"
                  placeholder="Carlos"
                  autoComplete="additional-name"
                  {...register("second_name")}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Primer Apellido *
                </label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
                  type="text"
                  placeholder="Pérez"
                  autoComplete="family-name"
                  required
                  {...register("first_surname")}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Segundo Apellido
                </label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
                  type="text"
                  placeholder="García"
                  autoComplete="family-name"
                  {...register("second_surname")}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Edad *
                </label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
                  type="number"
                  min="1"
                  max="120"
                  placeholder="25"
                  autoComplete="off"
                  required
                  {...register("age")}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Identificación *
                </label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
                  type="number"
                  min="0"
                  placeholder="1234567890"
                  autoComplete="off"
                  required
                  {...register("identification")}
                />
              </div>
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-400 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Información de Contacto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Teléfono *
                </label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
                  type="tel"
                  placeholder="3001234567"
                  autoComplete="tel"
                  required
                  {...register("phone")}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  autoComplete="email"
                  required
                  {...register("email")}
                />
              </div>
            </div>
          </div>

          {/* Control de Tiempo */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 pb-2 border-b-2 border-purple-400 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-purple-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                Control de Tiempo
              </h3>
              {!addedControlFields && (
                <button
                  type="button"
                  onClick={handleAddControlFields}
                  className="inline-flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all shadow-md hover:shadow-lg font-medium"
                >
                  <svg
                    className="w-5 h-5 mr-2"
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
                </button>
              )}
            </div>

            {controlTiempoFields.map((control, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border-l-4 border-purple-500 shadow-md"
              >
                <p className="text-sm font-semibold text-gray-600 mb-4">
                  Registro de Tiempo
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fecha *
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                      {...register(`control_tiempo[${index}].date`)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Minutos *
                    </label>
                    <input
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                      required
                      type="number"
                      min="1"
                      placeholder="60"
                      {...register(`control_tiempo[${index}].minutes_spent`)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      # Consentimiento *
                    </label>
                    <input
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                      required
                      type="text"
                      placeholder="123456"
                      autoComplete="off"
                      {...register(`control_tiempo[${index}].consentNumber`)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Color de Manilla *
                    </label>
                    <select
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all bg-white"
                      required
                      {...register(`control_tiempo[${index}].handleColor`)}
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
                </div>
              </div>
            ))}
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-gray-200">
            <NavLink
              to={`/`}
              className="flex-1 text-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              Volver al Menú
            </NavLink>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {params.clienteId
                ? "✓ Actualizar Cliente"
                : "✓ Registrar Cliente"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Form;
