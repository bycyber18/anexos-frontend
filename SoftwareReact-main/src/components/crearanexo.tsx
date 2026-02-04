import { useState } from 'react';
import { saveAs } from 'file-saver';
import { AnexoService } from '../services/CrearAnexo';// Importamos el servicio

export default function CrearAnexo() {
  const [plantillaId, setPlantillaId] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  
  // ESTADO PARA EL PDF 
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  // --- CONFIGURACIÓN DE PLANTILLAS ---
  const plantillas = [
    { 
      id: 'plantilla_anexo2.docx', 
      nombre: 'Anexo N° 2 - Plan Formativo SENCE',
      previewImg: '/img/vista_previa_anexo2.png', 
      campos: [
        { key: 'nombre_ejecutor', label: 'Nombre Organismo Ejecutor', type: 'text' },
        { key: 'rut_ejecutor', label: 'RUT Ejecutor', type: 'text' },
        { key: 'telefono_ejecutor', label: 'Teléfono', type: 'tel' },
        { key: 'direccion_ejecutor', label: 'Dirección', type: 'text' },
        { key: 'comuna_ejecutor', label: 'Comuna', type: 'text' },
        { key: 'region_ejecutor', label: 'Región', type: 'text' },
        { key: 'entidad_requirente', label: 'Entidad Requirente', type: 'text' },
        { key: 'código_curso', label: 'Código del Curso', type: 'text' },
        { key: 'horas', label: 'Horas Totales', type: 'number' },
        { key: 'objetivo_general', label: 'Objetivo General', type: 'textarea' },
        { key: 'contenidos', label: 'Contenidos', type: 'textarea' },
      ]
    }
  ];

  const plantillaSeleccionada = plantillas.find(p => p.id === plantillaId);

  
  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    } else {
      setPdfFile(null);
    }
  };

  
  const handleProcesar = async () => {
    if (!plantillaId) return alert("Por favor selecciona una plantilla.");
    setLoading(true);

    try {
      let blobWord;

      
      if (pdfFile) {
        // Si no hay pdf
        console.log("Iniciando generación con IA...");
        blobWord = await AnexoService.generarInteligente(pdfFile, formData, plantillaId);
        alert("✨ ¡Documento generado con Inteligencia Artificial!");
      } else {
        // Si es que se carga algun pdf
        console.log("Iniciando generación manual...");
        blobWord = await AnexoService.generarManual(formData, plantillaId);
        alert("✅ Documento generado manualmente.");
      }

     
      saveAs(blobWord, `Anexo_${pdfFile ? 'IA' : 'Manual'}_${Date.now()}.docx`);

    } catch (error: any) {
      console.error(error);
      const msg = error.response?.data?.error || error.message || "Error desconocido";
      alert(`❌ Error al generar: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid fade-in h-100">
      
      {/* Cabecera */}
      <div className="mb-4">
        <h2 className="h3 fw-bold text-dark mb-1">Generador de Anexos</h2>
        <p className="text-muted">Sube una Base Técnica (PDF) para usar IA, o rellena manualmente.</p>
      </div>

      <div className="row g-4 h-100">
        
        {/* --- COLUMNA IZQUIERDA: FORMULARIO --- */}
        <div className="col-lg-6 d-flex flex-column">
          <div className="card border-0 shadow-sm rounded-4 flex-grow-1" style={{minHeight: '600px'}}>
            <div className="card-body p-4 overflow-auto custom-scrollbar" style={{ maxHeight: '80vh' }}>
              
              {/* 1. Selector de Plantilla */}
              <div className="mb-4 bg-light p-3 rounded-3 border">
                <label className="form-label fw-bold small text-uppercase text-primary mb-2">1. Selecciona Plantilla</label>
                <select 
                  className="form-select form-select-lg border-0 shadow-sm"
                  value={plantillaId}
                  onChange={(e) => {
                    setPlantillaId(e.target.value);
                    setFormData({}); // Limpiar form al cambiar
                    setPdfFile(null); // Limpiar PDF
                  }}
                >
                  <option value="">-- Selecciona el documento --</option>
                  {plantillas.map((p) => (
                    <option key={p.id} value={p.id}>{p.nombre}</option>
                  ))}
                </select>
              </div>

              {plantillaSeleccionada ? (
                <div className="fade-in">
                  
                
                  <div className={`mb-4 p-3 rounded-3 border ${pdfFile ? 'border-success bg-success-subtle' : 'border-primary border-opacity-25 bg-white'}`}>
                    <label className="form-label fw-bold text-dark d-flex align-items-center justify-content-between">
                      <span>
                        <i className="bi bi-robot me-2"></i>
                        Carga Inteligente (Opcional)
                      </span>
                      {pdfFile && <span className="badge bg-success">PDF Cargado</span>}
                    </label>
                    <input 
                      type="file" 
                      accept="application/pdf"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                    <div className="form-text small mt-2">
                      {pdfFile 
                        ? "✅ La IA leerá este PDF para completar los campos técnicos automáticamente."
                        : "ℹ️ Sube las Bases Técnicas (PDF) para que la IA complete el anexo por ti."}
                    </div>
                  </div>

                  
                  <h6 className="fw-bold border-bottom pb-2 mb-3 text-dark">
                    3. Datos Administrativos
                  </h6>
                  
                  <div className="row g-3">
                    {plantillaSeleccionada.campos.map((campo) => (
                      <div key={campo.key} className={campo.type === 'textarea' ? 'col-12' : 'col-md-6'}>
                        <label className="form-label small fw-bold text-muted mb-1">{campo.label}</label>
                        
                        {campo.type === 'textarea' ? (
                          <textarea 
                            className="form-control bg-light border-0 rounded-3"
                            rows={3}
                            placeholder={pdfFile ? "La IA intentará llenar esto si lo dejas vacío..." : "Escribe aquí..."}
                            onChange={(e) => handleInputChange(campo.key, e.target.value)}
                            value={formData[campo.key] || ''}
                          />
                        ) : (
                          <input 
                            type={campo.type} 
                            className="form-control bg-light border-0 rounded-3 p-2"
                            placeholder="..."
                            onChange={(e) => handleInputChange(campo.key, e.target.value)}
                            value={formData[campo.key] || ''}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                 
                  <div className="d-grid mt-5 sticky-bottom bg-white pt-3 border-top">
                    <button 
                      onClick={handleProcesar}
                      className={`btn rounded-pill py-3 fw-bold shadow hover-scale ${pdfFile ? 'btn-success' : 'btn-primary'}`}
                      disabled={loading}
                    >
                      {loading ? (
                        <span><span className="spinner-border spinner-border-sm me-2"></span>Procesando en Servidor...</span>
                      ) : (
                        <span>
                          {pdfFile ? (
                            <><i className="bi bi-stars me-2"></i>Generar con IA (Usando PDF)</>
                          ) : (
                            <><i className="bi bi-file-text me-2"></i>Generar Manualmente</>
                          )}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-5 text-muted h-100 d-flex flex-column justify-content-center">
                  <i className="bi bi-arrow-up-circle fs-1 mb-3 opacity-50"></i>
                  <p>Selecciona una plantilla para comenzar.</p>
                </div>
              )}
            </div>
          </div>
        </div>

       
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-secondary bg-opacity-10 position-relative overflow-hidden">
            <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
              <h6 className="fw-bold m-0 text-primary">👁️ Vista Preliminar</h6>
              <span className="badge bg-light text-dark border">Imagen de Referencia</span>
            </div>
            
            <div className="card-body p-0 d-flex align-items-start justify-content-center overflow-auto custom-scrollbar" style={{ height: '75vh' }}>
              {plantillaSeleccionada ? (
                <div className="p-4 text-center">
                  <img 
                    src={plantillaSeleccionada.previewImg} 
                    alt="Vista Previa Documento" 
                    className="shadow-lg border bg-white"
                    style={{ maxWidth: '100%', width: 'auto', borderRadius: '4px' }}
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500x700?text=Imagen+No+Encontrada'; }}
                  />
                </div>
              ) : (
                <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted p-5 w-100">
                  <div style={{ fontSize: '4rem', opacity: 0.2 }}>📄</div>
                  <h5 className="fw-bold opacity-50 mt-3">Sin Vista Previa</h5>
                  <p className="small opacity-50">Selecciona una plantilla para ver su formato.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8f9fa; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #dee2e6; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #adb5bd; }
        .bg-success-subtle { background-color: #d1e7dd; }
      `}</style>
    </div>
  );
}