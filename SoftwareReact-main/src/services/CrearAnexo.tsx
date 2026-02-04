import axios from 'axios';


const API_URL = 'http://localhost:3000/api'; 

export const AnexoService = {


  generarInteligente: async (pdfFile: File, datosManuales: any, nombrePlantilla: string) => {
    const formData = new FormData();
    
   
    formData.append("pdfTecnico", pdfFile);

    
    formData.append("nombrePlantilla", nombrePlantilla);

  
    formData.append("nombre_organismo", datosManuales.nombre_ejecutor || "");
    formData.append("rut_organismo", datosManuales.rut_ejecutor || "");
    formData.append("telefono_organismo", datosManuales.telefono_ejecutor || "");
    formData.append("direccion_organismo", datosManuales.direccion_ejecutor || "");
    formData.append("comuna_organismo", datosManuales.comuna_ejecutor || "");
    formData.append("region_organismo", datosManuales.region_ejecutor || "");
    
   
    formData.append("entidad_requirente", datosManuales.entidad_requirente || "");
    formData.append("codigo_curso", datosManuales.código_curso || "");

   
    const response = await axios.post(`${API_URL}/anexos/inteligente`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      responseType: 'blob', 
    });

    return response.data; 
  },

 
  generarManual: async (datos: any, nombrePlantilla: string) => {
    const response = await axios.post(`${API_URL}/anexos/generar`, {
      nombrePlantilla,
      datos 
    }, {
      responseType: 'blob'
    });
    return response.data;
  }
};