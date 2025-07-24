// AccesoDenegado.jsx o dentro de App.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AccesoDenegado() {
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {

            localStorage.removeItem('usuario');
            navigate('/'); // Redirige a la página principal
        }, 4000); // Espera 4 segundos

        return () => clearTimeout(timeout);
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '80px', padding: '20px' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#b80000' }}>⛔ ACCESO DENEGADO</h1>
            <p style={{ fontSize: '18px' }}>No tienes autorización para acceder a esta sección.</p>
            <p style={{ color: 'gray' }}>Serás redirigido al inicio en breve... 🚨</p>
        </div>
    );
}
export default AccesoDenegado