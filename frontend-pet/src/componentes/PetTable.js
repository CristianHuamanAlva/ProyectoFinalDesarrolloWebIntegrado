import React, { useState } from 'react';

function PetTable({ pets, onUpdate, onDelete, highlightedPetsByOwnerId, userColorMap }) {
  const [editPetId, setEditPetId] = useState(null);
  const [expandedPetId, setExpandedPetId] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEditClick = (pet) => {
    setEditPetId(pet.petId);
    setFormData({
      petId: pet.petId,
      name: pet.name || '',
      species: pet.species || '',
      breed: pet.breed || '',
      birthDate: pet.birthDate ? pet.birthDate.substring(0, 10) : '',
      owner: pet.owner ? { ownerId: pet.owner.ownerId } : null,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('owner.')) {
      const ownerField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        owner: { ...prev.owner, [ownerField]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    onUpdate(formData);
    setEditPetId(null);
  };

  const handleCancel = () => {
    setEditPetId(null);
    setFormData({});
  };

  const toggleExpand = (petId) => {
    setExpandedPetId(prev => (prev === petId ? null : petId));
  };

  return (
    <table className="dashboard-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Especie</th>
          <th>Raza</th>
          <th>Fecha Nacimiento</th>
          <th>ID Dueño</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {pets.map(pet => (
          <React.Fragment key={pet.petId}>
            {editPetId === pet.petId ? (
              <tr>
                <td>{pet.petId}</td>
                <td><input name="name" value={formData.name || ''} onChange={handleChange} /></td>
                <td><input name="species" value={formData.species || ''} onChange={handleChange} /></td>
                <td><input name="breed" value={formData.breed || ''} onChange={handleChange} /></td>
                <td><input type="date" name="birthDate" value={formData.birthDate || ''} onChange={handleChange} /></td>
                <td>{pet.owner?.ownerId || ''}</td>
                <td>
                  <button onClick={handleSubmit}>Guardar</button>
                  <button onClick={handleCancel}>Cancelar</button>
                </td>
              </tr>
            ) : (
              <tr
                style={{
                  backgroundColor:
                    highlightedPetsByOwnerId === pet.owner?.ownerId
                      ? userColorMap[pet.owner?.user?.userId]
                      : 'transparent'
                }}
              >
                <td>{pet.petId}</td>
                <td>{pet.name}</td>
                <td>{pet.species}</td>
                <td>{pet.breed}</td>
                <td>{pet.birthDate ? pet.birthDate.substring(0, 10) : ''}</td>
                <td>{pet.owner?.ownerId}</td>
                <td>
                  <button onClick={() => handleEditClick(pet)}>Editar</button>
                  <button onClick={() => onDelete(pet.petId)}>Eliminar</button>
                  <button onClick={() => toggleExpand(pet.petId)}>
                    {expandedPetId === pet.petId ? '👁️ Ocultar' : '👁️ Ver detalles'}
                  </button>
                </td>
              </tr>
            )}

            {expandedPetId === pet.petId && pet.owner && pet.owner.user && (
              <tr>
                <td colSpan="7">
                  <div className="details-box">
                    <h4>📋 Datos del Dueño</h4>
                    <hr />
                    <table className="owner-info-table">
                      <tbody>
                        <tr>
                          <td><strong>Teléfono:</strong></td>
                          <td>{pet.owner.phone}</td>
                        </tr>
                        <tr>
                          <td><strong>Dirección:</strong></td>
                          <td>{pet.owner.address}</td>
                        </tr>
                        <tr>
                          <td><strong>Nombre:</strong></td>
                          <td>{pet.owner.user.name}</td>
                        </tr>
                        <tr>
                          <td><strong>Email:</strong></td>
                          <td>{pet.owner.user.email}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default PetTable;