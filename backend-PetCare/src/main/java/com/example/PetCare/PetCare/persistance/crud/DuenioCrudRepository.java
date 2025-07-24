package com.example.PetCare.PetCare.persistance.crud;

import com.example.PetCare.PetCare.persistance.entity.Duenio;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface DuenioCrudRepository extends CrudRepository<Duenio, Integer> {

    Optional<Duenio> findByUsuario_IdUsuario(int idUsuario);

    boolean existsByUsuario_IdUsuario(int idUsuario);

    List<Duenio> findByDireccionContainingIgnoreCase(String direccion);

    Optional<Duenio> findByTelefono(String telefono);

}
