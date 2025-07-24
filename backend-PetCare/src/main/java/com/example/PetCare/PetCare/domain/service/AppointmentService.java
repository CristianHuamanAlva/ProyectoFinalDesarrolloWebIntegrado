package com.example.PetCare.PetCare.domain.service;

import com.example.PetCare.PetCare.domain.Appointment;
import com.example.PetCare.PetCare.domain.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public List<Appointment> getAll() {
        return appointmentRepository.getAll();
    }

    public Optional<List<Appointment>> getByStatus(String status) {
        return appointmentRepository.getByStatus(status);
    }

    public Optional<List<Appointment>> getByVeterinarian(int veterinarianId) {
        return appointmentRepository.getByVeterinarian(veterinarianId);
    }

    public Optional<List<Appointment>> getByMedicalRecord(int medicalRecordId) {
        return appointmentRepository.getByMedicalRecord(medicalRecordId);
    }
    public Optional<List<Appointment>> getByServ(int serviceId) {
        return appointmentRepository.getByServ(serviceId);
    }

    public Optional<List<Appointment>> getByDate(LocalDateTime date) {
        return appointmentRepository.getByDate(date);
    }

    public Optional<List<Appointment>> getByDateBetween(LocalDateTime start, LocalDateTime end) {
        return appointmentRepository.getByDateBetween(start, end);
    }

    public Optional<List<Appointment>> getByCause(String cause) {
        return appointmentRepository.getByCause(cause);
    }

    public Optional<Appointment> getAppointment(int appointmentId) {
        return appointmentRepository.getAppointment(appointmentId);
    }

    public Appointment save(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public boolean delete(int appointmentId) {
        return getAppointment(appointmentId).map(appointment -> {
            appointmentRepository.delete(appointmentId);
            return true;
        }).orElse(false);
    }
}
