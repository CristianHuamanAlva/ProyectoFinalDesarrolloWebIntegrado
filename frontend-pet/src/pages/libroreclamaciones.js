import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './libroreclamaciones.css';

function LibroReclamaciones() {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    correo: '',
    nombre: '',
    telefono: '',
    direccion: '',
    tipoDocumento: 'DNI',
    numeroDocumento: '',
    tipoReclamo: 'queja',
    fechaIncidente: '',
    detalleReclamo: '',
    expectativaSolucion: ''
  });
  const [documentoError, setDocumentoError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
      setUserData(usuario);
      setFormData(prev => ({
        ...prev,
        correo: usuario.email,
        nombre: usuario.name || ''
      }));

      if (usuario.role === 'duenio' && usuario.userId) {
        fetchOwnerData(usuario.userId);
      }
    }
  }, []);

  const fetchOwnerData = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8090/bd_petcare/api/owners/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        const owner = await res.json();
        setFormData(prev => ({
          ...prev,
          telefono: owner.phone || '',
          direccion: owner.address || ''
        }));
      }
    } catch (error) {
      console.error("Error al obtener datos del owner:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'tipoDocumento') {
      setFormData(prev => ({ 
        ...prev, 
        [name]: value,
        numeroDocumento: '' // Limpiar el número cuando cambia el tipo
      }));
      setDocumentoError('');
    } else if (name === 'numeroDocumento') {
      // Validar según el tipo de documento
      const tipoDoc = formData.tipoDocumento;
      let error = '';
      
      if (value) {
        if (tipoDoc === 'DNI' && (!/^\d{8}$/.test(value))) {
          error = 'El DNI debe tener 8 dígitos';
        } else if (tipoDoc === 'Carnet de Extranjería' && (!/^[a-zA-Z0-9]{9,12}$/.test(value))) {
          error = 'El Carnet de Extranjería debe tener entre 9 y 12 caracteres alfanuméricos';
        } else if (tipoDoc === 'Pasaporte' && (!/^[a-zA-Z0-9]{8,12}$/.test(value))) {
          error = 'El Pasaporte debe tener entre 8 y 12 caracteres alfanuméricos';
        } else if (tipoDoc === 'RUC' && (!/^\d{11}$/.test(value))) {
          error = 'El RUC debe tener 11 dígitos';
        }
      }
      
      setDocumentoError(error);
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validarDocumento = () => {
    const { tipoDocumento, numeroDocumento } = formData;
    
    if (!numeroDocumento) {
      setDocumentoError('Este campo es obligatorio');
      return false;
    }
    
    if (tipoDocumento === 'DNI' && !/^\d{8}$/.test(numeroDocumento)) {
      setDocumentoError('El DNI debe tener 8 dígitos');
      return false;
    }
    
    if (tipoDocumento === 'Carnet de Extranjería' && !/^[a-zA-Z0-9]{9,12}$/.test(numeroDocumento)) {
      setDocumentoError('El Carnet de Extranjería debe tener entre 9 y 12 caracteres alfanuméricos');
      return false;
    }
    
    if (tipoDocumento === 'Pasaporte' && !/^[a-zA-Z0-9]{8,12}$/.test(numeroDocumento)) {
      setDocumentoError('El Pasaporte debe tener entre 8 y 12 caracteres alfanuméricos');
      return false;
    }
    
    if (tipoDocumento === 'RUC' && !/^\d{11}$/.test(numeroDocumento)) {
      setDocumentoError('El RUC debe tener 11 dígitos');
      return false;
    }
    
    setDocumentoError('');
    return true;
  };

  const enviarReclamo = async (e) => {
    e.preventDefault();

    if (!userData) {
      Swal.fire('Atención', 'Debes iniciar sesión para enviar un reclamo', 'warning');
      navigate('/login');
      return;
    }

    // Validar documento antes de enviar
    if (!validarDocumento()) {
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch("http://localhost:8090/bd_petcare/api/reclamos/enviar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Error al enviar reclamo");

      Swal.fire({
        title: "✅ Reclamo enviado",
        text: "Hemos recibido tu reclamo y lo atenderemos pronto",
        icon: "success",
        confirmButtonColor: "#e63946"
      });
      setFormData(prev => ({ ...prev, detalleReclamo: '', expectativaSolucion: '' }));
    } catch (error) {
      console.error("Error al enviar reclamo:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo enviar el reclamo",
        icon: "error",
        confirmButtonColor: "#e63946"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return (
      <div className="no-session-warning-container">
        <div className="no-session-warning-box">
          <h2 className="no-session-title">Libro de Reclamaciones</h2>
          <p className="no-session-text">Debes iniciar sesión para poder enviar un reclamo.</p>
          <button className="no-session-button" onClick={() => navigate('/login')}>
            Ir a Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="libroreclamos-container">
      <div className="libroreclamos-hero">
        <div className="libroreclamos-hero-content">
          <h1>Libro de Reclamaciones</h1>
          <p>Tu opinión es importante para nosotros. Por favor completa el formulario con los detalles de tu reclamo.</p>
          <div className="libroreclamos-features">
            <div className="libroreclamos-feature-item">
              <i className="fas fa-shield-alt"></i>
              <span>Protegemos tus datos</span>
            </div>
            <div className="libroreclamos-feature-item">
              <i className="fas fa-clock"></i>
              <span>Respuesta en 24-48 horas</span>
            </div>
          </div>
        </div>
      </div>

      <div className="libroreclamos-form-container">
        {loading && (
          <div className="libroreclamos-loading-overlay">
            <div className="libroreclamos-spinner"></div>
            <p>Enviando reclamo...</p>
          </div>
        )}

        <form className="libroreclamos-form" onSubmit={enviarReclamo}>
          <h3>Información Personal</h3>
          <div className="libroreclamos-form-grid">
            <div className="libroreclamos-form-group">
              <label>Correo Electrónico</label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                disabled
              />
            </div>

            <div className="libroreclamos-form-group">
              <label>Nombre Completo</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="libroreclamos-form-group">
              <label>Teléfono</label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>

            <div className="libroreclamos-form-group">
              <label>Dirección</label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                required
              />
            </div>

            <div className="libroreclamos-form-group">
              <label>Tipo de Documento</label>
              <select
                name="tipoDocumento"
                value={formData.tipoDocumento}
                onChange={handleChange}
                required
              >
                <option value="DNI">DNI</option>
                <option value="Carnet de Extranjería">Carnet de Extranjería</option>
                <option value="Pasaporte">Pasaporte</option>
                <option value="RUC">RUC</option>
              </select>
            </div>

            <div className="libroreclamos-form-group">
              <label>Número de Documento</label>
              <input
                type="text"
                name="numeroDocumento"
                value={formData.numeroDocumento}
                onChange={handleChange}
                onBlur={validarDocumento}
                required
                pattern={formData.tipoDocumento === 'DNI' ? '\\d{8}' : 
                         formData.tipoDocumento === 'RUC' ? '\\d{11}' : 
                         '[a-zA-Z0-9]{8,12}'}
                title={
                  formData.tipoDocumento === 'DNI' ? 'Ingrese 8 dígitos' :
                  formData.tipoDocumento === 'RUC' ? 'Ingrese 11 dígitos' :
                  formData.tipoDocumento === 'Carnet de Extranjería' ? 'Ingrese entre 9-12 caracteres alfanuméricos' :
                  'Ingrese entre 8-12 caracteres alfanuméricos'
                }
              />
              {documentoError && <span className="libroreclamos-error">{documentoError}</span>}
            </div>
          </div>

          <h3>Detalles del Reclamo</h3>
          <div className="libroreclamos-form-grid">
            <div className="libroreclamos-form-group">
              <label>Tipo de Reclamo</label>
              <select
                name="tipoReclamo"
                value={formData.tipoReclamo}
                onChange={handleChange}
                required
              >
                <option value="queja">Queja</option>
                <option value="reclamo">Reclamo</option>
                <option value="sugerencia">Sugerencia</option>
                <option value="felicitacion">Felicitación</option>
              </select>
            </div>

            <div className="libroreclamos-form-group">
              <label>Fecha del Incidente</label>
              <input
                type="date"
                name="fechaIncidente"
                value={formData.fechaIncidente}
                onChange={handleChange}
                required
              />
            </div>

            <div className="libroreclamos-form-group libroreclamos-full-width">
              <label>Detalle del Reclamo*</label>
              <textarea
                name="detalleReclamo"
                value={formData.detalleReclamo}
                onChange={handleChange}
                placeholder="Describe con detalle tu reclamo, incluyendo fechas, nombres de personas involucradas y cualquier información relevante."
                required
              />
            </div>

            <div className="libroreclamos-form-group libroreclamos-full-width">
              <label>¿Qué solución esperas?*</label>
              <textarea
                name="expectativaSolucion"
                value={formData.expectativaSolucion}
                onChange={handleChange}
                placeholder="Describe qué solución o respuesta esperas recibir por parte de nuestra empresa."
                required
              />
            </div>
          </div>

          <div className="libroreclamos-form-footer">
            <p className="libroreclamos-disclaimer">* Todos los campos son obligatorios. Nos comprometemos a responder tu reclamo en un plazo máximo de 5 días hábiles.</p>
            <button type="submit" className="libroreclamos-btn" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Reclamo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LibroReclamaciones;