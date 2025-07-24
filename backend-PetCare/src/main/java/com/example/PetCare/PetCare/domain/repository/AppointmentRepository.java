package com.example.PetCare.PetCare.domain.repository;

import com.example.PetCare.PetCare.domain.Appointment;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AppointmentRepository {

    List<Appointment> getAll();
    Optional<List<Appointment>> getByStatus(String status);
    Optional<List<Appointment>> getByVeterinarian(int veterinarianId);
    Optional<List<Appointment>> getByMedicalRecord(int medicalRecordId);
    Optional<List<Appointment>> getByServ(int serviceId);
    Optional<List<Appointment>> getByDate(LocalDateTime date);
    Optional<List<Appointment>> getByDateBetween(LocalDateTime start,LocalDateTime end);
    Optional<List<Appointment>> getByCause(String cause);
    Optional<Appointment> getAppointment(int appointmentId);
    Appointment save(Appointment appointment);
    void delete(int appointmentId);
}