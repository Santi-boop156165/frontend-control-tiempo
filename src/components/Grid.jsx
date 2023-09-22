import { useEffect, useState } from "react";
import { ApiGet } from "../api/Api_get";
import { NavLink } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaUserClock, FaHome } from "react-icons/fa";
const Grid = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    const response = await ApiGet(currentPage, search);
    setData(response.clientes);
    setTotalPages(response.total_pages);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, search]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previewPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onSearch = (e) => {
    setCurrentPage(1);
    setSearch(e.target.value);
  };

  return (
    <div className="flex flex-col mt-2">
      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
          <div className="flex justify-between">
            <input
              value={search}
              onChange={onSearch}
              type="search"
              placeholder="Buscar cliente"
              className="w-80 px-2 mb-4 border rounded"
            />
            <NavLink
            to={`/`}
          className="text-gray-800 hover:text-gray-400 font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out"
        >
          <FaHome className="text-xl" />
        </NavLink>
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-400 text-white">
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
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Control de tiempo
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((cliente, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cliente.first_name} {cliente.second_name}
                  </td>
                  <td>
                    {cliente.first_surname} {cliente.second_surname}
                  </td>
                  <td>{cliente.age}</td>
                  <td>{cliente.identification}</td>
                  <td>{cliente.phone}</td>
                  <td>{cliente.email}</td>
                  <td>
                    <NavLink
                      to={`/control/${cliente.id}`}
                      className="bg-green-200 text-black py-2 px-4 rounded-md flex w-48 hover:bg-green-600"
                    >
                      <FaUserClock className="text-xl mr-2 " />
                      Tiempo
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-start gap-6 mt-4 px-8">
        <button
          onClick={previewPage}
          className="text-gray-800 hover:text-gray-400 font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out"
        >
          <FaArrowLeft className="text-xl" />
        </button>
        <button
          onClick={nextPage}
          className="text-gray-800 hover:text-gray-400 font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out"
        >
          <FaArrowRight className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Grid;
