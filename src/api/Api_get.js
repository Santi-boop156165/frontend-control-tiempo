import axios from "axios";

export async function ApiGet(){
    try {
      const response = await axios.get('http://localhost:8000/api/clientes');
      return response.data;
    }catch (error){
      console.log(error);
    }
}


export async function ApiGetById(id){
  try {
    const response = await axios.get(`http://localhost:8000/api/clientes/${id}`);
    return response.data;
  }catch (error){
    console.log(error);
  }

}

export async function ApiGetUsers(){
  try {
    const response = await axios.get('http://localhost:8000/api/usuarios');
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
