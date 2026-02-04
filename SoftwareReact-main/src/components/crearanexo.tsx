export default function CrearAnexo() {
  return (
    <div className="container-fluid fade-in">
      {/* Cabecera de la Vista */}
      <div className="mb-4">
        <h2 className="h3 fw-bold text-dark mb-1">Crear Nuevo Anexo de Capacitación</h2>
        <p className="text-muted">Completa la información del curso para generar el documento oficial.</p>
      </div>

      <div className="row g-4">
        {/* Formulario Principal */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <form>
                {/* Sección 1: Datos del Trabajador */}
                <div className="mb-4">
                  <h5 className="fw-bold mb-3 pb-2 border-bottom text-primary">1. Datos del Trabajador</h5>
                  <div className="row g-3">
                    <div className="col-md-12">
                      <label className="form-label small fw-bold">Buscar Trabajador</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">🔍</span>
                        <input type="text" className="form-control border-start-0 rounded-end-3" placeholder="Nombre o RUT..." />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Cargo Actual</label>
                      <input type="text" className="form-control rounded-3 bg-light" readOnly placeholder="Se autocompleta..." />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Departamento</label>
                      <input type="text" className="form-control rounded-3 bg-light" readOnly placeholder="Se autocompleta..." />
                    </div>
                  </div>
                </div>

                {/* Sección 2: Información del Curso */}
                <div className="mb-4">
                  <h5 className="fw-bold mb-3 pb-2 border-bottom text-primary">2. Información del Curso</h5>
                  <div className="row g-3">
                    <div className="col-md-12">
                      <label className="form-label small fw-bold">Nombre del Curso</label>
                      <input type="text" className="form-control rounded-3" placeholder="Ej: Excel Avanzado para Finanzas" />
                    </div>
                    
                    <div className="col-md-4">
                      <label className="form-label small fw-bold">Tipo de Curso</label>
                      <select className="form-select rounded-3">
                        <option value="">Seleccione...</option>
                        <option value="presencial">Presencial</option>
                        <option value="e-learning">E-learning</option>
                        <option value="mixto">Mixto (B-learning)</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-bold">Horas Cronológicas</label>
                      <input type="number" className="form-control rounded-3" placeholder="Ej: 20" />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-bold">Fecha del Curso</label>
                      <input type="date" className="form-control rounded-3" />
                    </div>
                  </div>
                </div>

                {/* --- NUEVA SECCIÓN: SUBIDA DE ARCHIVOS --- */}
                <div className="mb-4">
                  <h5 className="fw-bold mb-3 pb-2 border-bottom text-primary">3. Documentación de Respaldo</h5>
                  
                  {/* Zona de carga visual */}
                  <div className="p-4 rounded-3 text-center bg-light border" style={{borderStyle: 'dashed !important', borderColor: '#ced4da'}}>
                    <div className="mb-2">
                        {/* Ícono simulado con emoji o clase bi-cloud-upload si tienes iconos */}
                        <span className="fs-1 text-muted">☁️</span> 
                    </div>
                    <h6 className="fw-bold mb-1">Adjuntar archivos del curso</h6>
                    <p className="text-muted small mb-3">Sube el temario, lista de asistencia o cotización (PDF, JPG, PNG)</p>
                    
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <input type="file" className="form-control" multiple />
                        </div>
                    </div>
                    <div className="mt-2 text-muted small fst-italic">Máximo 10MB por archivo</div>
                  </div>
                </div>
                {/* ----------------------------------------- */}

                {/* Botones de Acción */}
                <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                  <button type="button" className="btn btn-light rounded-pill px-4">Cancelar</button>
                  <button type="button" className="btn btn-outline-primary rounded-pill px-4">Guardar Borrador</button>
                  <button type="submit" className="btn btn-primary rounded-pill px-4 shadow-sm">Generar Anexo</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Barra Lateral de Ayuda/Resumen */}
        <div className="col-lg-4">
          <div className="card border-0 bg-dark text-white shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">Resumen del Proceso</h5>
              <ul className="small list-unstyled mb-0">
                <li className="mb-3 d-flex align-items-center">
                  <span className="bg-primary rounded-circle me-2 d-inline-flex justify-content-center align-items-center" style={{width: '20px', height: '20px', fontSize: '10px'}}>1</span>
                  Identifica al trabajador.
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <span className="bg-primary rounded-circle me-2 d-inline-flex justify-content-center align-items-center" style={{width: '20px', height: '20px', fontSize: '10px'}}>2</span>
                  Ingresa los detalles técnicos del curso.
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <span className="bg-primary rounded-circle me-2 d-inline-flex justify-content-center align-items-center" style={{width: '20px', height: '20px', fontSize: '10px'}}>3</span>
                  <strong className="text-primary ms-1 me-1"></strong> Adjunta la evidencia.
                </li>
                <li className="d-flex align-items-center">
                  <span className="bg-primary rounded-circle me-2 d-inline-flex justify-content-center align-items-center" style={{width: '20px', height: '20px', fontSize: '10px'}}>4</span>
                  Genera el PDF para firma.
                </li>
              </ul>
            </div>
          </div>
          
          <div className="card border-0 shadow-sm rounded-4 border-start border-4 border-primary">
            <div className="card-body p-4">
              <h6 className="fw-bold text-dark mb-3">Importante</h6>
              <p className="text-muted small mb-0">
                Asegúrate de que las <strong>horas cronológicas</strong> coincidan con lo estipulado en el plan de capacitación anual.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}