package com.example.PetCare.PetCare.domain.Email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reclamos")
public class LibroReclamacionesController {

    @Autowired
    private MailService mailService;

    @PostMapping("/enviar")
    public ResponseEntity<String> enviarReclamo(@RequestBody ReclamoRequest reclamo) {
        mailService.enviarReclamo(
                reclamo.getCorreo(),
                reclamo.getNombre(),
                reclamo.getTelefono(),
                reclamo.getDireccion(),
                reclamo.getTipoDocumento(),
                reclamo.getNumeroDocumento(),
                reclamo.getTipoReclamo(),
                reclamo.getFechaIncidente(),
                reclamo.getDetalleReclamo(),
                reclamo.getExpectativaSolucion()
        );
        return ResponseEntity.ok("Reclamo enviado correctamente");
    }

    public static class ReclamoRequest {
        private String correo;
        private String nombre;
        private String telefono;
        private String direccion;
        private String tipoDocumento;
        private String numeroDocumento;
        private String tipoReclamo;
        private String fechaIncidente;
        private String detalleReclamo;
        private String expectativaSolucion;

        public String getCorreo() {
            return correo;
        }

        public void setCorreo(String correo) {
            this.correo = correo;
        }

        public String getNombre() {
            return nombre;
        }

        public void setNombre(String nombre) {
            this.nombre = nombre;
        }

        public String getTelefono() {
            return telefono;
        }

        public void setTelefono(String telefono) {
            this.telefono = telefono;
        }

        public String getDireccion() {
            return direccion;
        }

        public void setDireccion(String direccion) {
            this.direccion = direccion;
        }

        public String getTipoDocumento() {
            return tipoDocumento;
        }

        public void setTipoDocumento(String tipoDocumento) {
            this.tipoDocumento = tipoDocumento;
        }

        public String getNumeroDocumento() {
            return numeroDocumento;
        }

        public void setNumeroDocumento(String numeroDocumento) {
            this.numeroDocumento = numeroDocumento;
        }

        public String getTipoReclamo() {
            return tipoReclamo;
        }

        public void setTipoReclamo(String tipoReclamo) {
            this.tipoReclamo = tipoReclamo;
        }

        public String getFechaIncidente() {
            return fechaIncidente;
        }

        public void setFechaIncidente(String fechaIncidente) {
            this.fechaIncidente = fechaIncidente;
        }

        public String getDetalleReclamo() {
            return detalleReclamo;
        }

        public void setDetalleReclamo(String detalleReclamo) {
            this.detalleReclamo = detalleReclamo;
        }

        public String getExpectativaSolucion() {
            return expectativaSolucion;
        }

        public void setExpectativaSolucion(String expectativaSolucion) {
            this.expectativaSolucion = expectativaSolucion;
        }
    }
}
