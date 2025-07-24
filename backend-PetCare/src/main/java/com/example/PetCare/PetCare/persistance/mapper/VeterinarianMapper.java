package com.example.PetCare.PetCare.persistance.mapper;

import com.example.PetCare.PetCare.domain.Veterinarian;
import com.example.PetCare.PetCare.persistance.entity.Veterinario;
import org.mapstruct.InheritConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring",uses={UserMapper.class})
public interface VeterinarianMapper {

    @Mappings({
            @Mapping(source="idVeterinario",target="veterinarianId"),
            @Mapping(source="especialidad",target="specialty"),
            @Mapping(source="numeroColegiado",target ="licenseNumber"),
            @Mapping(source = "usuario", target = "user")
    })
    Veterinarian toVeterinarian(Veterinario veterinario);

    List<Veterinarian> toVeterinarians(List<Veterinario> veterinarios);

    @InheritConfiguration
    @Mappings({
            @Mapping(target = "idVeterinario", ignore = true),
            @Mapping(source = "specialty", target = "especialidad"),
            @Mapping(source = "licenseNumber", target = "numeroColegiado"),
            @Mapping(source = "user.userId", target = "usuario.idUsuario") // Mapeo explícito del ID
    })
    Veterinario toVeterinario(Veterinarian veterinarian);




}
