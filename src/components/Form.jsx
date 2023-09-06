import { useForm } from "react-hook-form";
import { SendData, sendUserData } from "../api/Api_post";
import { ApiUpdateById } from "../api/Api_put";
import { ApiGetById } from "../api/Api_get";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
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
      if (!params.clienteId) {
        await SendData(data);
        await sendUserData(data);
        toast.success("Registro exitoso");
        navigate("/clientes");
      } else {
        console.log(data);
        await ApiUpdateById(clientData.id, data);
        await sendUserData(data);
        toast.success("Actualizacion exitosa");
        navigate("/clientes");
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
      const { control_tiempo, ...clientDataWithoutControlTiempo } = clientData;

      Object.keys(clientDataWithoutControlTiempo).forEach((key) => {
        setValue(key, clientDataWithoutControlTiempo[key]);
      });
    }
  }, [clientData, setValue]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="w-full p-2 mb-4 border rounded"
          type="text"
          placeholder="Escribe Tu Nombre"
          autoComplete="off"
          {...register("first_name")}
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          type="text"
          placeholder="Escribe Tu Segundo Nombre"
          autoComplete="off"
          {...register("second_name")}
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          type="text"
          placeholder="Escribe tu apellido"
          autoComplete="off"
          {...register("first_surname")}
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          type="text"
          placeholder="Escribe tu Segundo apellido"
          autoComplete="off"
          {...register("second_surname")}
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          type="number"
          min="0"
          autoComplete="off"
          placeholder="Escribe tu Edad"
          {...register("age")}
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          type="number"
          min="0"
          autoComplete="off"
          placeholder="Escribe tu numero de identificacion"
          {...register("identification")}
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          type="number"
          min="0"
          autoComplete="off"
          placeholder="Escribe tu telefono"
          {...register("phone")}
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          type="email"
          min="0"
          autoComplete="off"
          placeholder="Escribe tu email"
          {...register("email")}
        />
        <button
          type="button"
          className="flex flex-col"
          onClick={handleAddControlFields} 
        >
          Agregar Tiempo
        </button>
        {controlTiempoFields.map((control, index) => (
          <div key={index} className="flex flex-col gap-2 mt-2 items-center justify-center">
            <input
              type="date"
              className=" w-52 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400"
              {...register(`control_tiempo[${index}].date`)}
              placeholder="Fecha"
            />
            <input
              className=" w-52 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400"
              type="number"
              min="0"
              placeholder="Minutos"
              {...register(`control_tiempo[${index}].minutes_spent`)}
            />
            <input
              className="w-52 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400"
              type="number"
              min="0"
              autoComplete="off"
              placeholder="# Consentimiento"
              {...register(`control_tiempo[${index}].consentNumber`)}
            />
             <input
              className=" w-52 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400"
              type="text"
              min="0"
              autoComplete="off"
              placeholder="Color Manilla"
              {...register(`control_tiempo[${index}].handleColor`)}
            />
          </div>
        ))}
        <div className="flex flex-col p-6 gap-4">
          {params.clienteId ? (
            <button
              type="submit"
              value="enviar"
              className="mt-6 transform transition-all duration-200 
              hover:-translate-y-1 focus:outline-none bg-gradient-to-r from-green-200
               to-white text-slate-600 font-bold rounded-md py-2 
               px-6 shadow-md hover:shadow-lg "
            >
              Actualizar
            </button>
          ) : (
            <button
              type="submit"
              value="enviar"
              className="mt-6 transform transition-all 
              duration-200 hover:-translate-y-1 focus:outline-none 
              bg-gradient-to-r from-green-200 to-white text-slate-600
               font-bold rounded-md py-2 px-6 shadow-md hover:shadow-lg "
            >
              Registrar
            </button>
          )}

          <NavLink
            to={`/`}
            className=" text-center mt-6 transform transition-all duration-200 
            hover:-translate-y-1 focus:outline-none bg-gradient-to-r from-green-200
             to-white text-slate-600 font-bold rounded-md py-2 px-6 shadow-md 
             hover:shadow-lg "
          >
            menú
          </NavLink>
        </div>
      </form>
    </div>
  );
};
export default Form;
