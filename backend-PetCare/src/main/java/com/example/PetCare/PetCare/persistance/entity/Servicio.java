package com.example.PetCare.PetCare.persistance.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "servicio")
public class Servicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_servicio")
    private Integer idServicio;

    @Column(name = "nombre_servicio")
    private String nombreServicio;

    private BigDecimal costo;

    @OneToMany(mappedBy = "servicio")
    private List<CitaServicio> servicios;

    //@OneToMany
    //private List<Vacuna> vacunas;

    public Integer getIdServicio() {
        return idServicio;
    }

    public void setIdServicio(Integer idServicio) {
        this.idServicio = idServicio;
    }

    public String getNombreServicio() {
        return nombreServicio;
    }

    public void setNombreServicio(String nombreServicio) {
        this.nombreServicio = nombreServicio;
    }

    public BigDecimal getCosto() {
        return costo;
    }

    public void setCosto(BigDecimal costo) {
        this.costo = costo;
    }

    public List<CitaServicio> getServicios() {
        return servicios;
    }

    public void setServicios(List<CitaServicio> servicios) {
        this.servicios = servicios;
    }

}
