import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const ButtonDowloadExcel = ({ data }) => {
    const [loading, setLoading] = useState(false);
    const currentDateISO = new Date(new Date().setHours(0, 0, 0, 0)).toISOString().split('T')[0];
    console.log(currentDateISO);
    const flattenControlTiempo = (clientes) => {
        const flattenedData = [];
      
        clientes.forEach((cliente) => {
          const lastControl = cliente.control_tiempo.slice().sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          })[0]; // Obtiene el último control de tiempo
            
            console.log(lastControl.date);
          if (lastControl && lastControl.date === currentDateISO) {
            flattenedData.push({
              id: cliente.id,
              first_name: cliente.first_name,
              second_name: cliente.second_name,
              first_surname: cliente.first_surname,
              second_surname: cliente.second_surname,
              age: cliente.age,
              identification: cliente.identification,
              phone: cliente.phone,
              email: cliente.email,
              control_tiempo_date: lastControl.date,
              control_tiempo_minutes_spent: lastControl.minutes_spent,
              control_tiempo_consentNumber: lastControl.consentNumber,
              control_tiempo_handleColor: lastControl.handleColor,
            });
          }
        });
      
        return flattenedData;
      };
  
    const handleDowload = () => {
      setLoading(true);
      const flattenedData = flattenControlTiempo(data);
  
      const book = XLSX.utils.book_new();
      const sheet = XLSX.utils.json_to_sheet(flattenedData);
  
      XLSX.utils.book_append_sheet(book, sheet, "Clientes");
  
      setTimeout(() => {
        XLSX.writeFile(book, "Reporte.xlsx");
        setLoading(false);
      }, 1000);
    };
  
    return (
      <>
        {!loading ? (
          <button className="" onClick={handleDowload}>
            Excel
          </button>
        ) : (
          // Contenido a mostrar cuando loading es verdadero
          <div>Cargando...</div>
        )}
      </>
    );
  };
  
  export default ButtonDowloadExcel;