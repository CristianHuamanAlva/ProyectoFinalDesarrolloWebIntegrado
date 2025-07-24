package com.example.PetCare.PetCare.persistance.crud;

import com.example.PetCare.PetCare.persistance.entity.Asistente;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface AsistenteCrudRepository extends CrudRepository<Asistente, Integer> {

    // Buscar todos los asistentes por un ID de usuario específico
    List<Asistente> findByUsuario_IdUsuario(int idUsuario);

    // Buscar asistente por ID de usuario y por funciones
    Optional<Asistente> findByUsuario_IdUsuarioAndFunciones(int idUsuario, String funciones);

    // Buscar asistentes que tienen una función específica
    List<Asistente> findByFunciones(String funciones);

    // Verificar si ya existe un asistente con ese usuario
    boolean existsByUsuario_IdUsuario(int idUsuario);

}
