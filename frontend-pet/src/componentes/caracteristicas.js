import React from 'react';
import { useLocation } from 'react-router-dom';

function Caracteristicas() {
  const location = useLocation();
  const showBackground = location.pathname !== '/';

  return (
    <div className={showBackground ? 'caracteristicas-bg w-100 py-5' : 'w-100 py-5'}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <img className="img-fluid w-100" src="img/feature.jpg" alt="Cuidado de mascotas" />
          </div>
          <div className="col-lg-7 py-5 py-lg-0 px-3 px-lg-5">
            <h4 className="text-secondary mb-3">¿Por qué elegirnos?</h4>
            <h1 className="display-4 mb-4">
              <span className="text-primary">Cuidado Especial</span> para Mascotas
            </h1>
            <p className="mb-4" style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
              Ofrecemos atención integral y personalizada para la salud y bienestar de tus mascotas, 
              con profesionales especializados, tecnología de punta y servicios de emergencia disponibles 24/7. 
              Nos dedicamos a brindar un entorno seguro, cómodo y amoroso para cada compañero peludo.
            </p>
            <div className="row py-2">
              <div className="col-6">
                <div className="d-flex align-items-center mb-4">
                  <span className="flaticon-cat font-weight-normal text-secondary m-0 mr-3"></span>
                  <h5 className="text-truncate m-0">Lo Mejor en la Industria</h5>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center mb-4">
                  <span className="flaticon-doctor font-weight-normal text-secondary m-0 mr-3"></span>
                  <h5 className="text-truncate m-0">Servicios de Emergencia</h5>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <span className="flaticon-care font-weight-normal text-secondary m-0 mr-3"></span>
                  <h5 className="text-truncate m-0">Cuidado Especial</h5>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <span className="flaticon-dog font-weight-normal text-secondary m-0 mr-3"></span>
                  <h5 className="text-truncate m-0">Atención al Cliente</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Caracteristicas;
