import { createBrowserRouter, Navigate } from "react-router-dom";
import LayoutAdmin from "./layouts/LayoutAdmin";
import Dashboard from "./components/Dashboard";
import CrearAnexo from "./components/crearanexo";
import GestionarAnexos from "./components/gestionaranexo";
import Configuracion from "./components/configuracion";
import EditarAnexo from "./components/EditarAnexo"; 

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
        path: "admin/editar-anexo/:id", 
        element: <EditarAnexo />,
      },
      {
        path: "configuracion", 
        element: <Configuracion />,
      },
    ],
  },
]);