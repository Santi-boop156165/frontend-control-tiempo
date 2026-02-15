import axios from "axios";
import toast from "react-hot-toast";

export async function ApiGet(pageNumber = 1, search = "") {
  try {
    const url = `http://localhost:8000/api/clientes?page=${pageNumber}&search=${search}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener clientes:", error.message);
    return { clientes: [], total_pages: 0 };
  }
}
export async function ApiGetById(id) {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/clientes/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener cliente por ID:", error.message);
    return { cliente: {} };
  }
}

export async function ApiGetUsers() {
  try {
    const response = await axios.get("http://localhost:8000/api/usuarios");
    return response.data;
  } catch (err) {
    console.error("Error al obtener usuarios:", err.message);
    return { clientes: [] };
  }
}

export async function ApiGetTime(id) {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/control_tiempo/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener control de tiempo:", error.message);
    return { control_tiempo: [] };
  }
}

export async function ApiGetData() {
  try {
    const response = await axios.get("http://localhost:8000/api/data_full");
    return response.data;
  } catch (err) {
    console.error("Error al obtener datos completos:", err.message);
    return { data: [] };
  }
}

export async function ApiDownloadReport(periodo = "diario") {
  try {
    toast.loading("Generando reporte...");
    const response = await axios.get(
      `http://localhost:8000/api/reportes/?periodo=${periodo}`,
      {
        responseType: "blob",
      },
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `reporte_${periodo}_${new Date().toISOString().split("T")[0]}.xlsx`,
    );
    document.body.appendChild(link);
    link.click();

    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast.dismiss();
    toast.success(`Reporte ${periodo} descargado exitosamente`);
  } catch (error) {
    toast.dismiss();
    console.error("Error al descargar reporte:", error);
    toast.error("Error al generar el reporte");
  }
}
