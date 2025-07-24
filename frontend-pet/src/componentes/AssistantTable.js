import React, { useState } from 'react';
import Swal from 'sweetalert2';

function AssistantTable({ assistants, users, onSave, usuario }) {
  const [editAssistant, setEditAssistant] = useState(null);
  const [formData, setFormData] = useState({});
  const esVeterinario = usuario?.role === 'veterinario';

  const handleEditClick = (assistant) => {
    setEditAssistant(assistant.assistantId);
    setFormData({ ...assistant });
  };

  const handleCreateClick = (user) => {
    setEditAssistant('nuevo');
    setFormData({
      assistantId: 0,
      user: user,
      functions: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.functions) {
      Swal.fire('Campo requerido', 'Debe ingresar funciones.', 'error');
      return;
    }

    onSave(formData);
    setEditAssistant(null);
    setFormData({});
  };

  const handleCancel = () => {
    setEditAssistant(null);
    setFormData({});
  };

  const usuariosAsistentes = users.filter(u => u.role === 'asistente');
  const usuariosSinRegistro = usuariosAsistentes.filter(u =>
    !assistants.some(a => a.user.userId === u.userId)
  );

  return (
    <div>
      <h4>Asistentes Registrados</h4>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>ID</th><th>Usuario</th><th>Funciones</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {assistants.map(assistant => (
            <tr key={assistant.assistantId}>
              {editAssistant === assistant.assistantId ? (
                <>
                  <td>{assistant.assistantId}</td>
                  <td>{assistant.user.name}</td>
                  <td><input name="functions" value={formData.functions} onChange={handleChange} /></td>
                  {esVeterinario && (
                    <td>
                      <button onClick={handleSubmit}>Guardar</button>
                      <button onClick={handleCancel}>Cancelar</button>
                    </td>
                  )}
                </>
              ) : (
                <>
                  <td>{assistant.assistantId}</td>
                  <td>{assistant.user.name}</td>
                  <td>{assistant.functions}</td>
                  {esVeterinario && (
                    <td>
                      <button onClick={() => handleEditClick(assistant)}>Editar</button>
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
          <h4>Usuarios con rol asistente sin registro</h4>
          <table className="dashboard-table">
            <thead>
              <tr><th>Usuario</th><th>Acción</th></tr>
            </thead>
            <tbody>
              {usuariosSinRegistro.map(user => (
                <tr key={user.userId}>
                  <td>{user.name}</td>
                  <td>
                    <button onClick={() => handleCreateClick(user)}>Registrar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {editAssistant === 'nuevo' && (
        <div>
          <h4>Nuevo Asistente</h4>
          <p><strong>Usuario:</strong> {formData.user?.name}</p>
          <input
            name="functions"
            placeholder="Funciones"
            value={formData.functions}
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Guardar</button>
          <button onClick={handleCancel}>Cancelar</button>
        </div>
      )}
    </div>
  );
}

export default AssistantTable;
