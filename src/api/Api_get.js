import axios from "axios";

export async function ApiGet(pageNumber = 1) {
  try {
    const response = await axios.get(`http://localhost:8000/api/clientes?page=${pageNumber}`);
    return response.data;
  } catch (error) {
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

export async function ApiGetTime(id){
  try{
    const response = await axios.get(`http://127.0.0.1:8000/api/control_tiempo/${id}`);
    return response.data;
  }catch (error){
    console.log(error);
  }


}


export async function ApiGetData(){
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/data_full');
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

