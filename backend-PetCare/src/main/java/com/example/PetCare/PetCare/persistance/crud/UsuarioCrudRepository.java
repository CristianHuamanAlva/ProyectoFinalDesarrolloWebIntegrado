package com.example.PetCare.PetCare.persistance.crud;

import com.example.PetCare.PetCare.persistance.entity.Usuario;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioCrudRepository extends CrudRepository<Usuario, Integer> {

    // Buscar usuario por correo electrónico
    Optional<Usuario> findByCorreoElectronico(String correoElectronico);

    // Buscar todos los usuarios con un rol específico
    List<Usuario> findByRol(String rol);

    // Verificar si ya existe un usuario con ese correo
    boolean existsByCorreoElectronico(String correoElectronico);

}
