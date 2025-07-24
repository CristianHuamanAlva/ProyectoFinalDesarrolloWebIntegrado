package com.example.PetCare.PetCare.persistance.mapper;

import com.example.PetCare.PetCare.domain.Vaccine;
import com.example.PetCare.PetCare.persistance.entity.Vacuna;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring", uses = {ServMapper.class})
public interface VaccineMapper {

    @Mappings({
            @Mapping(source = "idVacuna", target = "vaccineId"),
            @Mapping(source = "nombre", target = "name"),
            @Mapping(source = "descripcion", target = "description"),
            @Mapping(source = "precio", target = "price"),
            @Mapping(source = "dosis", target = "dosisNumber"),
            @Mapping(source = "servicio", target = "serv")
    })
    Vaccine toVaccine(Vacuna vacuna);

    List<Vaccine> toVaccines(List<Vacuna> vacunas);

    @InheritInverseConfiguration
    Vacuna toVacuna(Vaccine vaccine);
}
