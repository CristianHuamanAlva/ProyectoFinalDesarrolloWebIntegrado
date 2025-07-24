package com.example.PetCare.PetCare.persistance.mapper;


import com.example.PetCare.PetCare.domain.Appointment;
import com.example.PetCare.PetCare.persistance.entity.Cita;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring", uses = {MedicalRecordMapper.class, VeterinarianMapper.class, ServMapper.class})
public interface AppointmentMapper {

    @Mappings({
            @Mapping(source = "idCita", target = "dateId"),
            @Mapping(source = "fechaHora", target = "date"),
            @Mapping(source = "motivo", target = "cause"),
            @Mapping(source = "estado", target = "status"),
            @Mapping(source = "diagnostico", target = "diagnosis"),
            @Mapping(source = "tratamiento", target = "treatment"),
            @Mapping(source = "costo", target = "cost"),
            @Mapping(source = "veterinario", target = "veterinarian"),
            @Mapping(source = "historiaClinica", target = "medicalRecord"),
            @Mapping(source = "servicio", target = "serv")
    })
    Appointment toAppointment(Cita cita);

    List<Appointment> toAppointments(List<Cita> citas);

    @InheritInverseConfiguration
    @Mapping(target = "citas", ignore = true)
    @Mapping(target = "idCita", ignore = true)
    Cita toCita(Appointment appointment);

}








