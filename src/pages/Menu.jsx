import React from 'react'
import { NavLink } from "react-router-dom";

const Menu = () => {
    return (
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
            className="block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Ver Clientes Dentro del Local
          </NavLink>
        </div>
      </div>
    );
  };
  

export default Menu