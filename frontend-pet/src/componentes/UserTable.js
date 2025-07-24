import React, { useState } from 'react';
import Swal from 'sweetalert2';

function UserTable({ users, onDelete, onUpdate, owners, pets, onNavigate, highlightedUserId, userColorMap }) {
  const [editUserId, setEditUserId] = useState(null);
  const [formData, setFormData] = useState({});
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [originalPassword, setOriginalPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState({});

  const handleEditClick = (user) => {
    setEditUserId(user.userId);
    setOriginalPassword(user.password); // Guardar original
    setFormData({ ...user, password: '' }); // Mostrar campo vacío
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getPetIcon = (species) => {
    const icons = {
      perro: '🐶',
      gato: '🐱',
      ave: '🐦',
      conejo: '🐰',
      pez: '🐟'
    };
    return icons[species?.toLowerCase()] || '🐾';
  };

  const togglePasswordVisibility = (userId) => {
    setShowPasswords(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };


  const handleSubmit = () => {
    // Verificar correo duplicado (excluyendo el usuario actual)
    const isEmailDuplicate = users.some(
      u => u.email === formData.email && u.userId !== formData.userId
    );

    if (isEmailDuplicate) {
      Swal.fire({
        icon: 'error',
        title: 'Correo duplicado',
        text: '❌ Ya existe un usuario con ese correo electrónico.',
      });
      return;
    }

    const updatedUser = {
      ...formData,
      password: formData.password?.trim() === '' ? originalPassword : formData.password
    };

    onUpdate(updatedUser);
    setEditUserId(null);
  };

  const handleCancel = () => {
    setEditUserId(null);
    setFormData({});
    setOriginalPassword('');
  };

  const toggleExpand = (userId) => {
    setExpandedUserId(prev => (prev === userId ? null : userId));
  };

  return (
    <table className="dashboard-table">
      <thead>
        <tr>
          <th>ID</th><th>Nombre</th><th>Email</th><th>Contraseña</th><th>Rol</th><th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => {
          const owner = owners.find(o => o.user?.userId === user.userId);
          const userPets = owner ? pets.filter(p => p.owner?.ownerId === owner.ownerId) : [];

          return (
            <React.Fragment key={user.userId}>
              {editUserId === user.userId ? (
                <tr>
                  <td>{user.userId}</td>
                  <td><input name="name" value={formData.name || ''} onChange={handleChange} /></td>
                  <td><input name="email" value={formData.email || ''} onChange={handleChange} /></td>
                  <td>
                    <input
                      name="password"
                      value={formData.password || ''}
                      onChange={handleChange}
                      placeholder="Nueva contraseña (opcional)"
                    />
                  </td>
                  <td>
                    <select name="role" value={formData.role || ''} onChange={handleChange}>
                      <option value="duenio">Dueño</option>
                      <option value="asistente">Asistente</option>
                      <option value="veterinario">Veterinario</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={handleSubmit}>Guardar</button>
                    <button onClick={handleCancel}>Cancelar</button>
                  </td>
                </tr>
              ) : (
                <tr
                  style={{
                    backgroundColor: highlightedUserId === user.userId ? userColorMap[user.userId] : 'transparent'
                  }}
                >
                  <td>{user.userId}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <input
                      type={showPasswords[user.userId] ? 'text' : 'password'}
                      value={user.password}
                      readOnly
                      style={{
                        border: 'none',
                        background: 'transparent',
                        fontFamily: 'monospace',
                        width: '100px'
                      }}
                    />
                    <button
                      onClick={() => togglePasswordVisibility(user.userId)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        color: '#3498db'
                      }}
                      title={showPasswords[user.userId] ? 'Ocultar contraseña' : 'Ver contraseña'}
                    >
                      {showPasswords[user.userId] ? '🙈' : '👁️'}
                    </button>
                  </td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => handleEditClick(user)}>Editar</button>
                    <button onClick={() => onDelete(user.userId)}>Eliminar</button>
                    {user.role === 'duenio' && (
                      <>
                        <button className="details-button" onClick={() => toggleExpand(user.userId)}>
                          {expandedUserId === user.userId ? '👁️ Ocultar' : '👁️ Ver detalles'}
                        </button>
                        <button onClick={() => onNavigate(user)}>🔍 Ver relaciones</button>
                      </>
                    )}
                  </td>
                </tr>
              )}
              {user.role === 'duenio' && expandedUserId === user.userId && (
                <tr>
                  <td colSpan="6">
                    <div className="details-box">
                      <h4>🧑 Información del Dueño</h4>
                      <hr />
                      {owner ? (
                        <table className="owner-info-table">
                          <tbody>
                            <tr><td><strong>ID:</strong></td><td>{owner.ownerId}</td></tr>
                            <tr><td><strong>Teléfono:</strong></td><td>{owner.phone}</td></tr>
                            <tr><td><strong>Dirección:</strong></td><td>{owner.address}</td></tr>
                          </tbody>
                        </table>
                      ) : (
                        <p><em>No tiene dueño asociado.</em></p>
                      )}
                      <h4>🐾 Mascotas Registradas</h4>
                      <hr />
                      {userPets.length > 0 ? (
                        <ul className="pet-list">
                          {userPets.map(pet => (
                            <li key={pet.petId}>
                              {getPetIcon(pet.species)} <strong>{pet.name}</strong> — {pet.species} ({pet.breed})
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p><em>No tiene mascotas registradas.</em></p>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
}

export default UserTable;
