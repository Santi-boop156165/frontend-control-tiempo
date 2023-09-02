import axios from 'axios'


export const SendData = async (data) => {
  try {
    const response = await axios.post('http://localhost:8000/api/clientes', data);
    return response.data;
  }catch (error){
    console.log(error);
    throw error;
  }


}

export const sendUserData = async (data) => {
  try {
    const response = await axios.post('http://localhost:8000/api/usuarios', data);
    return response.data;
  }catch (error){
    console.log(error);
    throw error;
  }
}


