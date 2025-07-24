package com.example.PetCare.PetCare.persistance.crud;

import com.example.PetCare.PetCare.persistance.entity.Mascota;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MascotaCrudRepository extends CrudRepository<Mascota, Integer> {

    // Obtener todas las mascotas de un dueño específico
    List<Mascota> findByDuenio_IdDuenio(Integer idDuenio);

    // Buscar por nombre
    List<Mascota> findByNombreContainingIgnoreCase(String nombre);

    // Buscar por especie
    List<Mascota> findByEspecie(String especie);

    // Validar si existe por nombre exacto
    boolean existsByNombre(String nombre);

}
