import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'animate.css';
import 'sweetalert2/dist/sweetalert2.min.css';

function Registro() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const showSuccessAlert = () => {
    Swal.fire({
      title: '¡Registro Exitoso!',
      text: 'Usuario y dueño creados correctamente. Redirigiendo...',
      icon: 'success',
      confirmButtonColor: '#28a745',
      background: '#f0fff4',
      color: '#155724',
      showClass: {
        popup: 'animate__animated animate__bounceInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  };

  const showErrorAlert = (message) => {
    Swal.fire({
      title: '¡Error!',
      text: message,
      icon: 'error',
      confirmButtonColor: '#dc3545',
      background: '#fff0f0',
      color: '#721c24',
      showClass: {
        popup: 'animate__animated animate__shakeX'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    showErrorAlert('Las contraseñas no coinciden');
    return;
  }

  if (!formData.termsAccepted) {
    showErrorAlert('Debes aceptar los términos y condiciones');
    return;
  }

  // ✅ Verificar si el correo ya existe antes de continuar
  try {
    const res = await fetch("http://localhost:8090/bd_petcare/api/users/email/" + encodeURIComponent(formData.email));
    if (res.ok) {
      showErrorAlert("El correo ya está registrado.");
      return;
    }
  } catch (error) {
    console.error("Error al verificar el correo:", error);
    showErrorAlert("No se pudo verificar el correo. Intenta de nuevo.");
    return;
  }

  const userToSend = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    phone: formData.phone,
    address: formData.address,
    role: 'DUENIO',
  };

  try {
    const response = await fetch('http://localhost:8090/bd_petcare/api/users/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userToSend),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al guardar el usuario: ${response.status} - ${errorText}`);
    }

    const createdUser = await response.json();

    const duenioToSend = {
      phone: formData.phone,
      address: formData.address,
      user: { userId: createdUser.userId },
    };

    const duenioResponse = await fetch('http://localhost:8090/bd_petcare/api/owners/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(duenioToSend),
    });

    if (!duenioResponse.ok) {
      const errorText = await duenioResponse.text();
      throw new Error(`Error al guardar el dueño: ${duenioResponse.status} - ${errorText}`);
    }

    showSuccessAlert();

    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    });

    setTimeout(() => {
      window.location.href = '/login';
    }, 2500);

  } catch (err) {
    showErrorAlert(err.message);
  }
};

  return (
    <div className="registerpet-root">
      <div className="container registerpet-container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="registerpet-form-container">
              <div className="registerpet-header">
                <img
                  src="https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                  alt="Logo PetCare"
                  className="registerpet-logo"
                />
                <h4 className="registerpet-text-secondary mb-3">Únete a PetCare</h4>
                <h1 className="registerpet-title">
                  <span className="registerpet-text-primary">Crear</span>{' '}
                  <span className="registerpet-text-secondary">Cuenta</span>
                </h1>
                <p className="registerpet-subtitle">Regístrate para acceder a todos nuestros servicios</p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Nombre */}
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

                {/* Correo */}
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

                {/* Teléfono y Dirección */}
                <div className="registerpet-row">
                  <div className="registerpet-col">
                    <label htmlFor="phone" className="registerpet-form-label">Teléfono</label>
                    <div className="registerpet-input-group">
                      <i className="fas fa-phone registerpet-input-icon"></i>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Número de contacto"
                        value={formData.phone}
                        onChange={handleChange}
                        className="registerpet-form-control"
                      />
                    </div>
                  </div>

                  <div className="registerpet-col">
                    <label htmlFor="address" className="registerpet-form-label">Dirección</label>
                    <div className="registerpet-input-group">
                      <i className="fas fa-home registerpet-input-icon"></i>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Dirección de residencia"
                        value={formData.address}
                        onChange={handleChange}
                        className="registerpet-form-control"
                      />
                    </div>
                  </div>
                </div>

                {/* Contraseña */}
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

                {/* Términos */}
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
                  <i className="fas fa-user-plus me-2"></i> Registrarse
                </button>

                <div className="registerpet-divider">o</div>

                <div className="text-center">
                  <p className="registerpet-text-muted">
                    ¿Ya tienes una cuenta? <a href="/login" className="registerpet-link">Iniciar Sesión</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registro;
