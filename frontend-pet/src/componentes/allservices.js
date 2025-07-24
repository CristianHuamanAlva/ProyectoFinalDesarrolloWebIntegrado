import React, { useState } from 'react';

const serviciosBase = [
  {
    icon: 'flaticon-house',
    titulo: 'Hospedaje para Mascotas',
    descripcion: 'Ofrecemos cuidado profesional y seguro para tu mascota mientras estás fuera.',
  },
  {
    icon: 'flaticon-food',
    titulo: 'Alimentación para Mascotas',
    descripcion: 'Proporcionamos planes de alimentación personalizados para mantener a tu mascota saludable.',
  },
  {
    icon: 'flaticon-cat',
    titulo: 'Entrenamiento para Mascotas',
    descripcion: 'Programas personalizados para mejorar la conducta y habilidades de tu mascota.',
  },
];

const serviciosExtra = [
  {
    icon: 'flaticon-dog',
    titulo: 'Aseo y Peluquería',
    descripcion: 'Cuidado estético y de higiene para que tu mascota luzca siempre impecable.',
  },
  {
    icon: 'flaticon-doctor',
    titulo: 'Atención Médica',
    descripcion: 'Veterinarios disponibles para chequeos, vacunas y atención de emergencias.',
  },
  {
    icon: 'flaticon-care',
    titulo: 'Guardería Diurna',
    descripcion: 'Espacio seguro y divertido para que tu mascota no esté sola durante el día.',
  },
];

function Allservices() {
  const [mostrarExtras, setMostrarExtras] = useState(false);

  const servicios = mostrarExtras ? [...serviciosBase, ...serviciosExtra] : serviciosBase;

  return (
    <div className="container-fluid bg-light">
      <div className="container py-5">
        <div className="d-flex flex-column text-center mb-5">
          <h4 className="text-secondary mb-3">Nuestros Servicios</h4>
          <h1 className="display-4 m-0">
            <span className="text-primary">Servicios</span> Premium para Mascotas
          </h1>
        </div>
        <div className="row pb-3">
          {servicios.map((servicio, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div className="d-flex flex-column text-center bg-white mb-2 p-3 p-sm-5">
                <div
                  className={`${servicio.icon} display-3 font-weight-normal text-secondary mb-3`}
                  aria-hidden="true"
                ></div>
                <h3 className="mb-3">{servicio.titulo}</h3>
                <p>{servicio.descripcion}</p>
                <a className="text-uppercase font-weight-bold" href="/service">Leer Más</a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          {mostrarExtras ? (
            <button
              className="btn btn-primary px-4 py-2"
              onClick={() => setMostrarExtras(false)}
            >
              Ver Menos Servicios
            </button>
          ) : (
            <button
              className="btn btn-primary px-4 py-2"
              onClick={() => setMostrarExtras(true)}
            >
              Ver Más Servicios
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default Allservices;
