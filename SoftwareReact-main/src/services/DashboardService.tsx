import axios from "axios";
import { API_URL, getAuthHeaders } from "./config";

export const DashboardService = {
  /**
   * Obtiene los anexos directamente de la ruta verificada
   * URL: http://localhost:3000/api/anexos
   */
  fetchDashboardData: async () => {
    try {
      // Realizamos la petición GET con los headers de autenticación
      const response = await axios.get(`${API_URL}/anexos`, getAuthHeaders());
      const anexos = response.data; // El array de objetos visto en el navegador

      const hoyISO = new Date().toISOString().split('T')[0];

      return {
        total: anexos.length,
        // Filtramos por el campo real 'fechaGeneracion' que devuelve tu API
        hoy: anexos.filter((a: any) => a.fechaGeneracion && a.fechaGeneracion.startsWith(hoyISO)).length,
        pendientes: 0,
        usuarios: 1,
        ultimosAnexos: anexos.slice(0, 5) // Tomamos los 5 más recientes para la tabla
      };
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      throw error;
    }
  }
};