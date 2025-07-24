import React, { useEffect, useState } from 'react';
/*import { useLocation } from 'react-router-dom';*/
import './verCitas.css';
import Swal from 'sweetalert2';

const MEDICAL_RECORD_API = 'http://localhost:8090/bd_petcare/api/medical-records';
const APPOINTMENTS_API = 'http://localhost:8090/bd_petcare/api/appointments/all';
const SAVE_APPOINTMENT_API = 'http://localhost:8090/bd_petcare/api/appointments/save';

function VerCitas({
    soloCompletadas = false,
    busqueda = '',
    classNameExtra = '',
    ordenEstado = '',
    filtroEstado = ''
}) {

    const [citas, setCitas] = useState([]);
    const [filtro] = useState('');
    const [modoEdicion, setModoEdicion] = useState({});
    const [usuario, setUsuario] = useState(null);
    /*const location = useLocation();*/
    /*const isDuenio = location.pathname === '/verCitasDuenio';*/

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('usuario'));
        if (!stored) return;
        setUsuario(stored);

        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const resCitas = await fetch(APPOINTMENTS_API, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const allCitas = await resCitas.json();

                let filtroCitas = [];

                if (stored.role === 'duenio') {
                    const resHistorial = await fetch(`${MEDICAL_RECORD_API}/all`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    const historiales = await resHistorial.json();

                    const propias = historiales.filter(
                        h => h.pet?.owner?.user?.userId === stored.userId
                    );
                    const idsHistorial = propias.map(h => h.medicalRecordId);

                    filtroCitas = allCitas.filter(c =>
                        idsHistorial.includes(c.medicalRecord?.medicalRecordId)
                    );
                } else if (stored.role === 'veterinario') {
                    filtroCitas = allCitas.filter(c =>
                        c.veterinarian?.user?.userId === stored.userId
                    );
                } else if (stored.role === 'asistente') {
                    filtroCitas = allCitas;
                }

                const citasClonadas = filtroCitas.map(c => ({
                    ...c,
                    diagnosis: c.diagnosis || 'Por conocer',
                    treatment: c.treatment || 'Por conocer'
                }));

                citasClonadas.sort((a, b) => new Date(b.date) - new Date(a.date));
                setCitas(citasClonadas);
            } catch (error) {
                console.error('❌ Error al cargar citas:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e, citaId) => {
        const { name, value } = e.target;
        setModoEdicion(prev => ({
            ...prev,
            [citaId]: {
                ...prev[citaId],
                [name]: value
            }
        }));
    };

    const habilitarEdicion = (cita) => {
        if (cita.status !== 'completada') {
            setModoEdicion(prev => ({
                ...prev,
                [cita.dateId]: {
                    status: cita.status,
                    diagnosis: cita.diagnosis || '',
                    treatment: cita.treatment || ''
                }
            }));
        }
    };

    const guardarCambios = async (cita) => {
        const cambios = modoEdicion[cita.dateId];

        const citaActualizada = {
            ...cita,
            status: cambios.status,
            diagnosis: cambios.diagnosis,
            treatment: cambios.treatment
        };

        try {
            const token = localStorage.getItem('token'); // ✅ AÑADIR AQUÍ
            const response = await fetch(SAVE_APPOINTMENT_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(citaActualizada)
            });

            if (!response.ok) throw new Error(await response.text());

            await Swal.fire({
                title: 'Cita actualizada',
                text: '✅ Los cambios fueron guardados correctamente',
                imageUrl: 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
                imageWidth: 150,
                imageHeight: 150,
                imageAlt: 'Gatito feliz',
                confirmButtonColor: '#28a745'
            });

            setCitas(prev =>
                prev.map(c => c.dateId === cita.dateId ? citaActualizada : c)
            );
            setModoEdicion(prev => {
                const copy = { ...prev };
                delete copy[cita.dateId];
                return copy;
            });
        } catch (err) {
            console.error('❌ Error al actualizar cita:', err.message);
            await Swal.fire({
                icon: 'error',
                title: 'Error al guardar',
                text: `❌ Hubo un error: ${err.message}`,
                confirmButtonColor: '#e74c3c'
            });
        }
    };


    const cancelarEdicion = (citaId) => {
        setModoEdicion(prev => {
            const copy = { ...prev };
            delete copy[citaId];
            return copy;
        });
    };


    const citasFiltradas = citas.filter(cita => {
        const campos = {
            mascota: cita.medicalRecord?.pet?.name || '',
            servicio: cita.serv?.serviceName || '',
            motivo: cita.cause || '',
            dueño: cita.medicalRecord?.pet?.owner?.user?.name || '',
            fecha: new Date(cita.date).toLocaleString(),
            estado: cita.status || '',
            diagnostico: cita.diagnosis || '',
            tratamiento: cita.treatment || ''
        };



        const normalizar = (texto) =>
            texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        const texto = normalizar(Object.values(campos).join(' '));
        const coincideTexto = texto.includes(normalizar(busqueda || filtro));
        const coincideEstado = soloCompletadas ? cita.status === 'completada' : true;
        const coincideEstadoFiltro = filtroEstado ? cita.status === filtroEstado : true;

        return coincideTexto && coincideEstado && coincideEstadoFiltro;

    });

    if (ordenEstado) {
        const ordenPersonalizado = ['completada', 'programada', 'cancelada'];

        citasFiltradas.sort((a, b) => {
            const indexA = ordenPersonalizado.indexOf(a.status);
            const indexB = ordenPersonalizado.indexOf(b.status);

            if (ordenEstado === 'asc') {
                return indexA - indexB;
            } else {
                return indexB - indexA;
            }
        });
    }


    return (
        /*<div className={`dashboard-vet-citas ${isDuenio ? 'contenedor-citas' : ''} ${classNameExtra}`}>*/

        <div className={`dashboard-vet-citas ${classNameExtra}`}>

            <h2>
                {usuario?.role === 'veterinario'
                    ? (soloCompletadas ? '✅ Citas completadas' : '📋 Citas por atender')
                    : '📋 Mis Citas'}
            </h2>

            <div className="citas-grid">
                {citasFiltradas.map((cita, index) => {
                    const editando = modoEdicion[cita.dateId];
                    const nombreVeterinario = cita.veterinarian?.user?.name || 'N/A';
                    const nombreDuenio = cita.medicalRecord?.pet?.owner?.user?.name || 'N/A';

                    return (
                        <div className="card-cita" key={index}>
                            <h3>{cita.medicalRecord?.pet?.name}</h3>
                            <div className="card-cita-body">
                                <p><strong>🛎️ Servicio:</strong> {cita.serv?.serviceName}</p>
                                <p><strong>🐶 Mascota:</strong> {cita.medicalRecord?.pet?.name}</p>
                                <p><strong>💰 Costo:</strong> S/ {cita.cost.toFixed(2)}</p>

                                {usuario?.role === 'veterinario' ? (
                                    <p><strong>🧑‍💼 Dueño:</strong> {nombreDuenio}</p>
                                ) : (
                                    <p><strong>🧑‍⚕️ Veterinario:</strong> {nombreVeterinario}</p>
                                )}

                                <p><strong>🩺 Especialidad:</strong> {cita.veterinarian?.specialty}</p>
                                <p><strong>📅 Fecha y hora:</strong> {new Date(cita.date).toLocaleString()}</p>
                                <p><strong>📝 Motivo:</strong> {cita.cause}</p>

                                {usuario?.role === 'veterinario' && editando ? (
                                    <>
                                        <label><strong>Estado:</strong></label>
                                        <select name="status" value={editando.status} onChange={(e) => handleChange(e, cita.dateId)}>
                                            <option value="programada">Programada</option>
                                            <option value="completada">Completada</option>
                                            <option value="cancelada">Cancelada</option>
                                        </select>

                                        <label><strong>Diagnóstico:</strong></label>
                                        <textarea name="diagnosis" value={editando.diagnosis} onChange={(e) => handleChange(e, cita.dateId)} />

                                        <label><strong>Tratamiento:</strong></label>
                                        <textarea name="treatment" value={editando.treatment} onChange={(e) => handleChange(e, cita.dateId)} />

                                        <div className="acciones-edicion">
                                            <button onClick={() => guardarCambios(cita)}>💾 Guardar</button>
                                            <button className="btn-cancelar" onClick={() => cancelarEdicion(cita.dateId)}>❌ Cancelar</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p><strong>Estado:</strong> <span className={`estado ${cita.status}`}>{cita.status}</span></p>
                                        <p><strong>Diagnóstico:</strong> {cita.diagnosis}</p>
                                        <p><strong>Tratamiento:</strong> {cita.treatment}</p>

                                        {usuario?.role === 'veterinario' && cita.status !== 'completada' && (
                                            <button onClick={() => habilitarEdicion(cita)}>✏️ Editar</button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default VerCitas;