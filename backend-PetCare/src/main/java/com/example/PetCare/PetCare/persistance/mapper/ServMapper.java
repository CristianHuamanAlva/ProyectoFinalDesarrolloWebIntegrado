package com.example.PetCare.PetCare.persistance.mapper;

import com.example.PetCare.PetCare.domain.Serv;
import com.example.PetCare.PetCare.persistance.entity.Servicio;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ServMapper {

    @Mappings({
            @Mapping(source = "idServicio", target = "serviceId"),
            @Mapping(source = "nombreServicio", target = "serviceName"),
            @Mapping(source = "costo", target = "price")

    })
    Serv toService(Servicio servicio);

    List<Serv> toServices(List<Servicio> servicios);

    @InheritInverseConfiguration
    @Mappings({
            @Mapping(target = "servicios", ignore = true),
    })
    Servicio toServicio(Serv serv);

}
