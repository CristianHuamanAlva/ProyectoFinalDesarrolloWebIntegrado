package com.example.PetCare.PetCare.persistance.crud;

import com.example.PetCare.PetCare.persistance.entity.Vacuna;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface VacunaCrudRepository extends CrudRepository<Vacuna, Integer> {

    // Buscar vacunas ordenadas por precio
    List<Vacuna> findAllByOrderByPrecioAsc();

    // Buscar por coincidencia parcial del nombre (ignorando mayúsculas/minúsculas)
    Optional<List<Vacuna>> findByNombreContainingIgnoreCase(String nombre);

    // Buscar por número exacto de dosis
    Optional<List<Vacuna>> findByDosis(Integer dosis);

}
