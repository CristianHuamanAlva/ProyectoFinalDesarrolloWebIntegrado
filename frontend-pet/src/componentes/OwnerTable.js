import React, { useState } from 'react';

function OwnerTable({ owners, users, onUpdate, onCreate, highlightedOwnerId, onNavigateToPets, userColorMap }) {
  const [editOwnerId, setEditOwnerId] = useState(null);
  const [formData, setFormData] = useState({});
  const [expandedOwnerId, setExpandedOwnerId] = useState(null);
  const [creatingNewOwner, setCreatingNewOwner] = useState(false);

  // Filtrar usuarios con rol 'duenio' que NO estén en owners (sin registro)
  const dueniosSinRegistro = users.filter(u => {
    if (u.role !== 'duenio') return false;

    const owner = owners.find(o => o.user?.userId === u.userId);

    // Si no hay owner, o si tiene phone/direction vacíos, se considera sin registro
    return !owner || (!owner.phone?.trim() && !owner.address?.trim());
  });

  const handleEditClick = (owner) => {
    setEditOwnerId(owner.ownerId);
    setFormData({ ...owner });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (creatingNewOwner) {
      onCreate(formData);
      setCreatingNewOwner(false);
    } else {
      onUpdate(formData);
    }
    setEditOwnerId(null);
    setFormData({});
  };

  const handleCancel = () => {
    setEditOwnerId(null);
    setFormData({});
    setCreatingNewOwner(false);
  };

  const toggleExpand = (ownerId) => {
    setExpandedOwnerId(prev => (prev === ownerId ? null : ownerId));
  };

  const handleCreateClick = (user) => {
    setCreatingNewOwner(true);
    setFormData({
      ownerId: 0,
      phone: '',
      address: '',
      user: user,
    });
  };

  return (
    <div>
      <h4>Dueños Registrados</h4>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>ID</th><th>Teléfono</th><th>Dirección</th><th>ID Usuario</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {owners.map(owner => (
            <React.Fragment key={owner.ownerId}>
              {editOwnerId === owner.ownerId ? (
                <tr>
                  <td>{owner.ownerId}</td>
                  <td><input name="phone" value={formData.phone || ''} onChange={handleChange} /></td>
                  <td><input name="address" value={formData.address || ''} onChange={handleChange} /></td>
                  <td>{owner.user?.userId || ''}</td>
                  <td>
                    <button onClick={handleSubmit}>Guardar</button>
                    <button onClick={handleCancel}>Cancelar</button>
                  </td>
                </tr>
              ) : (
<tr
  style={{
    backgroundColor:
      highlightedOwnerId === owner.ownerId
        ? userColorMap[owner.user?.userId]
        : (!owner.phone?.trim() && !owner.address?.trim())
        ? '#ffeeba' // Color para dueños con datos vacíos
        : 'transparent'
  }}
>

                  <td>{owner.ownerId}</td>
                  <td>{owner.phone?.trim() ? owner.phone : 'No especificado'}</td>
                  <td>{owner.address?.trim() ? owner.address : 'No especificado'}</td>
                  <td>{owner.user?.userId}</td>
                  <td>
                    <button onClick={() => handleEditClick(owner)}>Editar</button>
                    <button onClick={() => toggleExpand(owner.ownerId)}>
                      {expandedOwnerId === owner.ownerId ? '👁️ Ocultar' : '👁️ Ver detalles'}
                    </button>
                    {owner.user && (
                      <button onClick={() => onNavigateToPets(owner.ownerId)}>
                        🐾 Ver mascotas
                      </button>
                    )}
                  </td>
                </tr>
              )}

              {expandedOwnerId === owner.ownerId && (
                <tr>
                  <td colSpan="5">
                    <div className="details-box">
                      <h4>🧑 Datos del Usuario Asociado</h4>
                      <hr />
                      {owner.user ? (
                        <table className="user-info-table">
                          <tbody>
                            <tr><td><strong>Nombre:</strong></td><td>{owner.user.name}</td></tr>
                            <tr><td><strong>Email:</strong></td><td>{owner.user.email}</td></tr>
                            <tr><td><strong>Contraseña:</strong></td><td>{owner.user.password}</td></tr>
                          </tbody>
                        </table>
                      ) : (
                        <p><em>No hay datos del usuario.</em></p>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <h4>Usuarios con rol Dueño sin registro</h4>
      <table className="dashboard-table">
        <thead>
          <tr><th>Usuario</th><th>Acción</th></tr>
        </thead>
        <tbody>
          {dueniosSinRegistro.map(user => (
            <tr key={user.userId}>
              <td>{user.name}</td>
              <td>
                <button onClick={() => handleCreateClick(user)}>Registrar datos</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario para crear nuevo dueño */}
      {creatingNewOwner && (
        <div className="new-owner-form">
          <h4>Nuevo Dueño</h4>
          <p><strong>Usuario:</strong> {formData.user?.name}</p>
          <input
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            name="address"
            placeholder="Dirección"
            value={formData.address}
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Guardar</button>
          <button onClick={handleCancel}>Cancelar</button>
        </div>
      )}
    </div>
  );
}

export default OwnerTable;
