package com.example.PetCare.PetCare.persistance.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class CitaServicioPK {

    @Column(name="id_cita")
    private Integer idCita;

    @Column(name="id_servicio")
    private Integer idServicio;

}
