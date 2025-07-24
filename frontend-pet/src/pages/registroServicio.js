import React, { useState } from 'react';
import Swal from 'sweetalert2';

function RegistrarServicio({ onServiceCreated }) {
  const [formData, setFormData] = useState({
    serviceName: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.serviceName || !formData.price) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos',
      });
      return;
    }

    const serviceToSend = {
      serviceName: formData.serviceName,
      price: parseFloat(formData.price),
    };

    try {
      const response = await fetch('http://localhost:8090/bd_petcare/api/services/save', {
        method: 'POST',
                headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // 👈 agrega el token JWT aquí
        },
        body: JSON.stringify(serviceToSend),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al guardar el servicio: ${response.status} - ${errorText}`);
      }

      Swal.fire({
        icon: 'success',
        title: 'Servicio registrado',
        text: 'El servicio ha sido creado correctamente',
      });

      // ✅ Llama a la función para actualizar la tabla
      if (onServiceCreated) onServiceCreated();

      // Limpia el formulario
      setFormData({
        serviceName: '',
        price: '',
      });

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: error.message,
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
                  <span className="registerpet-text-primary">Registrar</span>{' '}
                  <span className="registerpet-text-secondary">Servicio</span>
                </h1>
                <p className="registerpet-subtitle">
                  Agrega un nuevo servicio al sistema de PetCare
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="registerpet-form-group">
                  <label htmlFor="serviceName" className="registerpet-form-label">Nombre del Servicio</label>
                  <div className="registerpet-input-group">
                    <i className="fas fa-concierge-bell registerpet-input-icon"></i>
                    <input
                      type="text"
                      id="serviceName"
                      name="serviceName"
                      placeholder="Ej. Vacunación, Consulta"
                      value={formData.serviceName}
                      onChange={handleChange}
                      required
                      className="registerpet-form-control"
                    />
                  </div>
                </div>

                <div className="registerpet-form-group">
                  <label htmlFor="price" className="registerpet-form-label">Precio (S/)</label>
                  <div className="registerpet-input-group">
                    <i className="fas fa-money-bill-wave registerpet-input-icon"></i>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      placeholder="Ej. 80.00"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      className="registerpet-form-control"
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>

                <button type="submit" className="registerpet-btn registerpet-btn-primary mb-3">
                  <i className="fas fa-plus-circle me-2"></i> Registrar Servicio
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrarServicio;
