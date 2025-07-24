import React, { useEffect, useState } from 'react';
import './verMascotas.css';

const PET_API = 'http://localhost:8090/bd_petcare/api/pets';
const OWNER_API = 'http://localhost:8090/bd_petcare/api/owners';

function VerMascotas() {
    const [mascotas, setMascotas] = useState([]);

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem('usuario');
        if (usuarioGuardado) {
            const usuarioParsed = JSON.parse(usuarioGuardado);
            obtenerDueño(usuarioParsed.userId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const obtenerDueño = (userId) => {
        const token = localStorage.getItem('token');
        fetch(`${OWNER_API}/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data && data.user?.userId === userId) {
                    obtenerMascotas(data.ownerId); // ✅ ahora sí pasamos el ownerId correcto
                } else {
                    console.error("No se encontró el dueño con userId:", userId);
                }
            })
            .catch(err => console.error('Error al obtener dueño:', err));
    };

    const obtenerMascotas = (ownerId) => {
        const token = localStorage.getItem('token');
        fetch(`${PET_API}/owner/${ownerId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("No autorizado o error al obtener mascotas");
                return res.json();
            })
            .then(data => {
                setMascotas(data); // ✅ ya no filtramos, la API ya devuelve las mascotas del dueño
            })
            .catch(err => console.error('Error al obtener mascotas:', err));
    };



    const formatearFecha = (fechaISO) => {
        const fecha = new Date(fechaISO);
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // los meses van de 0 a 11
        const anio = String(fecha.getFullYear()).slice(-2); // solo los últimos dos dígitos
        return `${dia}-${mes}-${anio}`;
    };

    const obtenerImagenPorEspecie = (especie) => {
        switch (especie.toLowerCase()) {
            case 'perro':
                return 'https://cdn-icons-png.flaticon.com/512/616/616408.png';
            case 'gato':
                return 'https://cdn-icons-png.flaticon.com/512/616/616430.png';
            case 'ave':
                return 'https://cdn-icons-png.flaticon.com/512/616/616438.png';
            case 'conejo':
                return 'https://cdn-icons-png.flaticon.com/512/802/802338.png';
            case 'otros':
            default:
                return 'https://cdn-icons-png.flaticon.com/512/616/616491.png';
        }
    };

    return (
        <div className="ver-mascotas-container">
            <h2>🐾 Mascotas Registradas</h2>
            <hr />
            {mascotas.length === 0 ? (
                <p>No tienes mascotas registradas.</p>
            ) : (
                <div className="tarjetas-mascotas">
                    {mascotas.map((mascota) => (
                        <div key={mascota.petId} className="tarjeta">
                            <div className="contenido-mascota">
                                <div className="texto-mascota">
                                    <h3>{mascota.name}</h3>
                                    <p><strong>Especie:</strong> {mascota.species}</p>
                                    <p><strong>Raza:</strong> {mascota.breed}</p>
                                    <p><strong>Fecha de nacimiento:</strong> {formatearFecha(mascota.birthDate)}</p>
                                </div>
                                <div className="imagen-mascota">
                                    <img src={obtenerImagenPorEspecie(mascota.species)} alt={mascota.species} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default VerMascotas;