package com.example.PetCare.PetCare.persistance.entity;

import jakarta.persistence.*;

@Entity
@Table(name="cita_servicio")
public class CitaServicio {

    @EmbeddedId
    private CitaServicioPK id;

    @ManyToOne
    @JoinColumn(name = "id_cita",insertable = false,updatable = false)
    private Cita cita;

    @ManyToOne
    @JoinColumn(name = "id_servicio",insertable = false,updatable = false)
    private Servicio servicio;
}
