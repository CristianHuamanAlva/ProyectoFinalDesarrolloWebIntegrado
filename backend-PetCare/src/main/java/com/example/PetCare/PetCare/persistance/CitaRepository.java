package com.example.PetCare.PetCare.persistance;

import com.example.PetCare.PetCare.domain.Appointment;
import com.example.PetCare.PetCare.domain.repository.AppointmentRepository;
import com.example.PetCare.PetCare.persistance.crud.CitaCrudRepository;
import com.example.PetCare.PetCare.persistance.crud.HistoriaClinicaCrudRepository;
import com.example.PetCare.PetCare.persistance.crud.ServicioCrudRepository;
import com.example.PetCare.PetCare.persistance.crud.VeterinarioCrudRepository;
import com.example.PetCare.PetCare.persistance.entity.Cita;
import com.example.PetCare.PetCare.persistance.entity.HistoriaClinica;
import com.example.PetCare.PetCare.persistance.entity.Servicio;
import com.example.PetCare.PetCare.persistance.entity.Veterinario;
import com.example.PetCare.PetCare.persistance.mapper.AppointmentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public class CitaRepository implements AppointmentRepository {

    @Autowired
    private CitaCrudRepository citaCrudRepository;

    @Autowired
    private AppointmentMapper mapper;

    @Autowired
    private VeterinarioCrudRepository veterinarioCrudRepository;

    @Autowired
    private HistoriaClinicaCrudRepository historiaClinicaCrudRepository;

    @Autowired
    private ServicioCrudRepository servicioCrudRepository;

    @Override
    public List<Appointment> getAll() {
        List<Cita> citas = (List<Cita>) citaCrudRepository.findAll();
        return mapper.toAppointments(citas);
    }

    @Override
    public Optional<List<Appointment>> getByStatus(String status) {
        Optional<List<Cita>> citas = citaCrudRepository.findByEstado(status);
        return citas.map(cits -> mapper.toAppointments(cits));
    }

    @Override
    public Optional<List<Appointment>> getByVeterinarian(int veterinarianId) {
        Optional<List<Cita>> citas = citaCrudRepository.findByVeterinarioIdVeterinario(veterinarianId);
        return citas.map(cits -> mapper.toAppointments(cits));
    }

    @Override
    public Optional<List<Appointment>> getByMedicalRecord(int medicalRecordId) {
        Optional<List<Cita>> citas = citaCrudRepository.findByHistoriaClinicaIdHistoria(medicalRecordId);
        return citas.map(cits -> mapper.toAppointments(cits));
    }

    @Override
    public Optional<List<Appointment>> getByServ(int serviceId) {
        Optional<List<Cita>> citas = citaCrudRepository.findByServicioIdServicio(serviceId);
        return citas.map(cits -> mapper.toAppointments(cits));
    }

    @Override
    public Optional<List<Appointment>> getByDate(LocalDateTime date) {
        Optional<List<Cita>> citas = citaCrudRepository.findByFechaHoraAfter(date);
        return citas.map(cits -> mapper.toAppointments(cits));
    }

    @Override
    public Optional<List<Appointment>> getByDateBetween(LocalDateTime start, LocalDateTime end) {
        Optional<List<Cita>> citas = citaCrudRepository.findByFechaHoraBetween(start, end);
        return citas.map(cits -> mapper.toAppointments(cits));
    }

    @Override
    public Optional<List<Appointment>> getByCause(String cause) {
        Optional<List<Cita>> citas = citaCrudRepository.findByMotivoContainingIgnoreCase(cause);
        return citas.map(cits -> mapper.toAppointments(cits));
    }

    @Override
    public Optional<Appointment> getAppointment(int appointmentId) {
        return citaCrudRepository.findById(appointmentId).map(cita -> mapper.toAppointment(cita));
    }

    @Override
    public Appointment save(Appointment appointment) {
        Cita cita;

        // Si es nueva cita (ID = 0), creamos completamente
        if (appointment.getDateId() == 0) {
            cita = mapper.toCita(appointment);

            // Asociar historia clínica si existe
            if (appointment.getMedicalRecord() != null) {
                historiaClinicaCrudRepository.findById(appointment.getMedicalRecord().getMedicalRecordId())
                        .ifPresent(cita::setHistoriaClinica);
            }

            // Asociar servicio
            if (appointment.getServ() != null) {
                servicioCrudRepository.findById(appointment.getServ().getServiceId())
                        .ifPresent(cita::setServicio);
            }

            // Asociar veterinario
            if (appointment.getVeterinarian() != null) {
                veterinarioCrudRepository.findById(appointment.getVeterinarian().getVeterinarianId())
                        .ifPresent(cita::setVeterinario);
            }

        } else {
            // Si es cita existente, buscar y actualizar solo ciertos campos
            Optional<Cita> existenteOpt = citaCrudRepository.findById(appointment.getDateId());

            if (existenteOpt.isPresent()) {
                cita = existenteOpt.get();

                // Actualizar solo campos editables
                cita.setEstado(appointment.getStatus());
                cita.setDiagnostico(appointment.getDiagnosis());
                cita.setTratamiento(appointment.getTreatment());

                // Los demás datos como fecha, mascota, servicio, veterinario se mantienen
            } else {
                // Si no existe la cita, tratamos como nueva
                cita = mapper.toCita(appointment);

                if (appointment.getMedicalRecord() != null) {
                    historiaClinicaCrudRepository.findById(appointment.getMedicalRecord().getMedicalRecordId())
                            .ifPresent(cita::setHistoriaClinica);
                }

                if (appointment.getServ() != null) {
                    servicioCrudRepository.findById(appointment.getServ().getServiceId())
                            .ifPresent(cita::setServicio);
                }

                if (appointment.getVeterinarian() != null) {
                    veterinarioCrudRepository.findById(appointment.getVeterinarian().getVeterinarianId())
                            .ifPresent(cita::setVeterinario);
                }
            }
        }

        return mapper.toAppointment(citaCrudRepository.save(cita));
    }

    @Override
    public void delete(int appointmentId) {
        citaCrudRepository.deleteById(appointmentId);
    }
}
