import React from 'react';


const footerHTML = `
<div class="container-fluid bg-dark text-white  py-5 px-sm-3 px-md-5">
        <div class="row pt-5">
            <div class="col-lg-4 col-md-12 mb-5">
                <h1 class="mb-3 display-5 text-capitalize text-white"><span class="text-primary">Pet</span>Care</h1>
                <p class="m-0">Brindamos cuidado integral y amor a tus mascotas, porque su bienestar es nuestra prioridad.</p>
            </div>
            <div class="col-lg-8 col-md-12">
                <div class="row">
                    <div class="col-md-4 mb-5">
                        <h5 class="text-primary mb-4">Contáctanos</h5>
                        <p><i class="fa fa-map-marker-alt mr-2"></i>Av. Principal 123, Lima, Perú</p>
                        <p><i class="fa fa-phone-alt mr-2"></i>+51 987 654 321</p>
                        <p><i class="fa fa-envelope mr-2"></i>PetCare@gmail.com</p>
                        <div class="d-flex justify-content-start mt-4">
                            <a class="btn btn-outline-light rounded-circle text-center mr-2 px-0" style="width: 36px; height: 36px;" href="#"><i class="fab fa-twitter"></i></a>
                            <a class="btn btn-outline-light rounded-circle text-center mr-2 px-0" style="width: 36px; height: 36px;" href="#"><i class="fab fa-facebook-f"></i></a>
                            <a class="btn btn-outline-light rounded-circle text-center mr-2 px-0" style="width: 36px; height: 36px;" href="#"><i class="fab fa-linkedin-in"></i></a>
                            <a class="btn btn-outline-light rounded-circle text-center mr-2 px-0" style="width: 36px; height: 36px;" href="#"><i class="fab fa-instagram"></i></a>
                        </div>
                    </div>
                    <div class="col-md-4 mb-5">
                        <h5 class="text-primary mb-4">Enlaces populares</h5>
                        <div class="d-flex flex-column justify-content-start">
                            <a class="text-white mb-2" href="/"><i class="fa fa-angle-right mr-2"></i>Inicio</a>
                            <a class="text-white mb-2" href="/about"><i class="fa fa-angle-right mr-2"></i>Sobre Nosotros</a>
                            <a class="text-white mb-2" href="/service"><i class="fa fa-angle-right mr-2"></i>Nuestros Servicios</a>
                            <a class="text-white mb-2" href="/price"><i class="fa fa-angle-right mr-2"></i>Precios</a>
                            <a class="text-white" href="/contact"><i class="fa fa-angle-right mr-2"></i>Contáctanos</a>
                        </div>
                    </div>
                    <div class="col-md-4 mb-5">
                        <h5 class="text-primary mb-4">Boletín informativo</h5>
                        <form action="/">
                            <div class="form-group">
                                <input type="text" class="form-control border-0" placeholder="Tu Nombre" required />
                            </div>
                            <div class="form-group">
                                <input type="email" class="form-control border-0" placeholder="Tu Correo" required />
                            </div>
                            <div>
                                <button class="btn btn-lg btn-primary btn-block border-0" type="submit">Suscribirse</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid text-white py-4 px-sm-3 px-md-5" style="background: #111111;">
        <div class="row">
            <div class="col-md-6 text-center text-md-left mb-3 mb-md-0">
                <p class="m-0 text-white">
                    &copy; <a class="text-white font-weight-bold" th:href="@{/}">PetCare</a>. Todos los derechos reservados. Diseñado por
                    <a class="text-white font-weight-bold" href="https://htmlcodex.com">Grupo 1</a>
                </p>
            </div>
            <div class="col-md-6 text-center text-md-right">
                <ul class="nav d-inline-flex">
                    <li class="nav-item">
                        <a class="nav-link text-white py-0" href="/privacidad">Privacidad</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white py-0" href="/terminos">Términos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white py-0" href="/reclamaciones">Libro de reclamaciones</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white py-0" href="/ayuda">Ayuda</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
`;

function Footer() {
    return (
        <div dangerouslySetInnerHTML={{ __html: footerHTML }} />
    );
}

export default Footer;
