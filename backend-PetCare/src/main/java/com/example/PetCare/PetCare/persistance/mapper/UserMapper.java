package com.example.PetCare.PetCare.persistance.mapper;

import com.example.PetCare.PetCare.domain.User;
import com.example.PetCare.PetCare.persistance.entity.Usuario;
import org.mapstruct.InheritConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(source = "idUsuario", target = "userId")
    @Mapping(source = "nombre", target = "name")
    @Mapping(source = "correoElectronico", target = "email")
    @Mapping(source = "contrasenia", target = "password")
    @Mapping(source = "rol", target = "role")
    User toUser(Usuario usuario);

    List<User> toUsers(List<Usuario> usuarios);

    // Para crear: ignora id (porque se genera en BD)
    @Mapping(target = "idUsuario", ignore = true)
    @Mapping(source = "name", target = "nombre")
    @Mapping(source = "email", target = "correoElectronico")
    @Mapping(source = "password", target = "contrasenia")
    @Mapping(source = "role", target = "rol")
    @Mapping(target = "asistentes", ignore = true)
    @Mapping(target = "duenios", ignore = true)
    @Mapping(target = "veterinarios", ignore = true)
    Usuario toUsuarioCreate(User user);

    // Para actualizar: mapea id
    @InheritConfiguration(name = "toUsuarioCreate")
    @Mapping(source = "userId", target = "idUsuario")
    Usuario toUsuarioUpdate(User user);
}