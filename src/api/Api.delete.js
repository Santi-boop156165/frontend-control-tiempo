import axios from "axios";

export async function ApiDeleteById(id){
    try {
      const response = await axios.delete(`http://localhost:8000/api/clientes/${id}`);
      return response.data;
    }catch (error){
      console.log(error);
    }
  
  }


 export async function ApiDeleteByUserId(id){
    try {
      const response = await axios.delete(`http://localhost:8000/api/usuarios/${id}`);
      return response.data;
    }catch (error){
      console.log(error);
    }
  
  } 