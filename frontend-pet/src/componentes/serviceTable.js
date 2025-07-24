import React, { useState } from 'react';

function ServiceTable({ services, onUpdate, onDelete, usuario }) {
  const [editServiceId, setEditServiceId] = useState(null);
  const [formData, setFormData] = useState({});
  const esVeterinario = usuario?.role === 'veterinario';

  const handleEditClick = (service) => {
    setEditServiceId(service.serviceId);
    setFormData({ ...service });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.serviceName || !formData.price) {
      alert('Todos los campos son obligatorios');
      return;
    }
    onUpdate(formData);
    setEditServiceId(null);
  };

  const handleCancel = () => {
    setEditServiceId(null);
    setFormData({});
  };

  return (
    <table className="dashboard-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre del Servicio</th>
          <th>Precio (S/.)</th>
          {esVeterinario && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {services.map(service => (
          <tr key={service.serviceId}>
            {editServiceId === service.serviceId ? (
              <>
                <td>{service.serviceId}</td>
                <td>
                  <input
                    name="serviceName"
                    value={formData.serviceName || ''}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="price"
                    value={formData.price || ''}
                    onChange={handleChange}
                  />
                </td>
                {esVeterinario && (
                  <td>
                    <button onClick={handleSubmit}>Guardar</button>
                    <button onClick={handleCancel}>Cancelar</button>
                  </td>
                )}
              </>
            ) : (
              <>
                <td>{service.serviceId}</td>
                <td>{service.serviceName}</td>
                <td>{service.price}</td>
                {esVeterinario && (
                  <td>
                    <button onClick={() => handleEditClick(service)}>Editar</button>
                    <button onClick={() => onDelete(service.serviceId)}>Eliminar</button>
                  </td>
                )}
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ServiceTable;
