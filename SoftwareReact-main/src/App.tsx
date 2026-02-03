import { useState } from "react";

const menuItems = [
  { name: "Dashboard", icon: "bi bi-grid-1x2-fill", emoji: "🏠" },
  { name: "Crear Anexo", icon: "bi bi-people-fill", emoji: "👥" },
  { name: "Gestionar Anexos", icon: "bi bi-bar-chart-line-fill", emoji: "📊" },
  { name: "Configuración", icon: "bi bi-gear-fill", emoji: "⚙️" },
];

export default function App() {
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="d-flex vh-100 bg-light font-sans">
      {/* Sidebar */}
      <aside className="bg-dark text-white shadow-lg" style={{ width: "280px" }}>
        <div className="p-4 d-flex align-items-center border-bottom border-secondary">
          <div className="bg-primary rounded-circle me-3" style={{ width: "40px", height: "40px", display: 'grid', placeItems: 'center' }}>
            <span className="fw-bold">M</span>
          </div>
          <span className="fs-5 fw-bold tracking-tight">AdminPanel</span>
        </div>
        
        <nav className="nav flex-column mt-3 px-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`nav-link border-0 mb-1 rounded-3 text-start transition-all ${
                active === item.name 
                  ? "bg-primary text-white shadow-sm" 
                  : "text-white-50 hover-bg-secondary"
              }`}
              style={{ transition: '0.3s' }}
            >
              <span className="me-3">{item.emoji}</span>
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-fill d-flex flex-column overflow-hidden">
        {/* Header */}
        <header className="navbar navbar-light bg-white px-4 py-3 shadow-sm border-bottom">
          <div className="container-fluid">
            <h1 className="h4 m-0 fw-bold text-dark">{active}</h1>
            <div className="d-flex align-items-center">
              <div className="me-3 text-end d-none d-md-block">
                <p className="m-0 small fw-bold">Juan Pérez</p>
                <p className="m-0 small text-muted">Administrador</p>
              </div>
              <button className="btn btn-outline-primary rounded-pill px-4 btn-sm fw-bold">
                Perfil
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 overflow-auto bg-light">
          <div className="container-fluid">
            {active === "Dashboard" && (
              <section className="fade-in">
                <div className="mb-4">
                  <h2 className="h5 fw-bold text-dark">Resumen General</h2>
                  <p className="text-muted">Estado actual de tu plataforma hoy.</p>
                </div>
                
                {/* Tarjetas con Bootstrap Grid */}
                <div className="row g-4">
                  <div className="col-md-4">
                    <Card title="Usuarios Activos" value="1,234" color="primary" trend="+12%" />
                  </div>
                  <div className="col-md-4">
                    <Card title="Ventas Hoy" value="$5,678" color="success" trend="+5.4%" />
                  </div>
                  <div className="col-md-4">
                    <Card title="Tickets" value="23" color="warning" trend="-2" />
                  </div>
                </div>

                {/* Sección Extra Visual */}
                <div className="mt-5 p-5 bg-white rounded-4 shadow-sm border-0 text-center">
                   <div className="text-muted small text-uppercase fw-bold mb-2">Próximamente</div>
                   <h3 className="h4 text-dark">Gráficos Avanzados</h3>
                   <p className="text-muted mx-auto" style={{maxWidth: '400px'}}>
                     Estamos procesando tus datos para mostrarte las métricas de rendimiento en tiempo real.
                   </p>
                </div>
              </section>
            )}

            {/* Marcadores de posición para otras secciones */}
            {active !== "Dashboard" && (
              <div className="text-center py-5">
                <h2 className="text-muted">{active} en construcción...</h2>
              </div>
            )}
          </div>
        </main>
      </div>
      
      {/* Estilos embebidos para efectos extra */}
      <style>{`
        .hover-bg-secondary:hover { background-color: rgba(255,255,255,0.1); color: white !important; }
        .fade-in { animation: fadeIn 0.5s ease-in; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

//DEFINIR LA INTERFAZ DE ARRIBA
interface CardProps {
  title: string;
  value: string;
  color: string;
  trend: string;
}

//SE LO ASIGNAMOS A LA FUNCION DE ABAJO
function Card({ title, value, color, trend }: CardProps) {
  return (
    <div className="card border-0 shadow-sm rounded-4 h-100 transition-hover">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h6 className="card-subtitle text-muted fw-bold text-uppercase small">{title}</h6>
          <span className={`badge bg-${color}-subtle text-${color} rounded-pill`}>
            {trend}
          </span>
        </div>
        <h3 className="card-title mb-0 display-6 fw-bold">{value}</h3>
      </div>
    </div>
  );
}