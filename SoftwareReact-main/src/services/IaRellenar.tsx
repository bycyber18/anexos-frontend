import axios from "axios";
// Usamos "import type" para la interfaz y mantenemos el import normal para el resto
import { API_URL, getAuthHeaders } from "./config";
import type { FormDataAnexoManual } from "./config"; 

export const completarCamposConIA = async (datosParciales: Partial<FormDataAnexoManual>) => {
  try {
    // IMPORTANTE: Asegúrate de usar la ruta completa a /inteligente
    const response = await axios.post(`${API_URL}/inteligente`, datosParciales, getAuthHeaders());
    
    return response.data;
  } catch (error: any) {
    const mensaje = error.response?.data?.error || "La IA no pudo completar los campos";
    throw new Error(mensaje);
  }
};