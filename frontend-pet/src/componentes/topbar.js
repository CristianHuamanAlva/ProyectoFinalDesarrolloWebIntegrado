import React from 'react';

const topbarHTML = `
<!-- Barra Superior Inicio -->
  <div class="container-fluid">
    <div class="row bg-secondary py-2 px-lg-5">
      <div class="col-lg-6 text-center text-lg-left mb-2 mb-lg-0">
        <div class="d-inline-flex align-items-center">
          <a class="text-white pr-3" href="">Preguntas Frecuentes</a>
          <span class="text-white">|</span>
          <a class="text-white px-3" href="">Ayuda</a>
          <span class="text-white">|</span>
          <a class="text-white pl-3" href="">Soporte</a>
        </div>
      </div>
      <div class="col-lg-6 text-center text-lg-right">
        <div class="d-inline-flex align-items-center">
          <a class="text-white px-3" href="">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a class="text-white px-3" href="">
            <i class="fab fa-twitter"></i>
          </a>
          <a class="text-white px-3" href="">
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a class="text-white px-3" href="">
            <i class="fab fa-instagram"></i>
          </a>
          <a class="text-white pl-3" href="">
            <i class="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="row py-3 px-lg-5">
      <div class="col-lg-4">
        <a href="" class="navbar-brand d-none d-lg-block">
          <h1 class="m-0 display-5 text-capitalize"><span class="text-primary">Pet</span>Care</h1>
        </a>
      </div>
      <div class="col-lg-8 text-center text-lg-right">
        <div class="d-inline-flex align-items-center">
          <div class="d-inline-flex flex-column text-center pr-3 border-right">
            <h6>Horario de Atención</h6>
            <p class="m-0">8:00 AM - 9:00 PM</p>
          </div>
          <div class="d-inline-flex flex-column text-center px-3 border-right">
            <h6>Escríbenos</h6>
            <p class="m-0">PetCare@gmail.com</p>
          </div>
          <div class="d-inline-flex flex-column text-center pl-3">
            <h6>Llámanos</h6>
            <p class="m-0">+51 987 654 321</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Barra Superior Fin -->
`;

function Topbar() {
  return (
    <div dangerouslySetInnerHTML={{ __html: topbarHTML }} />
  );
}

export default Topbar;
