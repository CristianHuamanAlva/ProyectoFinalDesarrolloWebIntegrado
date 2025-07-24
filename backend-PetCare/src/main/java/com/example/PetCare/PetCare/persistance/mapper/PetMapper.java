package com.example.PetCare.PetCare.persistance.mapper;

import com.example.PetCare.PetCare.domain.Pet;
import com.example.PetCare.PetCare.persistance.entity.Mascota;
import org.mapstruct.InheritConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel="spring", uses = {OwnerMapper.class})
public interface PetMapper {

    @Mappings({
            @Mapping(source = "idMascota", target = "petId"),
            @Mapping(source = "nombre", target = "name"),
            @Mapping(source = "especie", target = "species"),
            @Mapping(source = "raza", target = "breed"),
            @Mapping(source = "fechaNacimiento", target = "birthDate"),
            @Mapping(source = "duenio", target = "owner")
    })
    Pet toPet(Mascota mascota);

    List<Pet> toPets(List<Mascota> mascotas);

    @InheritConfiguration(name = "toPet")
    @Mappings({
            @Mapping(target = "idMascota", ignore = true),
            @Mapping(source = "name", target = "nombre"),
            @Mapping(source = "species", target = "especie"),
            @Mapping(source = "breed", target = "raza"),
            @Mapping(source = "birthDate", target = "fechaNacimiento"),
            @Mapping(source = "owner.ownerId", target = "duenio.idDuenio"),
            @Mapping(target = "historiaClinica", ignore = true)
    })
    Mascota toMascota(Pet pet);

}
