import { useState } from 'react';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

export default function CrearAnexo() {
  const [plantillaId, setPlantillaId] = useState("");
  const [loading, setLoading] = useState(false);
  // Estado para guardar los datos que escribe el usuario
  const [formData, setFormData] = useState<Record<string, string>>({});

  // --- CONFIGURACIÓN DE PLANTILLAS ---
  // Aquí defines el nombre del archivo Word, la imagen de vista previa y los campos a llenar
  const plantillas = [
    { 
      id: 'plantilla_anexo2.docx', 
      nombre: 'Anexo N° 2 - Plan Formativo SENCE',
      // IMPORTANTE: Debes poner una captura de pantalla de tu Word en esta ruta: public/img/
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
        { key: 'objetivo_general', label: 'Objetivo General (Metodología)', type: 'textarea' },
        { key: 'contenidos', label: 'Contenidos (Competencias)', type: 'textarea' },
      ]
    }
  ];

  const plantillaSeleccionada = plantillas.find(p => p.id === plantillaId);

  // Maneja el cambio de texto en los inputs
  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  // Lógica para descargar el Word
  const handleGenerarDocumento = async () => {
    if (!plantillaId) return alert("Selecciona una plantilla");
    setLoading(true);

    try {
      // 1. Busca el archivo en la carpeta public/templates
      const response = await fetch(`/templates/${plantillaId}`);
      if (!response.ok) throw new Error("No se encontró el archivo .docx en la carpeta public/templates");
      
      const content = await response.arrayBuffer();
      const zip = new PizZip(content);
      
      // 2. Procesa el documento
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      // 3. Reemplaza las {variables} con lo que escribió el usuario
      doc.render(formData);

      // 4. Genera el blob
      const out = doc.getZip().generate({
        type: "blob",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      // 5. Descarga
      saveAs(out, `Anexo_${new Date().getTime()}.docx`);

    } catch (error) {
      console.error(error);
      alert("Error: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid fade-in h-100">
      
      {/* Cabecera */}
      <div className="mb-4">
        <h2 className="h3 fw-bold text-dark mb-1">Generador de Documentos</h2>
        <p className="text-muted">Completa los datos a la izquierda visualizando el modelo a la derecha.</p>
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
                  }}
                >
                  <option value="">-- Selecciona el documento --</option>
                  {plantillas.map((p) => (
                    <option key={p.id} value={p.id}>{p.nombre}</option>
                  ))}
                </select>
              </div>

              {/* 2. Campos Dinámicos */}
              {plantillaSeleccionada ? (
                <div className="fade-in">
                  <h6 className="fw-bold border-bottom pb-2 mb-3 text-dark">
                    2. Llenar Datos: <span className="text-primary">{plantillaSeleccionada.nombre}</span>
                  </h6>
                  
                  <div className="row g-3">
                    {plantillaSeleccionada.campos.map((campo) => (
                      <div key={campo.key} className={campo.type === 'textarea' ? 'col-12' : 'col-md-12'}>
                        <label className="form-label small fw-bold text-muted mb-1">{campo.label}</label>
                        
                        {campo.type === 'textarea' ? (
                          <textarea 
                            className="form-control bg-light border-0 rounded-3"
                            rows={3}
                            placeholder={`Escribe aquí...`}
                            onChange={(e) => handleInputChange(campo.key, e.target.value)}
                            value={formData[campo.key] || ''}
                          />
                        ) : (
                          <input 
                            type={campo.type} 
                            className="form-control bg-light border-0 rounded-3 p-2"
                            onChange={(e) => handleInputChange(campo.key, e.target.value)}
                            value={formData[campo.key] || ''}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Botón Descargar */}
                  <div className="d-grid mt-5 sticky-bottom bg-white pt-3">
                    <button 
                      onClick={handleGenerarDocumento}
                      className="btn btn-primary rounded-pill py-3 fw-bold shadow hover-scale"
                      disabled={loading}
                    >
                      {loading ? (
                        <span><span className="spinner-border spinner-border-sm me-2"></span>Generando Word...</span>
                      ) : (
                        <span><i className="bi bi-download me-2"></i>Descargar Documento Listo</span>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-5 text-muted h-100 d-flex flex-column justify-content-center">
                  <i className="bi bi-arrow-up-circle fs-1 mb-3 opacity-50"></i>
                  <p>Por favor selecciona una plantilla arriba para comenzar a editar.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- COLUMNA DERECHA: VISTA PREVIA (FOTO) --- */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-secondary bg-opacity-10 position-relative overflow-hidden">
            
            {/* Cabecera de la vista previa */}
            <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
              <h6 className="fw-bold m-0 text-primary">👁️ Vista Preliminar</h6>
              <span className="badge bg-light text-dark border">Imagen de Referencia</span>
            </div>
            
            {/* Contenedor de la Imagen */}
            <div className="card-body p-0 d-flex align-items-start justify-content-center overflow-auto custom-scrollbar" style={{ height: '75vh' }}>
              {plantillaSeleccionada ? (
                <div className="p-4 text-center">
                  {/* AQUÍ SE MUESTRA LA FOTO DE TU WORD */}
                  <img 
                    src={plantillaSeleccionada.previewImg} 
                    alt="Vista Previa Documento" 
                    className="shadow-lg border bg-white"
                    style={{ 
                      maxWidth: '100%', 
                      width: 'auto', 
                      height: 'auto',
                      borderRadius: '4px' 
                    }}
                    onError={(e) => {
                      // Si falla la imagen, muestra esto
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500x700?text=Imagen+No+Encontrada';
                    }}
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

      {/* Estilos para la barra de desplazamiento interna */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8f9fa; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #dee2e6; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #adb5bd; }
      `}</style>
    </div>
  );
}