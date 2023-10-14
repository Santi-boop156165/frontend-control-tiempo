import React from 'react'
import { useEffect, useState } from "react";
import { ApiGetUsers } from '../api/Api_get';
import { ApiDeleteByUserId } from '../api/Api.delete';
import TimerCard from './TimeCard';
import Logo from '../assets/logo.svg';

const Control_Tiempo = () => {
  const [data, setData] = useState([]);




  console.log('Datos en localStorage antes de eliminar:', localStorage);
  const handleDelete = async (userId, userName) => {
    const confirmed = window.confirm(`¿Estás seguro de que deseas eliminar a ${userName}?`);
    if (confirmed) {
      try {
        await ApiDeleteByUserId(userId);
        setData((prevData) => prevData.filter(cliente => cliente.id !== userId));
        localStorage.removeItem(`remainingTime_${userId}`);
        localStorage.removeItem(`isRedBackground_${userId}`);
         console.log('Datos en localStorage después de eliminar:', localStorage);
      } catch (error) {
        console.log(error);
      }
    }
  };



  useEffect(() => {
    async function fetchData() {
      const response = await ApiGetUsers();
      setData(response.clientes);
    }
    fetchData();
  }, []);




  return (
    <div
    style={{
      backgroundImage: `url(${Logo})`,
      backgroundSize: '600px 600px',
      backgroundRepeat: 'no-repeat', 
      backgroundPosition: 'center' 
    }}
     className="flex flex-wrap gap-4 p-6  bg-cover bg-no-repeat h-screen   ">
      {data.map((cliente) => (
        <div key={cliente.id} className="flex flex-col gap-2">
          <TimerCard
            id={cliente.id}
            name={`${cliente.first_name} ${cliente.first_surname}`}
            minutes={cliente.control_tiempo[0].minutes_spent}
            handleColor={cliente.control_tiempo[0].handleColor}
            identifications={cliente.identification}
          />
          <button
           className=" transform transition-all duration-200 hover:-translate-y-1 
           focus:outline-none bg-gradient-to-r
            from-red-500 to-white  
            font-bold rounded-md py-2 px-6 shadow-md
             hover:shadow-lg text-white "
            onClick={() => handleDelete(cliente.id, `${cliente.first_name} ${cliente.second_name}`)}
          >
            Eliminar
          </button>
          
        </div>
      ))}
    </div>
  );
};

export default Control_Tiempo;