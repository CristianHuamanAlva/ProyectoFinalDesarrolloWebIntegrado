package com.example.PetCare.PetCare.persistance.mapper;

import com.example.PetCare.PetCare.domain.Owner;
import com.example.PetCare.PetCare.persistance.entity.Duenio;
import org.mapstruct.InheritConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel="spring",uses = {UserMapper.class})
public interface OwnerMapper {

    @Mappings({
            @Mapping(source = "idDuenio", target = "ownerId"),
            @Mapping(source = "telefono", target = "phone"),
            @Mapping(source = "direccion", target = "address"),
            @Mapping(source = "usuario", target = "user")
    })
    Owner toOwner(Duenio duenio);

    List<Owner> toOwners(List<Duenio> duenios);

    @InheritConfiguration
    @Mappings({
            @Mapping(target = "idDuenio", ignore = true),
            @Mapping(source = "phone", target = "telefono"),
            @Mapping(source = "address", target = "direccion"),
            @Mapping(source = "user.userId", target = "usuario.idUsuario") // Mapeo explícito del ID
    })
    Duenio toDuenio(Owner owner);

}
