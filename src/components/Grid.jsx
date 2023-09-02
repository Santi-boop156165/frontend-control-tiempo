import { useEffect, useState } from "react";
import { ApiGet } from "../api/Api_get";
import { NavLink } from "react-router-dom";

const Grid = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");


  const filteredClients  = () =>{

    if(search.length === 0){
      return data.slice(currentPage, currentPage + 6);
    }else{
      const filtered = data.filter(cliente => cliente.first_name.includes(search));
      return filtered.slice(currentPage, currentPage + 6)
      

  }
}

  const nextPage = () => {

    if(data.filter(cliente => cliente.first_name.includes(search)).length > currentPage + 6){
      setCurrentPage(currentPage + 6);
    }

  
  }

  const previewPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 6);
    }
  }

  const onSearch = (e) => {
    setCurrentPage(0);
    setSearch(e.target.value);
  }
  


  useEffect(() => {
    async function fetchData() {
      const response = await ApiGet();
      setData(response.clientes);
     
    }
    fetchData();
  }, []);

  

  return (
    <div className="flex flex-col mt-8">
      <div className="overflow-x-auto">
        
        <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
          <input
          value={search}
          onChange={onSearch}
          type="search"
          placeholder="Buscar cliente"
          className="w-80 px-2 mb-4 border rounded"
          />
          
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Apellidos
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Edad
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Identificación
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Teléfono
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Ver control de tiempo
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients().map((cliente, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cliente.first_name} {cliente.second_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cliente.first_surname} {cliente.second_surname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{cliente.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cliente.identification}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cliente.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                   <NavLink to={`/control/${cliente.id}`}
                    className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
                    >
                        Ver control de tiempo
                      </NavLink>
     
                  </td>
               
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-start gap-6 mt-4">

         <button
         onClick={previewPage}
         >
          Anterior
        </button>
        <button
        onClick={nextPage}
        >
          Siguiente
        </button>
      </div>
      <div className="flex items-center justify-center">
      <NavLink
        to={`/`}
        className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
          Volver al menú principal
        </NavLink>
      </div>
    </div>
  );
};

export default Grid;
