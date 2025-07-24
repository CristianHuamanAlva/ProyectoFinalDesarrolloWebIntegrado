package com.example.PetCare.PetCare.web.controller;

import com.example.PetCare.PetCare.domain.Appointment;
import com.example.PetCare.PetCare.domain.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/all")
    public List<Appointment> getAll() {
        return appointmentService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Appointment> getAppointment(@PathVariable("id") int appointmentId) {
        return appointmentService.getAppointment(appointmentId);
    }

    @GetMapping("/status/{status}")
    public Optional<List<Appointment>> getByStatus(@PathVariable("status") String status) {
        return appointmentService.getByStatus(status);
    }

    @GetMapping("/veterinarian/{id}")
    public Optional<List<Appointment>> getByVeterinarian(@PathVariable("id") int veterinarianId) {
        return appointmentService.getByVeterinarian(veterinarianId);
    }

    @GetMapping("/medical-record/{id}")
    public Optional<List<Appointment>> getByMedicalRecord(@PathVariable("id") int medicalRecordId) {
        return appointmentService.getByMedicalRecord(medicalRecordId);
    }

    @GetMapping("/service/{id}")
    public Optional<List<Appointment>> getByServ(@PathVariable("id") int serviceId) {
        return appointmentService.getByServ(serviceId);
    }

    @GetMapping("/date/{date}")
    public Optional<List<Appointment>> getByDate(
            @PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        // Convertimos LocalDate a LocalDateTime a las 00:00
        return appointmentService.getByDate(date.atStartOfDay());
    }

    @GetMapping("/date-range")
    public Optional<List<Appointment>> getByDateBetween(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        // De start date 00:00 end date 23:59:59.999999999
        return appointmentService.getByDateBetween(
                start.atStartOfDay(),
                end.atTime(LocalTime.MAX)
        );
    }

    @GetMapping("/cause/{cause}")
    public Optional<List<Appointment>> getByCause(@PathVariable("cause") String cause) {
        return appointmentService.getByCause(cause);
    }

    @PostMapping("/save")
    public Appointment save(@RequestBody Appointment appointment) {
        return appointmentService.save(appointment);
    }

    @DeleteMapping("/delete/{id}")
    public boolean delete(@PathVariable("id") int appointmentId) {
        return appointmentService.delete(appointmentId);
    }
}
