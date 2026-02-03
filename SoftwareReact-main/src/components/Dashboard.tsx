import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  
  const stats = [
    { title: "Total Anexos", value: "125", icon: "bi-folder-fill", color: "primary" },
    { title: "Creados Hoy", value: "3", icon: "bi-plus-circle-fill", color: "success" },
    { title: "Pendientes", value: "12", icon: "bi-exclamation-triangle-fill", color: "warning" },
    { title: "Usuarios", value: "8", icon: "bi-people-fill", color: "info" },
  ];

  return (
    <div className="container-fluid p-0">
    
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 fw-bold text-dark">Panel de Control</h2>
          <p className="text-muted m-0">Bienvenido de nuevo, aquí tienes el resumen de hoy.</p>
        </div>
        <button 
          className="btn btn-primary rounded-pill px-4 shadow-sm"
          onClick={() => navigate("/admin/crear-anexo")}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Nuevo Anexo
        </button>
      </div>

     
      <div className="row g-4 mb-5">
        {stats.map((stat, index) => (
          <div className="col-12 col-sm-6 col-xl-3" key={index}>
            <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
              <div className="card-body p-4 d-flex align-items-center">
                <div className={`rounded-circle p-3 bg-${stat.color}-subtle text-${stat.color} me-3`}>
                  <i className={`bi ${stat.icon} fs-3`}></i>
                </div>
                <div>
                  <h6 className="card-subtitle text-muted text-uppercase small fw-bold mb-1">{stat.title}</h6>
                  <h2 className="card-title mb-0 fw-bold">{stat.value}</h2>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

     
      <div className="row g-4">
       
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Accesos Rápidos</h5>
              <div className="d-grid gap-3">
                <button 
                  onClick={() => navigate("/admin/gestionar-anexos")}
                  className="btn btn-light text-start p-3 rounded-3 border-0 d-flex align-items-center hover-shadow"
                >
                  <div className="bg-primary text-white rounded p-2 me-3"><i className="bi bi-list-ul"></i></div>
                  <div>
                    <div className="fw-bold">Ver Listado Completo</div>
                    <div className="small text-muted">Gestionar todos los anexos</div>
                  </div>
                </button>
                
                <button 
                  onClick={() => navigate("/admin/configuracion")}
                  className="btn btn-light text-start p-3 rounded-3 border-0 d-flex align-items-center hover-shadow"
                >
                  <div className="bg-secondary text-white rounded p-2 me-3"><i className="bi bi-gear-fill"></i></div>
                  <div>
                    <div className="fw-bold">Configuración</div>
                    <div className="small text-muted">Ajustes de la plataforma</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-header bg-white border-0 py-3 px-4 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold m-0">Últimos Anexos Agregados</h5>
              <button 
                className="btn btn-sm btn-outline-primary rounded-pill"
                onClick={() => navigate("/admin/gestionar-anexos")}
              >
                Ver todos
              </button>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4 text-secondary small text-uppercase">Nombre</th>
                    <th className="text-secondary small text-uppercase">Fecha</th>
                    <th className="text-secondary small text-uppercase">Estado</th>
                    <th className="text-end pe-4 text-secondary small text-uppercase">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3].map((item) => (
                    <tr key={item}>
                      <td className="ps-4 fw-bold text-dark">Anexo Ejemplo #{item}</td>
                      <td className="text-muted small">03 Feb 2026</td>
                      <td><span className="badge bg-success-subtle text-success rounded-pill px-3">Activo</span></td>
                      <td className="text-end pe-4">
                        <button className="btn btn-sm btn-light text-primary"><i className="bi bi-eye-fill"></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      
      <style>{`
        .bg-primary-subtle { background-color: rgba(13, 110, 253, 0.1); }
        .bg-success-subtle { background-color: rgba(25, 135, 84, 0.1); }
        .bg-warning-subtle { background-color: rgba(255, 193, 7, 0.1); }
        .bg-info-subtle { background-color: rgba(13, 202, 240, 0.1); }
        .hover-shadow:hover { background-color: #f8f9fa; box-shadow: 0 .125rem .25rem rgba(0,0,0,.075); transition: 0.3s; }
      `}</style>
    </div>
  );
}