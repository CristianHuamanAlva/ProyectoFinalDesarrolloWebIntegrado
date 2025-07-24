import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function Navbar() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'nav-item nav-link active' : 'nav-item nav-link';
  // Verifica si la ruta está dentro del grupo "Mascotas"
  const isDropdownActive = () => {
    return location.pathname.startsWith("/registrarMascotas") || location.pathname.startsWith("/verMascotas")||
         location.pathname.startsWith("/verCitasDuenio");
  };
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    navigate("/login");
  };

  return (
    <div className="container-fluid p-0">
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-lg-5">
        <a href="/" className="navbar-brand d-block d-lg-none">
          <h1 className="m-0 display-5 text-capitalize font-italic text-white">
            <span className="text-primary">Pet</span>Care
          </h1>
        </a>
        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between px-3" id="navbarCollapse">
          <div className="navbar-nav mr-auto py-0">
            <a href="/" className={isActive("/")}>Inicio</a>
            <a href="/about" className={isActive("/about")}>Acerca de</a>
            <a href="/service" className={isActive("/service")}>Servicios</a>
            <a href="/price" className={isActive("/price")}>Precios</a>
            <a href="/booking" className={isActive("/booking")}>Reservas</a>
            <div className="nav-item dropdown">
              <a
                href="/"
                className={`nav-link dropdown-toggle ${isDropdownActive() ? 'active' : ''}`}
                data-toggle="dropdown"
              >
                Mascotas
              </a>
              <div className="dropdown-menu rounded-0 m-0">
                <a href="/registrarMascotas" className="dropdown-item">Registrar mascotas</a>
                <a href="/verMascotas" className="dropdown-item">Ver mis mascotas</a>
                <a href="/verCitasDuenio" className="dropdown-item">Ver mis citas</a> {/* <-- esta línea nueva */}
              </div>
            </div>


            <a href="/contact" className={isActive("/contact")}>Contacto</a>

          </div>

          {usuario ? (
            <div className="nav-item dropdown">
              <a
                href="/#"
                className="nav-link dropdown-toggle d-flex align-items-center text-white"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i
                  className="bi bi-person-circle"
                  style={{
                    fontSize: '1.6rem',
                    color: '#ED6436', // Naranja
                    marginRight: '10px',
                  }}
                ></i>
                <span style={{ fontFamily: 'Nunito Sans', fontSize: '1 rem' }}>
                  Hola, {usuario.name}
                </span>

              </a>
              <div className="dropdown-menu dropdown-menu-end rounded-0 m-0" aria-labelledby="userDropdown">
                <button onClick={cerrarSesion} className="dropdown-item">
                  Cerrar sesión
                </button>
              </div>
            </div>
          ) : (
            <a href="/login" className="btn btn-lg btn-primary px-3 d-none d-lg-block">
              Iniciar sesión
            </a>
          )}
        </div>

      </nav>
    </div>
  );
}

export default Navbar;