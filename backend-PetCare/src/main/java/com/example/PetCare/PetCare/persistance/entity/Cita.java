package com.example.PetCare.PetCare.persistance.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "cita")
public class Cita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cita")
    private Integer idCita;


    @Column(name = "fecha_hora")
    private LocalDateTime fechaHora;

    private String motivo;
    private String estado;
    private String diagnostico;
    private String tratamiento;
    @Column(name = "costo", precision = 10, scale = 2)
    private BigDecimal costo;

    @ManyToOne
    @JoinColumn(name = "id_veterinario")
    private Veterinario veterinario;

    @ManyToOne
    @JoinColumn(name = "id_historia")
    private HistoriaClinica historiaClinica;

    @ManyToOne
    @JoinColumn(name = "id_servicio")
    private Servicio servicio;

    @OneToMany(mappedBy = "cita", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CitaServicio> citas;

    public Integer getIdCita() {
        return idCita;
    }

    public void setIdCita(Integer idCita) {
        this.idCita = idCita;
    }

    public LocalDateTime getFechaHora() {
        return fechaHora;
    }

    public void setFechaHora(LocalDateTime fechaHora) {
        this.fechaHora = fechaHora;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getDiagnostico() {
        return diagnostico;
    }

    public void setDiagnostico(String diagnostico) {
        this.diagnostico = diagnostico;
    }

    public String getTratamiento() {
        return tratamiento;
    }

    public void setTratamiento(String tratamiento) {
        this.tratamiento = tratamiento;
    }

    public Veterinario getVeterinario() {
        return veterinario;
    }

    public void setVeterinario(Veterinario veterinario) {
        this.veterinario = veterinario;
    }

    public HistoriaClinica getHistoriaClinica() {
        return historiaClinica;
    }

    public void setHistoriaClinica(HistoriaClinica historiaClinica) {
        this.historiaClinica = historiaClinica;
    }

    public Servicio getServicio() { return servicio; }

    public void setServicio(Servicio servicio) { this.servicio = servicio; }

    public List<CitaServicio> getCitas() {
        return citas;
    }

    public void setCitas(List<CitaServicio> citas) {
        this.citas = citas;
    }

    public BigDecimal getCosto() { return costo; }

    public void setCosto(BigDecimal costo) {this.costo = costo; }
}
