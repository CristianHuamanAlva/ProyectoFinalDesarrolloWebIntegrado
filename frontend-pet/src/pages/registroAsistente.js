import React, { useState } from 'react';
import Swal from 'sweetalert2';

function RegistroAsistente({ onUserCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    functions: '',
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }

    if (!formData.termsAccepted) {
      Swal.fire('Advertencia', 'Debes aceptar los términos y condiciones', 'warning');
      return;
    }

    const userToSend = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: 'ASISTENTE',
    };

    try {
      const userResponse = await fetch('http://localhost:8090/bd_petcare/api/users/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userToSend),
      });

      if (!userResponse.ok) {
        const errorText = await userResponse.text();
        throw new Error(`Error al guardar el usuario: ${userResponse.status} - ${errorText}`);
      }

      const createdUser = await userResponse.json();

      const assistantToSend = {
        functions: formData.functions,
        user: {
          userId: createdUser.userId,
        },
      };

      const assistantResponse = await fetch('http://localhost:8090/bd_petcare/api/assistants/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // 👈 agrega el token JWT aquí
        },
        body: JSON.stringify(assistantToSend),
      });

      if (!assistantResponse.ok) {
        const errorText = await assistantResponse.text();
        throw new Error(`Error al guardar el asistente: ${assistantResponse.status} - ${errorText}`);
      }

      Swal.fire('Éxito', 'Asistente creado correctamente', 'success');

      if (onUserCreated) {
        onUserCreated();
      }

      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        functions: '',
        termsAccepted: false,
      });

    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  return (
    <div className="registerpet-root">
      <div className="container registerpet-container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="registerpet-form-container">
              <div className="registerpet-header">
                <h1 className="registerpet-title">
                  <span className="registerpet-text-primary">Registro</span>{' '}
                  <span className="registerpet-text-secondary">Asistente</span>
                </h1>
                <p className="registerpet-subtitle">
                  Regístrate para apoyar al equipo profesional de PetCare
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="registerpet-form-group">
                  <label htmlFor="name" className="registerpet-form-label">Nombre Completo</label>
                  <div className="registerpet-input-group">
                    <i className="fas fa-user registerpet-input-icon"></i>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Ingresa tu nombre completo"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="registerpet-form-control"
                    />
                  </div>
                </div>

                <div className="registerpet-form-group">
                  <label htmlFor="email" className="registerpet-form-label">Correo Electrónico</label>
                  <div className="registerpet-input-group">
                    <i className="fas fa-envelope registerpet-input-icon"></i>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="ejemplo@petcare.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="registerpet-form-control"
                    />
                  </div>
                </div>

                <div className="registerpet-form-group">
                  <label htmlFor="functions" className="registerpet-form-label">Funciones</label>
                  <div className="registerpet-input-group">
                    <i className="fas fa-tools registerpet-input-icon"></i>
                    <input
                      type="text"
                      id="functions"
                      name="functions"
                      placeholder="Describe tus funciones"
                      value={formData.functions}
                      onChange={handleChange}
                      required
                      className="registerpet-form-control"
                    />
                  </div>
                </div>

                <div className="registerpet-form-group">
                  <label htmlFor="password" className="registerpet-form-label">Contraseña</label>
                  <div className="registerpet-input-group">
                    <i className="fas fa-key registerpet-input-icon"></i>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="registerpet-form-control"
                    />
                  </div>
                </div>

                <div className="registerpet-form-group">
                  <label htmlFor="confirmPassword" className="registerpet-form-label">Confirmar Contraseña</label>
                  <div className="registerpet-input-group">
                    <i className="fas fa-check-circle registerpet-input-icon"></i>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="registerpet-form-control"
                    />
                  </div>
                </div>

                <div className="registerpet-form-group">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="termsAccepted"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleChange}
                      required
                      className="form-check-input"
                    />
                    <label htmlFor="termsAccepted" className="form-check-label registerpet-text-muted">
                      Acepto los{' '}
                      <a href="/" className="registerpet-link">Términos y Condiciones</a> y la{' '}
                      <a href="/" className="registerpet-link">Política de Privacidad</a>
                    </label>
                  </div>
                </div>

                <button type="submit" className="registerpet-btn registerpet-btn-primary mb-3">
                  <i className="fas fa-user me-2"></i> Crear Cuenta Asistente
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistroAsistente;
