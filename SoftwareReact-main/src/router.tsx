import { createBrowserRouter, Navigate } from "react-router-dom";

// Cambia layouts (con L mayúscula) por layouts (con l minúscula)
import LayoutAdmin from "./layouts/LayoutAdmin";

// 2. Las Vistas Hijas (Verifica que las mayúsculas coincidan con tus archivos)
// Si el archivo en la carpeta es "crearanexo.tsx", el import debe ser "./components/crearanexo"
import Dashboard from "./components/Dashboard";
import CrearAnexo from "./components/crearanexo";
import GestionarAnexos from "./components/gestionaranexo";
import Configuracion from "./components/configuracion";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutAdmin />, 
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />, 
      },
      {
        path: "dashboard", 
        element: <Dashboard />,
      },
      {
        path: "crear-anexo", 
        element: <CrearAnexo />,
      },
      {
        path: "gestionar-anexos", 
        element: <GestionarAnexos />,
      },
      {
        path: "configuracion", 
        element: <Configuracion />,
      },
    ],
  },
]);