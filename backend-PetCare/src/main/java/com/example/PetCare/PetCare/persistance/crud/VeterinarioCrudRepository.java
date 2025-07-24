package com.example.PetCare.PetCare.persistance.crud;

import com.example.PetCare.PetCare.persistance.entity.Veterinario;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface VeterinarioCrudRepository extends CrudRepository<Veterinario,Integer> {

    // Buscar todos los veterinarios por especialidad
    List<Veterinario> findByEspecialidad(String especialidad);

    // Buscar un veterinario por número de colegiado
    Optional<Veterinario> findByNumeroColegiado(String numeroColegiado);

    // Buscar todos los veterinarios asociados a un ID de usuario específico
    List<Veterinario> findByUsuario_IdUsuario(int idUsuario);

    // Verificar si existe un veterinario con un número de colegiado
    boolean existsByNumeroColegiado(String numeroColegiado);

}
