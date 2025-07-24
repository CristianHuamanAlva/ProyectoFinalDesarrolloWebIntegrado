import RegistrarCita from "../pages/registrarCitas"

function Reserva() {
const pathname = window.location.pathname;
const containerClass =
  pathname === "/" ? "container-fluid bg-light"
  : pathname === "/price" ? "container-fluid caracteristicas-bg mt-0 mb-0"
  : "container-fluid bg-light mt-4 mb-4";

  return (
    <div className={containerClass}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <div className="bg-primary py-5 px-4 px-sm-5">
              <RegistrarCita />
            </div>
          </div>
          <div className="col-lg-7 py-5 py-lg-0 px-3 px-lg-5">
            <h4 className="text-secondary mb-3">¿Te vas de vacaciones?</h4>
            <h1 className="display-4 mb-4">
              Reserva para <span className="text-primary">tu Mascota</span>
            </h1>
            <p>Nos encargamos del bienestar de tu mascota mientras tú descansas. ¡Déjala en buenas manos!</p>
            <div className="row py-2">
              <div className="col-sm-6">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <span className="flaticon-house font-weight-normal text-secondary m-0 mr-3" aria-hidden="true"></span>
                    <h5 className="text-truncate m-0">Hospedaje para Mascotas</h5>
                  </div>
                  <p>Tu mascota estará cómoda, segura y acompañada todo el tiempo.</p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                      <span className="flaticon-food font-weight-normal text-secondary m-0 mr-3" aria-hidden="true"></span>
                      <h5 className="text-truncate m-0">Alimentación</h5>
                  </div>
                  <p>Ofrecemos una dieta equilibrada adaptada a las necesidades de tu mascota.</p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <span className="flaticon-grooming font-weight-normal text-secondary m-0 mr-3" aria-hidden="true"></span>
                    <h5 className="text-truncate m-0">Aseo y Cuidado</h5>
                  </div>
                  <p className="m-0">Baños, cepillado y cuidados especiales para que luzca y se sienta genial.</p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <span className="flaticon-toy font-weight-normal text-secondary m-0 mr-3" aria-hidden="true"></span>
                    <h5 className="text-truncate m-0">Entrenamiento Básico</h5>
                  </div>
                  <p className="m-0">Sesiones de juego y aprendizaje para mejorar su comportamiento.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reserva
