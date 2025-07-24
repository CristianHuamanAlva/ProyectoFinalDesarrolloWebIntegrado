import React from 'react';

const carruselHTML = `
  <!-- Carousel Start -->
    <div class="container-fluid p-0">
        <div id="header-carousel" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img class="w-100" src="img/carousel-1.jpg" alt="Imagen">
                    <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                        <div class="p-3" style="max-width: 900px;">
                            <h3 class="text-white mb-3 d-none d-sm-block">Los Mejores Servicios para Mascotas</h3>
                            <h1 class="display-3 text-white mb-3">Cuida la Felicidad de tu Mascota</h1>
                            <h5 class="text-white mb-3 d-none d-sm-block">Atención profesional y amorosa para el bienestar de tu compañero fiel.</h5>
                            <a href="/login" class="btn btn-lg btn-primary mt-3 mt-md-4 px-4">Reserva Ahora</a>
                            <a href="/nosotros" class="btn btn-lg btn-secondary mt-3 mt-md-4 px-4">Más Información</a>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <img class="w-100" src="img/carousel-2.jpg" alt="Imagen">
                    <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                        <div class="p-3" style="max-width: 900px;">
                            <h3 class="text-white mb-3 d-none d-sm-block">Los Mejores Servicios para Mascotas</h3>
                            <h1 class="display-3 text-white mb-3">Spa y Peluquería para Mascotas</h1>
                            <h5 class="text-white mb-3 d-none d-sm-block">Tratamientos especiales para mantener a tu mascota limpia y feliz.</h5>
                            <a href="" class="btn btn-lg btn-primary mt-3 mt-md-4 px-4">Reserva Ahora</a>
                            <a href="" class="btn btn-lg btn-secondary mt-3 mt-md-4 px-4">Más Información</a>
                        </div>
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#header-carousel" data-slide="prev">
                <div class="btn btn-primary rounded" style="width: 45px; height: 45px;">
                    <span class="carousel-control-prev-icon mb-n2"></span>
                </div>
            </a>
            <a class="carousel-control-next" href="#header-carousel" data-slide="next">
                <div class="btn btn-primary rounded" style="width: 45px; height: 45px;">
                    <span class="carousel-control-next-icon mb-n2"></span>
                </div>
            </a>
        </div>
    </div>
    <!-- Carousel End -->
`;

function Carrusel() {
  return (
    <div dangerouslySetInnerHTML={{ __html: carruselHTML }} />
  );
}

export default Carrusel;
