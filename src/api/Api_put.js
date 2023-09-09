import axios from "axios";

export async function ApiUpdateById(id, updatedData) {
    try {
      const response = await axios.put(`http://localhost:8000/api/clientes/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error; // Re-lanzamos el error para manejarlo en otro lugar si es necesario
    }
  }

  export async function ApiUpdateTime(id, idTime,updatedData) {
    try {
      const response = await axios.put(`http://localhost:8000/api/control_tiempo/${id}/${idTime}/`, updatedData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error; 
    }
  }