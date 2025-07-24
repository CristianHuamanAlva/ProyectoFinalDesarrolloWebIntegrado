import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import "./registrarCita.css"

const MEDICAL_RECORD_API = "http://localhost:8090/bd_petcare/api/medical-records"
const SERVICE_API = "http://localhost:8090/bd_petcare/api/services"
const APPOINTMENT_API = "http://localhost:8090/bd_petcare/api/appointments/save"
const VETERINARIAN_API = "http://localhost:8090/bd_petcare/api/veterinarians/all"

function RegistrarCita() {
  const [mascotas, setMascotas] = useState([])
  const [servicios, setServicios] = useState([])
  const [veterinarios, setVeterinarios] = useState([])
  const [formData, setFormData] = useState({
    mascotaId: "",
    servicioId: "",
    veterinarioId: "",
    fechaHora: "",
    motivo: "",
    estado: "programada",
    costo: 0,
    medicalRecordId: "",
  })

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const token = localStorage.getItem("token");

    const headers = token
      ? { Authorization: `Bearer ${token}` }
      : {}; // no agregar Authorization si no hay token

    if (usuario && token) {
      fetch(`${MEDICAL_RECORD_API}/all`, { headers })
        .then((res) => {
          if (!res.ok) throw new Error(`Error al cargar historial: ${res.status}`);
          return res.json();
        })
        .then((histories) => {
          const propias = histories.filter((h) => h.pet?.owner?.user?.userId === usuario.userId);
          const mascotasConHistorial = propias.map((h) => ({
            ...h.pet,
            medicalRecordId: h.medicalRecordId,
          }));
          setMascotas(mascotasConHistorial);
        })
        .catch((err) => {
          console.error("Error al cargar historial:", err);
        });
    }

    // fetch servicios (permitido sin token)
    fetch(`${SERVICE_API}/all`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error al cargar servicios: ${res.status}`);
        return res.json();
      })
      .then((data) => setServicios(data))
      .catch((err) => {
        console.error("Error al cargar servicios:", err);
      });

    // fetch veterinarios (permitido sin token)
    fetch(`${VETERINARIAN_API}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error al cargar veterinarios: ${res.status}`);
        return res.json();
      })
      .then((data) => setVeterinarios(data))
      .catch((err) => {
        console.error("Error al cargar veterinarios:", err);
      });

  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "mascotaId") {
      const mascotaSeleccionada = mascotas.find((m) => m.petId === Number.parseInt(value))
      setFormData((prev) => ({
        ...prev,
        mascotaId: value,
        medicalRecordId: mascotaSeleccionada?.medicalRecordId || "",
      }))
    } else if (name === "servicioId") {
      const servicioSeleccionado = servicios.find((s) => s.serviceId === Number.parseInt(value))
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        costo: servicioSeleccionado ? servicioSeleccionado.price : 0,
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token");
    if (!formData.medicalRecordId) {
      Swal.fire({
        icon: "warning",
        title: "Atención",
        text: "Debes seleccionar una mascota con historial clínico.",
        confirmButtonColor: "#3498db",
      })
      return
    }

    if (!formData.servicioId || isNaN(Number.parseInt(formData.servicioId))) {
      Swal.fire({
        icon: "warning",
        title: "Atención",
        text: "Debes seleccionar un servicio válido.",
        confirmButtonColor: "#3498db",
      })
      return
    }

    if (!formData.veterinarioId || isNaN(Number.parseInt(formData.veterinarioId))) {
      Swal.fire({
        icon: "warning",
        title: "Atención",
        text: "Debes seleccionar un veterinario válido.",
        confirmButtonColor: "#3498db",
      })
      return
    }

    const cita = {
      date: formData.fechaHora,
      cause: formData.motivo,
      status: formData.estado,
      diagnosis: "",
      treatment: "",
      cost: formData.costo,
      serv: { serviceId: Number.parseInt(formData.servicioId) },
      medicalRecord: { medicalRecordId: Number.parseInt(formData.medicalRecordId) },
      veterinarian: { veterinarianId: Number.parseInt(formData.veterinarioId) },
    }


    fetch(APPOINTMENT_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(cita),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text()
          throw new Error(errorText)
        }
        return res.json()
      })
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Cita registrada correctamente",
          confirmButtonColor: "#3498db",
          timer: 3000,
          timerProgressBar: true,
        })
        console.log(data)
      })
      .catch((err) => {
        console.error("❌ Error al guardar cita:", err.message)
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Hubo un error al registrar la cita:\n${err.message}`,
          confirmButtonColor: "#e74c3c",
        })
      })
  }

  return (
    <div className="registrar-cita__container">
      <h2 className="registrar-cita__title">Registrar Nueva Cita</h2>
      <form onSubmit={handleSubmit} className="registrar-cita__formulario">
        <div className="registrar-cita__form-group">
          <label className="registrar-cita__label">Mascota:</label>
          <select
            name="mascotaId"
            value={formData.mascotaId}
            onChange={handleChange}
            required
            className="registrar-cita__select"
          >
            <option value="">Selecciona una mascota</option>
            {mascotas.map((m) => (
              <option key={m.petId} value={m.petId}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div className="registrar-cita__form-group">
          <label className="registrar-cita__label">Servicio:</label>
          <select
            name="servicioId"
            value={formData.servicioId}
            onChange={handleChange}
            required
            className="registrar-cita__select"
          >
            <option value="">Selecciona un servicio</option>
            {servicios.map((s) => (
              <option key={s.serviceId} value={s.serviceId}>
                {s.serviceName}
              </option>
            ))}
          </select>
        </div>

        <div className="registrar-cita__form-group">
          <label className="registrar-cita__label">Veterinario:</label>
          <select
            name="veterinarioId"
            value={formData.veterinarioId}
            onChange={handleChange}
            required
            className="registrar-cita__select"
          >
            <option value="">Selecciona un veterinario</option>
            {veterinarios.map((v) => (
              <option key={v.veterinarianId} value={v.veterinarianId}>
                {v.user.name} ({v.specialty})
              </option>
            ))}
          </select>
        </div>

        <div className="registrar-cita__form-group">
          <label className="registrar-cita__label">Fecha y Hora:</label>
          <input
            type="datetime-local"
            name="fechaHora"
            value={formData.fechaHora}
            onChange={handleChange}
            required
            className="registrar-cita__input"
          />
        </div>

        <div className="registrar-cita__form-group">
          <label className="registrar-cita__label">Motivo:</label>
          <textarea
            name="motivo"
            value={formData.motivo}
            onChange={handleChange}
            required
            className="registrar-cita__textarea"
            placeholder="Describe el motivo de la consulta..."
            rows="3"
          />
        </div>

        <div className="registrar-cita__form-group">
          <label className="registrar-cita__label">Costo estimado:</label>
          <input
            type="text"
            value={`S/ ${formData.costo}`}
            disabled
            className="registrar-cita__input registrar-cita__input--disabled"
          />
        </div>

        <button type="submit" className="registrar-cita__button">
          Registrar Cita
        </button>
      </form>
    </div>
  )
}

export default RegistrarCita
