package com.example.PetCare.PetCare.persistance.mapper;

import com.example.PetCare.PetCare.domain.Assistant;
import com.example.PetCare.PetCare.persistance.entity.Asistente;
import org.mapstruct.InheritConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel="spring",uses = {UserMapper.class})
public interface AssistantMapper {

    @Mappings({
            @Mapping(source = "idAsistente", target = "assistantId"),
            @Mapping(source = "funciones", target = "functions"),
            @Mapping(source = "usuario", target = "user")
    })

    Assistant toAssistant(Asistente asistente);

    List<Assistant> toAsistants(List<Asistente> asistentes);

    @InheritConfiguration
    @Mappings({
            @Mapping(target = "idAsistente", ignore = true),
            @Mapping(source = "functions", target = "funciones"),
            @Mapping(source = "user.userId", target = "usuario.idUsuario") // Mapeo explícito del ID
    })
    Asistente toAsistente(Assistant assistant);

}
