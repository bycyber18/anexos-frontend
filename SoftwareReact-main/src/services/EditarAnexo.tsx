import axios from "axios";
import { API_URL, getAuthHeaders, type FormDataAnexoManual } from "./config";

// Para obtener la lista de anexos
export const obtenerAnexos = async () => {
  try {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
  } catch (error: any) {
    throw new Error("No se pudo sincronizar la lista de anexos.");
  }
};

// Para actualizar un anexo existente
export const actualizarAnexo = async (id: string | number, formData: Partial<FormDataAnexoManual>) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, formData, getAuthHeaders());
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Error al actualizar el anexo");
  }
};