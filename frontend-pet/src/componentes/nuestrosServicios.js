import React from 'react';

const nuestrosServiciosHTML = `
    <!-- Services Start -->
  <div class="container-fluid bg-light">
    <div class="container py-5">
      <div class="d-flex flex-column text-center mb-5">
        <h4 class="text-secondary mb-3">Nuestros Servicios</h4>
        <h1 class="display-4 m-0"><span class="text-primary">Servicios</span> Premium para Mascotas</h1>
      </div>
      <div class="row pb-3">
        <div class="col-md-6 col-lg-4 mb-4">
          <div class="d-flex flex-column text-center bg-white mb-2 p-3 p-sm-5">
            <h3 class="flaticon-house display-3 font-weight-normal text-secondary mb-3"></h3>
            <h3 class="mb-3">Hospedaje para Mascotas</h3>
            <p>Ofrecemos cuidado profesional y seguro para tu mascota mientras estás fuera.</p>
            <a class="text-uppercase font-weight-bold" href="/service">Leer Más</a>
          </div>
        </div>
        <div class="col-md-6 col-lg-4 mb-4">
          <div class="d-flex flex-column text-center bg-white mb-2 p-3 p-sm-5">
            <h3 class="flaticon-food display-3 font-weight-normal text-secondary mb-3"></h3>
            <h3 class="mb-3">Alimentación para Mascotas</h3>
            <p>Proporcionamos planes de alimentación personalizados para mantener a tu mascota saludable.</p>
            <a class="text-uppercase font-weight-bold" href="/service">Leer Más</a>
          </div>
        </div>
        <div class="col-md-6 col-lg-4 mb-4">
          <div class="d-flex flex-column text-center bg-white mb-2 p-3 p-sm-5">
            <h3 class="flaticon-cat display-3 font-weight-normal text-secondary mb-3"></h3>
            <h3 class="mb-3">Entrenamiento para Mascotas</h3>
            <p>Programas personalizados para mejorar la conducta y habilidades de tu mascota.</p>
            <a class="text-uppercase font-weight-bold" href="/service">Leer Más</a>
          </div>
        </div>

      </div>
    </div>
  </div>
  <!-- Services End -->
`;

function NuestrosServicios() {
  return (
    <div dangerouslySetInnerHTML={{ __html: nuestrosServiciosHTML }} />
  );
}

export default NuestrosServicios;
