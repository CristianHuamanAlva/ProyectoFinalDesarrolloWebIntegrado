import React from 'react';

const Contact = () => {
    return (
        <div className="container-fluid pt-5 bg-light">
            {/* Encabezado */}
            <div className="d-flex flex-column text-center mb-5 pt-5">

                <h1 className="display-4 m-0">
                    Contáctanos por <span className="text-primary">Cualquier Consulta</span>
                </h1>
            </div>

            <div className="row justify-content-center">
                {/* Información de contacto */}
                <div className="col-lg-4 col-md-6 mb-5">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body text-center p-5">
                            <div className="mb-4">
                                <i className="fas fa-map-marker-alt fa-3x text-primary mb-3"></i>
                                <h4 className="text-dark">Nuestra Ubicación</h4>
                                <p className="mb-0">Av. Principal 123, Lima, Perú</p>
                            </div>

                            <div className="mb-4">
                                <i className="fas fa-phone-alt fa-3x text-primary mb-3"></i>
                                <h4 className="text-dark">Llámarnos</h4>
                                <p className="mb-0">+51 987 654 321</p>
                                <p className="mb-0">+51 123 456 789</p>
                            </div>

                            <div>
                                <i className="fas fa-envelope-open-text fa-3x text-primary mb-3"></i>
                                <h4 className="text-dark">Email</h4>
                                <p className="mb-0">info@tusitio.com</p>
                                <p className="mb-0">ventas@tusitio.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Formulario */}
                <div className="col-lg-6 col-md-6 mb-5">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-5">
                            <div className="contact-form">
                                <div id="success"></div>
                                <form name="sentMessage" id="contactForm" noValidate>
                                    <div className="form-group mb-4">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-primary text-white">
                                                    <i className="fas fa-user"></i>
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control p-4"
                                                id="name"
                                                placeholder="Tu Nombre"
                                                required
                                            />
                                        </div>
                                        <p className="help-block text-danger"></p>
                                    </div>

                                    <div className="form-group mb-4">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-primary text-white">
                                                    <i className="fas fa-envelope"></i>
                                                </span>
                                            </div>
                                            <input
                                                type="email"
                                                className="form-control p-4"
                                                id="email"
                                                placeholder="Tu Correo Electrónico"
                                                required
                                            />
                                        </div>
                                        <p className="help-block text-danger"></p>
                                    </div>

                                    <div className="form-group mb-4">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-primary text-white">
                                                    <i className="fas fa-tag"></i>
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control p-4"
                                                id="subject"
                                                placeholder="Asunto"
                                                required
                                            />
                                        </div>
                                        <p className="help-block text-danger"></p>
                                    </div>

                                    <div className="form-group mb-4">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-primary text-white align-items-start pt-3">
                                                    <i className="fas fa-comment"></i>
                                                </span>
                                            </div>
                                            <textarea
                                                className="form-control p-4"
                                                rows="6"
                                                id="message"
                                                placeholder="Mensaje"
                                                required
                                            ></textarea>
                                        </div>
                                        <p className="help-block text-danger"></p>
                                    </div>

                                    <div className="text-center">
                                        <button
                                            className="btn btn-primary py-3 px-5"
                                            type="submit"
                                            id="sendMessageButton"
                                        >
                                            <i className="fas fa-paper-plane mr-2"></i> Enviar Mensaje
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mapa */}
            <div className="row mt-2">
                <div className="col-12 d-flex justify-content-center mb-5">
                    <div
                        className="petreg-map-container card border-0 shadow-sm"
                        style={{ width: '90%', maxWidth: '1600px' }}
                    >
                        <div className="card-body p-0">
                            <div style={{ width: '100%', height: '500px' }}>
                                <iframe
                                    title="Ubicación del local"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.806561132129!2d-76.9994382!3d-12.125383999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c7fc687883e5%3A0xb2886b6a7a4cb9a!2sPetcare!5e0!3m2!1ses-419!2spe!4v1748573135613!5m2!1ses-419!2spe"
                                    className="w-100 h-100"
                                    allowFullScreen=""
                                    loading="lazy"
                                    style={{ border: 0 }}
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Horario de atención */}
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body py-4">
                            <h3 className="text-primary mb-3">
                                <i className="far fa-clock mr-2"></i> Horario de Atención
                            </h3>
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="mb-1"><strong>Lunes - Viernes:</strong> 9:00 AM - 7:00 PM</p>
                                    <p className="mb-1"><strong>Sábado:</strong> 8:00 AM - 9:00 PM</p>
                                </div>
                                <div className="col-md-6">
                                    <p className="mb-1"><strong>Domingo:</strong> Cerrado</p>
                                    <p className="mb-1"><strong>Feriados:</strong> 10:00 AM - 2:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;