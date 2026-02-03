import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Importamos el hook

// Definimos la estructura de un Anexo para TypeScript
interface Anexo {
  id: number;
  tipo: string;
  fecha: string;
  trabajador: string;
  estado: "Borrador" | "Finalizado";
}

const GestionarAnexos = () => {
  const navigate = useNavigate(); // 2. Inicializamos la función de navegación

  // Datos de ejemplo
  const [anexos] = useState<Anexo[]>([
    { id: 1, tipo: "Anexo A", fecha: "2023-10-25", trabajador: "Juan Pérez", estado: "Finalizado" },
    { id: 2, tipo: "Anexo B", fecha: "2023-10-26", trabajador: "María García", estado: "Borrador" },
    { id: 3, tipo: "Anexo A", fecha: "2023-10-27", trabajador: "Ricardo Soto", estado: "Finalizado" },
  ]);

  return (
    <div className="container-fluid fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 fw-bold text-dark mb-1">Gestión de Anexos</h2>
          <p className="text-muted">Administra y filtra los documentos generados.</p>
        </div>
        
        {/* 3. Agregamos el onClick para navegar */}
        <button 
          className="btn btn-primary rounded-pill px-4"
          onClick={() => navigate("/crear-anexo")}
        >
          <span className="me-2">➕</span> Nuevo Anexo
        </button>
      </div>

      {/* Sección de Filtros */}
      <div className="card border-0 shadow-sm mb-4 rounded-4">
        <div className="card-body p-4">
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label small fw-bold">Tipo de Anexo</label>
              <select className="form-select rounded-3">
                <option value="">Todos</option>
                <option value="A">Anexo A</option>
                <option value="B">Anexo B</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">Fecha</label>
              <input type="date" className="form-select rounded-3" />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">Trabajador</label>
              <input type="text" className="form-control rounded-3" placeholder="Buscar trabajador..." />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">Estado</label>
              <select className="form-select rounded-3">
                <option value="">Cualquiera</option>
                <option value="borrador">Borrador</option>
                <option value="finalizado">Finalizado</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de Resultados */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="px-4 py-3 border-0">Tipo</th>
                <th className="py-3 border-0">Fecha</th>
                <th className="py-3 border-0">Trabajador</th>
                <th className="py-3 border-0">Estado</th>
                <th className="py-3 border-0 text-end px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {anexos.map((anexo) => (
                <tr key={anexo.id}>
                  <td className="px-4 fw-semibold">{anexo.tipo}</td>
                  <td>{anexo.fecha}</td>
                  <td>{anexo.trabajador}</td>
                  <td>
                    <span className={`badge rounded-pill ${
                      anexo.estado === "Finalizado" ? "bg-success-subtle text-success" : "bg-warning-subtle text-warning"
                    }`}>
                      {anexo.estado}
                    </span>
                  </td>
                  <td className="text-end px-4">
                    <div className="btn-group gap-1">
                      <button className="btn btn-sm btn-outline-secondary rounded-2" title="Ver">👁️</button>
                      <button className="btn btn-sm btn-outline-primary rounded-2" title="Editar">✏️</button>
                      <button className="btn btn-sm btn-outline-info rounded-2 text-white" title="Descargar">💾</button>
                      <button className="btn btn-sm btn-outline-danger rounded-2" title="Eliminar">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GestionarAnexos;