import axios from "axios";
// IMPORTANTE: Agrega estas importaciones para quitar el rojo
import { API_URL, getAuthHeaders, FormDataAnexoManual } from "./config"; 

export const completarCamposConIA = async (datosParciales: Partial<FormDataAnexoManual>) => {
  try {
    // Enviamos lo que el usuario escribió para que la IA deduzca el resto
    const response = await axios.post(`${API_URL}/inteligente`, datosParciales, getAuthHeaders());
    
    // Retorna el objeto completo (Nombre + Objetivos + Contenidos generados)
    return response.data; 
  } catch (error: any) {
    const mensaje = error.response?.data?.error || "La IA no pudo completar los campos";
    throw new Error(mensaje);
  }
};