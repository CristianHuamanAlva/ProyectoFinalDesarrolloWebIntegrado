import React, { useState } from 'react';
import Swal from 'sweetalert2';

function RegistroVeterinario({ onUserCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialty: '',
    licenseNumber: '',
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
      Swal.fire({
        icon: 'error',
        title: 'Error de Validación',
        text: 'Las contraseñas no coinciden',
      });
      return;
    }

    if (!formData.termsAccepted) {
      Swal.fire({
        icon: 'warning',
        title: 'Términos no aceptados',
        text: 'Debes aceptar los términos y condiciones',
      });
      return;
    }

    const userToSend = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: 'VETERINARIO',
    };

    try {
      // Crear usuario
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

      // Crear veterinario
      const vetToSend = {
        specialty: formData.specialty,
        licenseNumber: formData.licenseNumber,
        user: { userId: createdUser.userId },
      };

      const vetResponse = await fetch('http://localhost:8090/bd_petcare/api/veterinarians/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // 👈 agrega el token JWT aquí
        },
        body: JSON.stringify(vetToSend),
      });


      if (!vetResponse.ok) {
        const errorText = await vetResponse.text();
        throw new Error(`Error al guardar el veterinario: ${vetResponse.status} - ${errorText}`);
      }

      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Veterinario creado correctamente',
      });

      if (onUserCreated) onUserCreated();

      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        specialty: '',
        licenseNumber: '',
        termsAccepted: false,
      });

    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: err.message,
      });
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
                  <span className="registerpet-text-secondary">Veterinario</span>
                </h1>
                <p className="registerpet-subtitle">
                  Regístrate para formar parte del equipo profesional de PetCare
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="registerpet-form-group">
                  <label htmlFor="name" className="registerpet-form-label">Nombre Completo</label>
                  <div className="registerpet-input-group">
                    <i className="fas fa-user-md registerpet-input-icon"></i>
                    <input type="text" id="name" name="name" placeholder="Ingresa tu nombre completo"
                      value={formData.name} onChange={handleChange} required className="registerpet-form-control" />
                  </div>
                </div>

                <div className="registerpet-form-group">
                  <label htmlFor="email" className="registerpet-form-label">Correo Electrónico</label>
                  <div className="registerpet-input-group">
                    <i className="fas fa-envelope registerpet-input-icon"></i>
                    <input type="email" id="email" name="email" placeholder="ejemplo@petcare.com"
                      value={formData.email} onChange={handleChange} required className="registerpet-form-control" />
                  </div>
                </div>

                <div className="registerpet-form-group">
                  <label htmlFor="specialty" className="registerpet-form-label">Especialidad</label>
                  <div className="registerpet-input-group">
                    <i className="fas fa-stethoscope registerpet-input-icon"></i>
                    <input type="text" id="specialty" name="specialty" placeholder="Ej. Cirugía, Dermatología"
                      value={formData.specialty} onChange={handleChange} required className="registerpet-form-control" />
                  </div>
                </div>

                <div className="registerpet-form-group">
                  <label htmlFor="licenseNumber" className="registerpet-form-label">Número de Licencia</label>
                  <div className="registerpet-input-group">
                    <i className="fas fa-id-card registerpet-input-icon"></i>
                    <input type="text" id="licenseNumber" name="licenseNumber" placeholder="Licencia profesional"
                      value={formData.licenseNumber} onChange={handleChange} required className="registerpet-form-control" />
                  </div>
                </div>

                <div className="registerpet-form-group">
                  <label htmlFor="password" className="registerpet-form-label">Contraseña</label>
                  <div className="registerpet-input-group">
                    <i className="fas fa-key registerpet-input-icon"></i>
                    <input type="password" id="password" name="password" placeholder="••••••••"
                      value={formData.password} onChange={handleChange} required className="registerpet-form-control" />
                  </div>
                </div>

                <div className="registerpet-form-group">
                  <label htmlFor="confirmPassword" className="registerpet-form-label">Confirmar Contraseña</label>
                  <div className="registerpet-input-group">
                    <i className="fas fa-check-circle registerpet-input-icon"></i>
                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="••••••••"
                      value={formData.confirmPassword} onChange={handleChange} required className="registerpet-form-control" />
                  </div>
                </div>

                <div className="registerpet-form-group">
                  <div className="form-check">
                    <input type="checkbox" id="termsAccepted" name="termsAccepted"
                      checked={formData.termsAccepted} onChange={handleChange} required className="form-check-input" />
                    <label htmlFor="termsAccepted" className="form-check-label registerpet-text-muted">
                      Acepto los{' '}
                      <a href="/" className="registerpet-link">Términos y Condiciones</a> y la{' '}
                      <a href="/" className="registerpet-link">Política de Privacidad</a>
                    </label>
                  </div>
                </div>

                <button type="submit" className="registerpet-btn registerpet-btn-primary mb-3">
                  <i className="fas fa-user-md me-2"></i> Crear Cuenta Veterinaria
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistroVeterinario;
