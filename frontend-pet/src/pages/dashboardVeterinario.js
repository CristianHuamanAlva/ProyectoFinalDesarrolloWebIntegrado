import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboardVeterinario.css';
import {
    FaUser, FaPaw, FaUsersCog, FaSignOutAlt, FaSearch
} from 'react-icons/fa';
import VerCitas from './verCitas';

function DashboardVeterinario() {
    const [usuario, setUsuario] = useState(null);
    const [section, setSection] = useState('appointments');
    const [showActions, setShowActions] = useState(false);
    const [opcionesEstado, setOpcionesEstado] = useState([]);

    const [filtros, setFiltros] = useState({
        appointments: { input: '', search: '', orden: '', filtro: '', fechaInicio: '', fechaFin: '' },
        completed_appointments: { input: '', search: '', fechaInicio: '', fechaFin: '' }
    });

    const navigate = useNavigate();

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem('usuario');
        if (usuarioGuardado) {
            setUsuario(JSON.parse(usuarioGuardado));
        } else {
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchEstados = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch('http://localhost:8090/bd_petcare/api/appointments/all', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const citas = await res.json();
                const estadosUnicos = [...new Set(citas.map(c => c.status))];
                setOpcionesEstado(estadosUnicos);
            } catch (err) {
                console.error('Error al cargar estados únicos:', err);
            }
        };

        fetchEstados();
    }, []);


    const cerrarSesion = () => {
        localStorage.removeItem('usuario');
        navigate("/login");
    };

    const handleSearchClick = () => {
        setFiltros(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                search: prev[section].input.trim()
            }
        }));
    };

    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setFiltros(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                input: value
            }
        }));
    };

    const handleOrdenChange = (e) => {
        const value = e.target.value;
        setFiltros(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                orden: value
            }
        }));
    };

    const handleFiltroEstadoChange = (e) => {
        const value = e.target.value;
        setFiltros(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                filtro: value
            }
        }));
    };

    const valores = filtros[section];

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1><FaUsersCog /> PetCare / Panel de Control Veterinario</h1>
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
                    <button className={section === 'appointments' ? 'active' : ''} onClick={() => setSection('appointments')}>
                        <FaPaw /> Mis Citas
                    </button>
                    <button className={section === 'completed_appointments' ? 'active' : ''} onClick={() => setSection('completed_appointments')}>
                        <FaPaw /> Citas Completadas
                    </button>
                </aside>

                <main className="dashboard-content">
                    <div className="search-wrapper">
                        {(section === 'appointments' || section === 'completed_appointments') && (
                            <>
                                <button className="search-btn" onClick={handleSearchClick} aria-label="Buscar">
                                    <FaSearch />
                                </button>

                                <input
                                    type="text"
                                    placeholder="Buscar por mascota, servicio, motivo, dueño, estado o fecha..."

                                    value={valores.input}
                                    onChange={handleInputChange}
                                    onKeyDown={handleEnterKey}
                                    className="search-input"
                                />

                                {section === 'appointments' && (
                                    <>
                                        <select
                                            value={valores.orden}
                                            onChange={handleOrdenChange}
                                            className="role-filter"
                                        >
                                            <option value="">Ordenar por defecto</option>
                                            <option value="asc">Estado ascendente</option>
                                            <option value="desc">Estado descendente</option>
                                        </select>

                                        <select
                                            value={valores.filtro}
                                            onChange={handleFiltroEstadoChange}
                                            className="role-filter"
                                        >
                                            <option value="">Mostrar todos</option>
                                            {opcionesEstado.map((estado, index) => (
                                                <option key={index} value={estado}>
                                                    {estado.charAt(0).toUpperCase() + estado.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </>
                                )}
                            </>
                        )}
                    </div>

                    {section === 'appointments' && (
                        <VerCitas
                            busqueda={valores.search}
                            classNameExtra="dashboard-vet-citas"
                            ocultarBuscador={true}
                            ordenEstado={valores.orden}
                            filtroEstado={valores.filtro}
                        />
                    )}

                    {section === 'completed_appointments' && (
                        <VerCitas
                            soloCompletadas
                            busqueda={valores.search}
                            classNameExtra="dashboard-vet-citas"
                            ocultarBuscador={true}
                            ordenEstado={valores.orden}
                            filtroEstado={valores.filtro}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}

export default DashboardVeterinario;
