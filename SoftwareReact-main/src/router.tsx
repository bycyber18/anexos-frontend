import { createBrowserRouter, Navigate } from "react-router-dom";

// 1. Layout Principal (Tu Sidebar + Header)
import LayoutAdmin from "./layouts/LayoutAdmin";

// 2. Las Vistas Hijas
import Dashboard from "./components/Dashboard";
import CrearAnexo from "./components/CrearAnexo";
import GestionarAnexos from "./components/GestionarAnexos";
import Configuracion from "./components/Configuracion";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutAdmin />, // <--- Aquí cargamos tu Sidebar directamente en la raíz
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />, // Redirige automático al entrar a "/"
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