import axios from "axios";

// ⬇️ FÍJATE AQUÍ: Agregué 'type' antes del nombre
import { API_URL, getAuthHeaders, type FormDataAnexoManual } from "./config"; 

export const completarCamposConIA = async (datosParciales: Partial<FormDataAnexoManual>) => {
  try {
    const response = await axios.post(`${API_URL}/inteligente`, datosParciales, getAuthHeaders());
    return response.data; 
  } catch (error: any) {
    const mensaje = error.response?.data?.error || "La IA no pudo completar los campos";
    throw new Error(mensaje);
  }
};