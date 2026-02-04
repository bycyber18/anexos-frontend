import axios from "axios";
import { API_URL, getAuthHeaders } from "./config";

// Interfaz para el Formulario (Frontend)
export interface FormDataAnexoManual {
  nombre_ejecutor: string;
  rut_ejecutor: string;
  telefono_ejecutor: string;
  direccion_ejecutor: string;
  comuna_ejecutor: string;
  region_ejecutor: string;
  entidad_requirente: string;
  codigo_curso: string;
  horas_totales: string | number;
  objetivo_general: string;
  contenidos: string;
}

// Interfaz para el Backend (MongoDB)
export interface AnexoManualDTO {
  nombreEjecutor: string;
  rutEjecutor: string;
  telefono: string;
  direccion: string;
  comuna: string;
  region: string;
  entidadRequirente: string;
  codigoCurso: string;
  horasTotales: number;
  objetivoGeneral: string;
  contenidos: string;
}

export const registrarAnexoManual = async (formData: FormDataAnexoManual) => {
  try {
    // Mapeo y validación de tipos
    const datosMapeados: AnexoManualDTO = {
      nombreEjecutor: formData.nombre_ejecutor,
      rutEjecutor: formData.rut_ejecutor,
      telefono: formData.telefono_ejecutor,
      direccion: formData.direccion_ejecutor,
      comuna: formData.comuna_ejecutor,
      region: formData.region_ejecutor,
      entidadRequirente: formData.entidad_requirente,
      codigoCurso: formData.codigo_curso,
      horasTotales: Number(formData.horas_totales) || 0,
      objetivoGeneral: formData.objetivo_general,
      contenidos: formData.contenidos,
    };

    const response = await axios.post(`${API_URL}/generar`, datosMapeados, getAuthHeaders());

    return response.data;
  } catch (error: any) {
    const mensaje = error.response?.data?.error || "Error al registrar el anexo manual";
    throw new Error(mensaje);
  }
};

