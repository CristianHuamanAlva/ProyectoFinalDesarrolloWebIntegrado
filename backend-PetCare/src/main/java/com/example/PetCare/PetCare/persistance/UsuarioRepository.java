package com.example.PetCare.PetCare.persistance;

import com.example.PetCare.PetCare.domain.User;
import com.example.PetCare.PetCare.domain.repository.UserRepository;
import com.example.PetCare.PetCare.persistance.crud.UsuarioCrudRepository;
import com.example.PetCare.PetCare.persistance.entity.Usuario;
import com.example.PetCare.PetCare.persistance.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UsuarioRepository implements UserRepository {

    @Autowired
    private UsuarioCrudRepository usuarioCrudRepository;

    @Autowired
    private UserMapper mapper;


    @Override
    public List<User> getAll() {
        List<Usuario> usuarios = (List<Usuario>) usuarioCrudRepository.findAll();
        return mapper.toUsers(usuarios);
    }

    @Override
    public Optional<User> getUser(int userId) {
        return usuarioCrudRepository.findById(userId)
                .map(mapper::toUser);
    }

    @Override
    public Optional<User> getByEmail(String email) {
        return usuarioCrudRepository.findByCorreoElectronico(email)
                .map(mapper::toUser);
    }

    @Override
    public List<User> getByRole(String role) {
        List<Usuario> usuarios = usuarioCrudRepository.findByRol(role);
        return mapper.toUsers(usuarios);
    }

    @Override
    public boolean existsByEmail(String email) {
        return usuarioCrudRepository.existsByCorreoElectronico(email);
    }

    @Override
    public User save(User user) {
        Usuario usuario;

        if (user.getUserId() == 0) {
            // Nuevo usuario -> ignorar ID para que la BD lo genere
            usuario = mapper.toUsuarioCreate(user);
        } else {
            // Usuario existente -> mapear ID para actualizar
            usuario = mapper.toUsuarioUpdate(user);

            // Cargar la entidad existente para conservar las relaciones
            Optional<Usuario> usuarioExistente = usuarioCrudRepository.findById(user.getUserId());
            if (usuarioExistente.isPresent()) {
                Usuario uExist = usuarioExistente.get();

                // Mantener las listas existentes para no perder relaciones
                usuario.setDuenios(uExist.getDuenios());
                usuario.setAsistentes(uExist.getAsistentes());
                usuario.setVeterinarios(uExist.getVeterinarios());

                // Limpiar relaciones si el nuevo rol ya no las necesita
                String nuevoRol = user.getRole();
                if (!"duenio".equals(nuevoRol) && usuario.getDuenios() != null) {
                    usuario.getDuenios().clear();
                }
                if (!"asistente".equals(nuevoRol) && usuario.getAsistentes() != null) {
                    usuario.getAsistentes().clear();
                }
                if (!"veterinario".equals(nuevoRol) && usuario.getVeterinarios() != null) {
                    usuario.getVeterinarios().clear();
                }
            } else {
                throw new RuntimeException("Usuario no encontrado");
            }
        }

        Usuario savedUsuario = usuarioCrudRepository.save(usuario);
        return mapper.toUser(savedUsuario);
    }


    @Override
    public void delete(int userId) {
        usuarioCrudRepository.deleteById(userId);
    }
}
