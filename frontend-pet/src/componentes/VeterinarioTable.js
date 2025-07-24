import React, { useState } from 'react';
import Swal from 'sweetalert2';

function VeterinarioTable({ veterinarios, users, onSave, usuario }) {
  const [editVet, setEditVet] = useState(null);
  const [formData, setFormData] = useState({});
  const esVeterinario = usuario?.role === 'veterinario';

  const handleEditClick = (vet) => {
    setEditVet(vet.veterinarianId);
    setFormData({ ...vet });
  };

  const handleCreateClick = (user) => {
    setEditVet('nuevo');
    setFormData({
      veterinarianId: 0,
      user: user,
      specialty: '',
      licenseNumber: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.specialty || !formData.licenseNumber) {
      Swal.fire('Campos incompletos', 'Especialidad y número de colegiatura son requeridos.', 'error');
      return;
    }

    onSave(formData);
    setEditVet(null);
    setFormData({});
  };

  const handleCancel = () => {
    setEditVet(null);
    setFormData({});
  };

  const usuariosVeterinarios = users.filter(u => u.role === 'veterinario');
  const usuariosSinRegistro = usuariosVeterinarios.filter(u =>
    !veterinarios.some(v => v.user.userId === u.userId)
  );

  return (
    <div>
      <h4>Veterinarios Registrados</h4>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>ID</th><th>Usuario</th><th>Especialidad</th><th>N° Colegiado</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {veterinarios.map(vet => (
            <tr key={vet.veterinarianId}>
              {editVet === vet.veterinarianId ? (
                <>
                  <td>{vet.veterinarianId}</td>
                  <td>{vet.user.name}</td>
                  <td><input name="specialty" value={formData.specialty} onChange={handleChange} /></td>
                  <td><input name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} /></td>
                  {esVeterinario && (
                    <td>
                      <button onClick={handleSubmit}>Guardar</button>
                      <button onClick={handleCancel}>Cancelar</button>
                    </td>
                  )}
                </>
              ) : (
                <>
                  <td>{vet.veterinarianId}</td>
                  <td>{vet.user.name}</td>
                  <td>{vet.specialty}</td>
                  <td>{vet.licenseNumber}</td>
                  {esVeterinario && (
                    <td>
                      <button onClick={() => handleEditClick(vet)}>Editar</button>
                    </td>
                  )}
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {esVeterinario && (
        <>
          <h4>Usuarios con rol veterinario sin registro</h4>
          <table className="dashboard-table">
            <thead>
              <tr><th>Usuario</th><th>Acción</th></tr>
            </thead>
            <tbody>
              {usuariosSinRegistro.map(user => (
                <tr key={user.userId}>
                  <td>{user.name}</td>
                  <td>
                    <button onClick={() => handleCreateClick(user)}>Registrar datos</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
        )}
      {editVet === 'nuevo' && (
        <div>
          <h4>Nuevo Veterinario</h4>
          <p><strong>Usuario:</strong> {formData.user?.name}</p>
          <input
            name="specialty"
            placeholder="Especialidad"
            value={formData.specialty}
            onChange={handleChange}
          />
          <input
            name="licenseNumber"
            placeholder="N° Colegiado"
            value={formData.licenseNumber}
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Guardar</button>
          <button onClick={handleCancel}>Cancelar</button>
        </div>
      )}
    </div>
  );
}

export default VeterinarioTable;
