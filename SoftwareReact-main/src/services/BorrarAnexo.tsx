import axios from "axios";
import { API_URL, getAuthHeaders } from "./config";

export const eliminarAnexo = async (id: string | number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "No se pudo eliminar el registro");
  }
};