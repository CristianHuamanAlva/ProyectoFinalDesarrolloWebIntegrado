package com.example.PetCare.PetCare.persistance.mapper;

import com.example.PetCare.PetCare.domain.MedicalRecord;
import com.example.PetCare.PetCare.persistance.entity.HistoriaClinica;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring", uses = {PetMapper.class})
public interface MedicalRecordMapper {

    @Mappings({
            @Mapping(source = "idHistoria", target = "medicalRecordId"),
            @Mapping(source = "mascota", target = "pet"),
    })
    MedicalRecord toMedicalRecord(HistoriaClinica historiaClinica);

    List<MedicalRecord> toMedicalRecords(List<HistoriaClinica> historiaClinicas);

    @InheritInverseConfiguration
    @Mapping(target = "citas", ignore = true)
    HistoriaClinica toHistoriaClinica(MedicalRecord medicalRecord);
}
