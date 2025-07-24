import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const PET_API = 'http://localhost:8090/bd_petcare/api/pets';
const OWNER_BY_USER_API = 'http://localhost:8090/bd_petcare/api/owners/user'; // + /{userId}

function PetForm() {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    birthDate: '',
    owner: { ownerId: '' }
  });

  const [usuario, setUsuario] = useState(null);
  const [loadingOwner, setLoadingOwner] = useState(true);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const user = JSON.parse(usuarioGuardado);
      setUsuario(user);

      if (user.role === 'duenio') {
        fetch(`${OWNER_BY_USER_API}/${user.userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })

          .then(res => {
            if (!res.ok) throw new Error('No se pudo obtener el dueño');
            return res.json();
          })
          .then(owner => {
            if (owner && owner.ownerId) {
              setFormData(prev => ({
                ...prev,
                owner: { ownerId: owner.ownerId }
              }));
            } else {
              console.warn("⚠️ El usuario no tiene un dueño registrado.");
              setFormData(prev => ({
                ...prev,
                owner: { ownerId: '' }
              }));
            }
          })

          .catch(err => {
            console.error('Error obteniendo ownerId:', err);
            Swal.fire({
              icon: 'error',
              title: '🙈 Sin Dueño Asociado',
              text: 'Error al cargar datos del dueño',
              background: '#fff0f0',
              iconColor: '#ef4444',
              confirmButtonColor: '#ef4444',
              confirmButtonText: '<i class="fas fa-times"></i> Entendido',
              showClass: {
                popup: 'animate__animated animate__shakeX'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOut'
              }
            });
          })
          .finally(() => setLoadingOwner(false));
      } else {
        setLoadingOwner(false);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${PET_API}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(formData)
    })

      .then(res => {
        if (res.ok) {
          Swal.fire({
            icon: 'success',
            title: '🐶 ¡Registro Exitoso!',
            html: '<strong>La mascota ha sido registrada correctamente.</strong>',
            background: '#f0fff4',
            color: '#155724',
            confirmButtonColor: '#28a745',
            confirmButtonText: '<i class="fas fa-check"></i> ¡Genial!',
            showClass: {
              popup: 'animate__animated animate__bounceInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          });
          setFormData({
            name: '',
            species: '',
            breed: '',
            birthDate: '',
            owner: { ownerId: formData.owner.ownerId }
          });
        } else {
          return res.text().then(text => { throw new Error(text); });
        }
      })
      .catch(err => {
        console.error('Error al registrar mascota:', err);
        Swal.fire({
          icon: 'error',
          title: '😿 Error al Registrar',
          html: '<strong>Ocurrió un error al registrar la mascota.</strong>',
          background: '#fff0f0',
          iconColor: '#ef4444',
          confirmButtonColor: '#ef4444',
          confirmButtonText: '<i class="fas fa-times"></i> Cerrar',
          showClass: {
            popup: 'animate__animated animate__shakeX'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOut'
          }
        });
      });
  };

  if (!usuario || loadingOwner) {
    return <p className="text-center mt-5">Cargando datos...</p>;
  }

  if (usuario.role !== 'duenio') {
    return (
      <div className="text-center mt-5">
        <h2>Bienvenido, {usuario.role.charAt(0).toUpperCase() + usuario.role.slice(1)}</h2>
        <p>No tienes acceso a registrar mascotas.</p>
      </div>
    );
  }

  return (
    <div className="petreg-container ">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="petreg-card">
            <div className="petreg-header">
              <h1 className="petreg-title">Registra a tu Mascota</h1>
              <p className="petreg-subtitle">Completa los datos para brindarle el mejor cuidado</p>
            </div>

            <div className="petreg-form-body">
              <form onSubmit={handleSubmit}>
                <div className="text-center">
                  <img
                    src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=612&q=80"
                    alt="Mascota feliz"
                    className="petreg-pet-img"
                  />
                </div>

                <div className="petreg-form-group">
                  <h3 className="petreg-section-title">
                    <i className="fas fa-paw"></i> Información Básica
                  </h3>

                  <div className="form-row">
                    <div className="col-md-6 petreg-form-group">
                      <label className="petreg-label">Nombre de la mascota</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="petreg-input"
                        required
                      />
                    </div>
                    <div className="col-md-6 petreg-form-group">
                      <label className="petreg-label">Especie</label>
                      <select
                        name="species"
                        value={formData.species}
                        onChange={handleChange}
                        className="petreg-input petreg-select"
                        required
                      >
                        <option value="" disabled>Selecciona una especie</option>
                        <option value="perro">Perro</option>
                        <option value="gato">Gato</option>
                        <option value="ave">Ave</option>
                        <option value="conejo">Conejo</option>
                        <option value="otro">Otra</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="col-md-6 petreg-form-group">
                      <label className="petreg-label">Raza</label>
                      <input
                        type="text"
                        name="breed"
                        value={formData.breed}
                        onChange={handleChange}
                        className="petreg-input"
                        required
                      />
                    </div>
                    <div className="col-md-6 petreg-form-group">
                      <label className="petreg-label">Fecha de Nacimiento</label>
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        className="petreg-input"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="petreg-form-group">
                  <h3 className="petreg-section-title">
                    <i className="fas fa-info-circle"></i> Información del Dueño
                  </h3>
                  <p><strong>Registrado por:</strong> {usuario.name} ({usuario.email})</p>
                </div>

                <div className="text-center mt-4">
                  <button
                    type="submit"
                    className="petreg-btn petreg-btn-primary"
                    disabled={!formData.owner.ownerId}
                  >
                    <i className="fas fa-save mr-2"></i> Registrar Mascota
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetForm;
