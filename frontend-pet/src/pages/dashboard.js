import React, { useCallback, useEffect, useState } from 'react';
import UserTable from '../componentes/UserTable';
import OwnerTable from '../componentes/OwnerTable';
import PetTable from '../componentes/PetTable';
import VeterinarioTable from '../componentes/VeterinarioTable';
import AppointmentTable from '../componentes/AppointmentTable';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import {
  FaUser, FaPaw, FaUsersCog, FaSignOutAlt, FaSearch,
  FaUserMd, FaUserNurse
} from 'react-icons/fa';
import RegistroVeterinario from './registroVeterinario';
import RegistroAsistente from './registroAsistente';
import RegistroServicio from './registroServicio';
import ServiceTable from '../componentes/serviceTable';
import AssistantTable from '../componentes/AssistantTable';

import Swal from 'sweetalert2';

const USER_API = 'http://localhost:8090/bd_petcare/api/users';
const OWNER_API = 'http://localhost:8090/bd_petcare/api/owners';
const PET_API = 'http://localhost:8090/bd_petcare/api/pets';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [owners, setOwners] = useState([]);
  const [pets, setPets] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [section, setSection] = useState('r_vets');
  const [showActions, setShowActions] = useState(false);
  const [availableSpecies, setAvailableSpecies] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('duenio');
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);
  const [highlightedUserId, setHighlightedUserId] = useState(null);
  const [highlightedOwnerId, setHighlightedOwnerId] = useState(null);
  const [highlightedPetsByOwnerId, setHighlightedPetsByOwnerId] = useState(null);
  const [veterinariosData, setVeterinariosData] = useState([]);
  //wa
  const [assistants, setAssistants] = useState([]);

  const navigate = useNavigate();

  const fetchAll = useCallback(() => {
    fetchUsers();
    fetchOwners();
    fetchPets();
    fetchAppointments();
    fetchServices();
    fetchVeterinarios();
    fetchAssistants();
  }, []);

  const generateColorFromId = (id) => {
    const colors = ['#d2e0fb', '#fce38a', '#c2f5b3', '#ffcccb', '#c0fdfb', '#ffc6ff', '#ffd580'];
    return colors[id % colors.length]; // Usa el módulo para variar entre colores
  };

  const userColorMap = {};
  users.forEach(user => {
    userColorMap[user.userId] = generateColorFromId(user.userId);
  });

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    } else {
      navigate("/login");
    }
    fetchAll();
  }, [fetchAll, navigate]);

  useEffect(() => {
    if (['users', 'owners', 'pets'].includes(section)) {
      setInputValue('');
      setSearchTerm('');
      // Filtro por rol/especie también se reinicia
      if (section === 'users') {
        setSelectedRole('duenio');
      } else if (section === 'pets') {
        setSelectedRole('');
      } else {
        setSelectedRole('');
      }
    }
  }, [section]);

  const handleNavigateFromUser = (user) => {
    const owner = owners.find(o => o.user?.userId === user.userId);
    const userPets = pets.filter(p => p.owner?.user?.userId === user.userId);

    if (!owner && userPets.length === 0) {
      Swal.fire('Sin datos', 'Este usuario no tiene dueño ni mascotas registradas.', 'info');
      return;
    }

    Swal.fire({
      title: '¿Qué deseas ver?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Ver dueño',
      denyButtonText: 'Ver mascotas',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {

      if (result.isConfirmed && owner) {
        setHighlightedUserId(user.userId);
        setHighlightedOwnerId(owner.ownerId);
        if (owner?.ownerId) setHighlightedPetsByOwnerId(owner.ownerId);
        setSection('owners');
      } else if (result.isDenied && userPets.length > 0) {
        setHighlightedUserId(user.userId);
        if (owner?.ownerId) setHighlightedPetsByOwnerId(owner.ownerId);
        setHighlightedOwnerId(owner.ownerId);
        setSection('pets');
      } else if (result.dismiss !== Swal.DismissReason.cancel) {
        Swal.fire('Sin datos', 'No hay información disponible.', 'info');
      } else {
        Swal.fire('Acción cancelada', 'No se ha realizado ninguna acción', 'info');
      }
    });
  };

  const fetchUsers = () => {
    const token = localStorage.getItem('token');
    fetch(`${USER_API}/all`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setVeterinarios(data.filter(user => user.role === 'veterinario'));
      })
      .catch(err => console.error('Error cargando usuarios:', err));
  };


  const fetchOwners = () => {
    const token = localStorage.getItem('token');
    fetch(`${OWNER_API}/all`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(setOwners)
      .catch(err => console.error('Error cargando dueños:', err));
  };

  const fetchPets = () => {
    const token = localStorage.getItem('token');
    fetch(`${PET_API}/all`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setPets(data);
        const especiesUnicas = Array.from(new Set(data.map(pet => pet.species?.toLowerCase())));
        setAvailableSpecies(especiesUnicas);
      })
      .catch(err => console.error('Error cargando mascotas:', err));
  };

  const fetchAppointments = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8090/bd_petcare/api/appointments/all', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(setAppointments)
      .catch(err => console.error('Error cargando citas:', err));
  };

  const fetchServices = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8090/bd_petcare/api/services/all', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(setServices)
      .catch(err => console.error('Error cargando servicios:', err));
  };

  const fetchAssistants = () => {
    const token = localStorage.getItem('token');
    fetch("http://localhost:8090/bd_petcare/api/assistants/all", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(setAssistants)
      .catch(err => console.error('Error cargando asistentes:', err));
  };


  const handleUserDelete = (id) => {
    const token = localStorage.getItem('token');
    fetch(`${USER_API}/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(fetchAll)
      .catch(err => console.error('Error al eliminar usuario:', err));
  };


  const handleUserUpdate = (user) => {
    const token = localStorage.getItem('token');
    console.log("Enviando usuario actualizado:", user);

    fetch(`${USER_API}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
      })
      .then(savedUser => {
        fetchUsers();
        fetchVeterinarios();
        fetchOwners();
        fetchAssistants();

        // 🔄 Crear dueño si el rol es "duenio" y aún no tiene uno
        const yaEsDuenio = owners.some(o => o.user?.userId === savedUser.userId);
        if (savedUser.role === "duenio" && !yaEsDuenio) {
          fetch(`${OWNER_API}/save`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              ownerId: 0,
              phone: "",
              address: "",
              user: { userId: savedUser.userId }
            })
          })
            .then(() => {
              fetchOwners(); // Recargar lista
              Swal.fire('Dueño creado', 'El usuario ahora tiene un ownerId.', 'success');
            })
            .catch(err => {
              console.error('Error al crear dueño:', err);
              Swal.fire('Error', 'No se pudo crear el dueño.', 'error');
            });
        } else {
          Swal.fire('Usuario actualizado', 'El usuario ha sido modificado correctamente.', 'success');
        }
      })
      .catch(err => {
        console.error('Error al actualizar usuario:', err);
        Swal.fire('Error', 'No se pudo actualizar el usuario. Intenta nuevamente.', 'error');
      });
  };


  const handleOwnerUpdate = (owner) => {
    const token = localStorage.getItem('token');
    fetch(`${OWNER_API}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // agregar autorización
      },
      body: JSON.stringify(owner)
    })
      .then(fetchOwners)
      .catch(err => console.error('Error al actualizar dueño:', err));
  };

  const handleOwnerCreate = (owner) => {
    const token = localStorage.getItem('token');
    fetch(`${OWNER_API}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(owner)
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(() => {
        fetchOwners();  // recarga dueños
      })
      .catch(err => {
        console.error('Error al crear dueño:', err);
        Swal.fire('Error', 'No se pudo crear el dueño.', 'error');
      });
  };


  const handlePetDelete = (id) => {
    fetch(`${PET_API}/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(fetchPets)
      .catch(err => console.error('Error al eliminar mascota:', err));
  };

  const handlePetUpdate = (pet) => {
    const token = localStorage.getItem('token');
    fetch(`${PET_API}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // ✅ agrega el token aquí
      },
      body: JSON.stringify(pet)
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(fetchPets)
      .catch(err => {
        console.error('Error al actualizar mascota:', err);
        Swal.fire('Error', 'No se pudo guardar la mascota.', 'error');
      });
  };


  const handleServiceUpdate = (service) => {
    fetch('http://localhost:8090/bd_petcare/api/services/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // ✅ agrega token
      },
      body: JSON.stringify(service)
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
      })
      .then(() => fetchServices())
      .catch(err => {
        console.error('Error al actualizar servicio:', err);
        Swal.fire('Error', 'No se pudo actualizar el servicio.', 'error');
      });
  };

  const handleServiceDelete = (id) => {
    fetch(`http://localhost:8090/bd_petcare/api/services/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` // ✅ agrega token
      }
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
      })
      .then(() => fetchServices())
      .catch(err => {
        console.error('Error al eliminar servicio:', err);
        Swal.fire('Error', 'No se pudo eliminar el servicio.', 'error');
      });
  };


  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    navigate("/login");
  };


  const filterUsers = (data) => {
    return data.filter(item => {
      const matchSearch =
        !searchTerm ||
        (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.role && item.role.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchRole = !selectedRole || (item.role && item.role === selectedRole);
      return matchSearch && matchRole;
    });
  };

  const filterOwners = (data) => {
    return data.filter(item => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (item.phone && item.phone.includes(term)) || (item.address && item.address.toLowerCase().includes(term));
    });
  };

  // Para mascotas, filtro más completo (nombre, fecha, raza) + filtro especie (selectedRole aquí será especie)
  const filterPets = (data) => {
    return data.filter(item => {
      const matchSearch =
        !searchTerm ||
        (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.birthDate && item.birthDate.includes(searchTerm)) ||
        (item.breed && item.breed.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchSpecies = !selectedRole || (item.species && item.species === selectedRole);

      return matchSearch && matchSpecies;
    });
  };

  const handleSearchClick = () => {
    setSearchTerm(inputValue.trim());
  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };
  const handleNavigateFromOwner = (ownerId) => {
    const owner = owners.find(o => o.ownerId === ownerId);
    const mascotasDelDuenio = pets.filter(p => p.owner?.ownerId === ownerId);

    if (!mascotasDelDuenio.length) {
      Swal.fire('Sin mascotas', 'Este dueño no tiene mascotas registradas.', 'info');
      return;
    }

    setHighlightedPetsByOwnerId(ownerId);
    if (owner?.user?.userId) setHighlightedUserId(owner.user.userId);
    setHighlightedOwnerId(ownerId);
    setSection('pets');
  };

  const fetchVeterinarios = () => {
    const token = localStorage.getItem('token');
    fetch("http://localhost:8090/bd_petcare/api/veterinarians/all", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setVeterinariosData(data); // ← guardas la respuesta
      })
      .catch(error => {
        console.error("Error cargando veterinarios:", error);
      });
  };


  const handleVeterinarioSave = (vet) => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8090/bd_petcare/api/veterinarians/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(vet)
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(fetchVeterinarios)
      .catch(err => console.error('Error al guardar veterinario:', err));
  };

  const handleAssistantSave = (assistant) => {
    const token = localStorage.getItem('token');
    fetch("http://localhost:8090/bd_petcare/api/assistants/save", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(assistant)
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(fetchAssistants)
      .catch(err => {
        console.error("Error al guardar asistente:", err);
        Swal.fire('Error', 'No se pudo guardar el asistente.', 'error');
      });
  };



  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1><FaUsersCog /> PetCare / Panel de Control</h1>
        <div className="user-info">
          <FaUser />
          <span>Hola, {usuario?.name}</span>
          <div className="acciones-wrapper">
            <button onClick={() => setShowActions(prev => !prev)}>
              <FaSignOutAlt /> Acciones
            </button>
            {showActions && (
              <div className="acciones-menu">
                <button onClick={() => navigate("/")}>Inicio</button>
                <button onClick={cerrarSesion}>Cerrar sesión</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="dashboard-body">
        <aside className="sidebar">
          <button className={section === 'r_vets' ? 'active' : ''} onClick={() => setSection('r_vets')}>
            <FaUserMd /> Registrar Veterinarios
          </button>
          <button className={section === 'r_asists' ? 'active' : ''} onClick={() => setSection('r_asists')}>
            <FaUserNurse /> Registrar Asistentes
          </button>
          <button className={section === 'r_services' ? 'active' : ''} onClick={() => setSection('r_services')}>
            <FaUsersCog /> Registrar Servicios
          </button>
          <button className={section === 'users' ? 'active' : ''} onClick={() => setSection('users')}>
            <FaUsersCog /> Usuarios
          </button>
          <button className={section === 'owners' ? 'active' : ''} onClick={() => setSection('owners')}>
            <FaUser /> Dueños
          </button>
          <button className={section === 'veterinarios' ? 'active' : ''} onClick={() => setSection('veterinarios')}>
            <FaUserMd /> Veterinarios
          </button>
          <button className={section === 'assistants' ? 'active' : ''} onClick={() => setSection('assistants')}>
            <FaUserNurse /> Asistentes
          </button>
          <button className={section === 'pets' ? 'active' : ''} onClick={() => setSection('pets')}>
            <FaPaw /> Mascotas
          </button>
          <button className={section === 'services' ? 'active' : ''} onClick={() => setSection('services')}>
            <FaUsersCog /> Servicios
          </button>
          <button className={section === 'appointments' ? 'active' : ''} onClick={() => setSection('appointments')}>
            <FaUsersCog /> Citas
          </button>

        </aside>

        <main className="dashboard-content">
          {(highlightedUserId || highlightedOwnerId || highlightedPetsByOwnerId) && (
            <button
              className="floating-clear-button"
              onClick={() => {
                setHighlightedUserId(null);
                setHighlightedOwnerId(null);
                setHighlightedPetsByOwnerId(null);
              }}
            >
              ❌ Quitar resaltado
            </button>
          )}
          <div className="search-wrapper">
            {/* Mostrar buscador sólo en secciones users, owners y pets */}
            {(section === 'users' || section === 'owners' || section === 'pets' || section === 'services') && (
              <>
                <button className="search-btn" onClick={handleSearchClick} aria-label="Buscar">
                  <FaSearch />
                </button>

                {/* Cambiar placeholder según sección */}
                <input
                  type="text"
                  placeholder={
                    section === 'owners'
                      ? "Ingresa el teléfono o dirección"
                      : section === 'pets'
                        ? "Buscar por nombre, fecha o raza"
                        : section === 'services'
                          ? "Buscar por nombre del servicio"
                          : "Buscar por nombre, email o rol"
                  }

                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleEnterKey}
                  className="search-input"
                />

                {/* Filtros condicionales */}
                {section === 'users' && (
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="role-filter"
                  >
                    <option value="">Todos los roles</option>
                    <option value="duenio">Dueño</option>
                    <option value="asistente">Asistente</option>
                    <option value="veterinario">Veterinario</option>
                  </select>
                )}

                {section === 'pets' && (
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="role-filter"
                  >
                    <option value="">Todas las especies</option>
                    {availableSpecies.map(species => (
                      <option key={species} value={species}>
                        {species.charAt(0).toUpperCase() + species.slice(1)}
                      </option>
                    ))}
                  </select>
                )}


              </>
            )}
          </div>

          {section === 'users' && (
            <>
              <h2>Gestión de Usuarios</h2>
              <UserTable
                users={filterUsers(users)}
                onDelete={handleUserDelete}
                onUpdate={handleUserUpdate}
                owners={owners}
                pets={pets}
                onNavigate={handleNavigateFromUser} // 👈 nuevo
                highlightedUserId={highlightedUserId} // ✅ nuevo
                userColorMap={userColorMap}
              />
            </>
          )}

          {section === 'r_vets' && usuario?.role === 'veterinario' && (
            <RegistroVeterinario onUserCreated={fetchUsers} />
          )}
          {section === 'r_asists' && usuario?.role === 'veterinario' && (
            <RegistroAsistente onUserCreated={fetchUsers} />
          )}
          {section === 'r_services' && usuario?.role === 'veterinario' && (
            <RegistroServicio onServiceCreated={fetchServices} />
          )}


          {section === 'owners' && (
            <>
              <h2>Gestión de Dueños</h2>
              <OwnerTable
                owners={filterOwners(owners)}  // dueños filtrados según búsqueda
                users={users}                 // lista completa de usuarios para detectar dueños sin registro
                onUpdate={handleOwnerUpdate}
                onCreate={handleOwnerCreate}
                highlightedOwnerId={highlightedOwnerId}
                onNavigateToPets={handleNavigateFromOwner}
                userColorMap={userColorMap}
              />

            </>
          )}

          {section === 'pets' && (
            <>
              <h2>Gestión de Mascotas</h2>
              <PetTable
                pets={filterPets(pets)}
                onUpdate={handlePetUpdate}
                onDelete={handlePetDelete}
                highlightedPetsByOwnerId={highlightedPetsByOwnerId} // 👈 nuevo
                userColorMap={userColorMap}
              />
            </>
          )}
          {section === 'appointments' && usuario?.role === 'veterinario' && (
            <>
              <h2>Gestión de Citas</h2>
              <AppointmentTable
                appointments={appointments}
                veterinarios={veterinarios}
                servicios={services}
              />
            </>
          )}
          {section === 'services' && (
            <>
              <h2>Gestión de Servicios</h2>
              <ServiceTable
                services={services.filter(service =>
                  service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
                )}
                usuario={usuario}
                onUpdate={handleServiceUpdate}
                onDelete={handleServiceDelete}
              />
            </>
          )}
          {section === 'veterinarios' && (
            <>
              <h2>Gestión de Veterinarios</h2>
              <VeterinarioTable
                veterinarios={veterinariosData}
                users={users}
                onSave={handleVeterinarioSave}
                usuario={usuario}
              />
            </>
          )}
          {section === 'assistants' && (
            <>
              <h2>Gestión de Asistentes</h2>
              <AssistantTable
                assistants={assistants}
                users={users}
                onSave={handleAssistantSave}
                usuario={usuario}
              />
            </>
          )}


        </main>
      </div>
    </div>
  );
}

export default Dashboard;
