import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');


  const manejarLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8090/bd_petcare/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();  // <-- obten el texto plano
        setMensaje(errorText);  // <-- esto será "Credenciales inválidas"
        return;
      }

      const data = await response.json(); // solo si está OK

      
    console.log("TOKEN:", data.token);

      localStorage.setItem('token', data.token);

      // ahora sí, hacer la segunda petición
      const userRes = await fetch("http://localhost:8090/bd_petcare/api/users/email/" + encodeURIComponent(email), {
        headers: {
          Authorization: `Bearer ${data.token}`
        }
      });

      const usuario = await userRes.json();
      localStorage.setItem('usuario', JSON.stringify(usuario));

      const { role, userId } = usuario;
      let rutaRedireccion = '/';
      if (role === 'asistente') rutaRedireccion = '/registrarMascotas';
      else if (role === 'veterinario') rutaRedireccion = userId === 1 ? '/admin' : '/dashboardVeterinario';

      window.location.replace(rutaRedireccion);
    } catch (error) {
      console.error("Error en login:", error);
      setMensaje("Error al conectar con el servidor.");
    }
  };



  return (
    <div className="loginpet-root">
      <div className="container loginpet-container">
        <div className="row justify-content-center">
          <div className="col-lg-5 pe-lg-4">
            <div className="loginpet-form-container">
              <div className="loginpet-header">
                <img src="https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                  alt="Logo PetCare"
                  className="loginpet-logo" />
                <h4 className="loginpet-text-secondary mb-3">Bienvenido a PetCare</h4>
                <h1 className="loginpet-title"><span className="loginpet-text-primary">Iniciar</span> <span className="loginpet-text-secondary">Sesión</span></h1>
                <p className="loginpet-subtitle">Ingresa para administrar los servicios de tu mascota</p>
              </div>

              <form onSubmit={manejarLogin}>
                <div className="loginpet-form-group">
                  <label className="loginpet-form-label">Correo Electrónico</label>
                  <div className="loginpet-input-group">
                    <i className="fas fa-envelope loginpet-input-icon"></i>
                    <input
                      type="email"
                      className="loginpet-form-control"
                      placeholder="ejemplo@petcare.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="loginpet-form-group">
                  <label className="loginpet-form-label">Contraseña</label>
                  <div className="loginpet-input-group">
                    <i className="fas fa-lock loginpet-input-icon"></i>
                    <input
                      type="password"
                      className="loginpet-form-control"
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {mensaje && <div className="alert alert-danger mt-2">{mensaje}</div>}

                <button type="submit" className="loginpet-btn loginpet-btn-primary mb-3">
                  <i className="fas fa-sign-in-alt me-2"></i> Iniciar Sesión
                </button>

                <div className="loginpet-divider">o</div>

                <div className="text-center">
                  <p className="loginpet-text-muted">¿Primera vez en PetCare? <a href="/registro" className="loginpet-link">Crear cuenta</a></p>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-7 d-none d-lg-block ps-lg-4">
            <div className="loginpet-image-container">
              <img src="https://images.unsplash.com/photo-1422565096762-bdb997a56a84?fm=jpg&q=60&w=3000"
                alt="Perro feliz recibiendo cuidados"
                className="loginpet-featured-image" />
              <div className="loginpet-image-caption">
                <i className="fas fa-paw me-2"></i> Cuidado profesional para tu mejor amigo
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
