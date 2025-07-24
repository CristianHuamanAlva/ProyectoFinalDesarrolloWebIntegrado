import React, { useState } from 'react';

const colaboradores = [
  {
    nombre: 'Dave Silva Alva',
    rol: 'Colaborador',
    imagen: 'img/img-perfil.webp',
  },
  {
    nombre: 'Cristian Enrique',
    rol: 'Colaborador',
    imagen: 'img/img-perfil.webp',
  },
  {
    nombre: 'Luis Flores',
    rol: 'Colaborador',
    imagen: 'img/img-perfil.webp',
  },
  {
    nombre: 'Naomi Gonzales',
    rol: 'Colaborador',
    imagen: 'img/img-perfil.webp',
  },
  {
    nombre: 'Franco Mata',
    rol: 'Colaborador',
    imagen: 'img/img-perfil.webp',
  },
  {
    nombre: 'Martin Cuadros',
    rol: 'Colaborador',
    imagen: 'img/img-perfil.webp',
  },
];

function Colaboradores() {
  const [verMas, setVerMas] = useState(false);

  const colaboradoresVisibles = verMas ? colaboradores : colaboradores.slice(0, 3);

  return (
    <div className="container mt-5 mb-5 pt-5 pb-3">
      <div className="d-flex flex-column text-center mb-5">
        <h4 className="text-secondary mb-3">Miembros del equipo</h4>
        <h1 className="display-4 m-0">
          Conoce a nuestro <span className="text-primary">Equipo</span>
        </h1>
      </div>
      <div className="row">
        {colaboradoresVisibles.map((colaborador, index) => (
          <div className="col-lg-4 col-md-6" key={index}>
            <div className="team card position-relative overflow-hidden border-0 mb-4">
              <img className="card-img-top" src={colaborador.imagen} alt={colaborador.nombre} />
              <div className="card-body text-center p-0">
                <div className="team-text d-flex flex-column justify-content-center bg-light">
                  <h5>{colaborador.nombre}</h5>
                  <i>{colaborador.rol}</i>
                </div>
                <div className="team-social d-flex align-items-center justify-content-center bg-dark">
                  <a className="btn btn-outline-primary rounded-circle text-center mr-2 px-0" href="/" style={{ width: '36px', height: '36px' }}>
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="btn btn-outline-primary rounded-circle text-center mr-2 px-0" href="/" style={{ width: '36px', height: '36px' }}>
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="btn btn-outline-primary rounded-circle text-center mr-2 px-0" href="/" style={{ width: '36px', height: '36px' }}>
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a className="btn btn-outline-primary rounded-circle text-center px-0" href="/" style={{ width: '36px', height: '36px' }}>
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-3">
        <button
          className="btn btn-primary"
          onClick={() => setVerMas(!verMas)}
        >
          {verMas ? 'Ver menos' : 'Ver más'}
        </button>
      </div>
    </div>
  );
}

export default Colaboradores;
