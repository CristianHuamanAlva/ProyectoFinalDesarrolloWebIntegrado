import React from 'react';

const sobreNosotrosHTML = `
  <!-- vistas/sobreNosotros.html -->
    <!-- About Start -->
    <div class="container py-5">
        <div class="row py-5">
        <div class="col-lg-7 pb-5 pb-lg-0 px-3 px-lg-5">
            <h4 class="text-secondary mb-3">Sobre Nosotros</h4>
            <h1 class="display-4 mb-4"><span class="text-primary">Guardería</span> & <span class="text-secondary">Cuidado Diario</span></h1>
            <h5 class="text-muted mb-3">En PetCare, nos dedicamos a brindar amor y atención profesional a tus mascotas, como si fueran parte de nuestra familia.</h5>
            <p class="mb-4">En PetCare, contamos con un equipo altamente capacitado y apasionado por el bienestar animal. 
            Nos especializamos en brindar un servicio integral que abarca guardería diurna y nocturna, alojamiento cómodo y seguro, alimentación balanceada y personalizada, baños y cuidados de higiene, así como atención médica veterinaria de calidad. 
            </p>
            <p class="mb-4">Nuestro principal compromiso es asegurar que tu mascota no solo reciba los mejores cuidados, sino que también se sienta querida, protegida y feliz durante toda su estadía con nosotros.
            </p>
            <ul class="list-inline">
            <li><h5><i class="fa fa-check-double text-secondary mr-3"></i>Especialistas en Bienestar Animal</h5></li>
            <li><h5><i class="fa fa-check-double text-secondary mr-3"></i>Atención de Emergencias</h5></li>
            <li><h5><i class="fa fa-check-double text-secondary mr-3"></i>Soporte al Cliente 24/7</h5></li>
            </ul>
            <a href="/about" class="btn btn-lg btn-primary mt-3 px-4">Conoce Más</a>
        </div>

        <div class="col-lg-5">
            <div class="row px-3">
            <div class="col-12 p-0">
                <img class="img-fluid w-100" src="img/about-1.jpg" alt="">
            </div>
            <div class="col-6 p-0">
                <img class="img-fluid w-100" src="img/about-2.jpg" alt="">
            </div>
            <div class="col-6 p-0">
                <img class="img-fluid w-100" src="img/about-3.jpg" alt="">
            </div>
            <div class="col-12 p-0">
                <img class="img-fluid w-100" src="img/about-4.jpg" alt="">
            </div>
            </div>
        </div>
        </div>
    </div>
    <!-- About End -->
`;

function sobreNosotros() {
    return (
        <div dangerouslySetInnerHTML={{ __html: sobreNosotrosHTML }} />
    );
}

export default sobreNosotros;
