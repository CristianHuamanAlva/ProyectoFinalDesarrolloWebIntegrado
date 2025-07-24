package com.example.PetCare.PetCare.persistance.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "duenio")
public class Duenio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_duenio")
    private Integer idDuenio;

    private String telefono;
    private String direccion;

    @ManyToOne(cascade = CascadeType.MERGE)// Esto guardará el Usuario automáticamente
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @OneToMany(mappedBy = "duenio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Mascota> mascotas;

    public Integer getIdDuenio() {
        return idDuenio;
    }

    public void setIdDuenio(Integer idDuenio) {
        this.idDuenio = idDuenio;
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

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public List<Mascota> getMascotas() {
        return mascotas;
    }

    public void setMascotas(List<Mascota> mascotas) {
        this.mascotas = mascotas;
    }
}
