import React, { useState, useEffect } from "react";
import { ApiGet } from "../api/Api_get";
import ButtonDowloadExcel from "./ButtonDowloadExcel";
import ButtonDowloadPdf from "./ButtonDowloadPdf";

const Reporte = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const allData = [];
      let currentPage = 1;
      while (true) {
        const response = await ApiGet(currentPage);
        const { clientes, total_pages } = response;
        allData.push(...clientes);
        currentPage++;

        if (currentPage > total_pages) {
          break; 
        }
      }

      setData(allData);
    }

    fetchData();
  }, []);

  return (
    <main className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-200 to-green-100 ">
      <section className="bg-white shadow-lg p-8 rounded-lg text-center w-[684px] h-96">
        <h1 className="text-3xl font-semibold mb-6">Cerrar caja </h1>
        <div className="block bg-green-300 text-white py-2 px-4 rounded-md hover:bg-green-600 mt-4">
          <ButtonDowloadExcel data={data} />
        </div>
        <div className="block bg-red-300 text-white py-2 px-4 rounded-md hover:bg-red-600 mt-4">
          <ButtonDowloadPdf data={data} />
        </div>
      </section>
    </main>
  );
};

export default Reporte;
