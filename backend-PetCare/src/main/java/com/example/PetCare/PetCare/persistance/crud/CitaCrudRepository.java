package com.example.PetCare.PetCare.persistance.crud;

import com.example.PetCare.PetCare.persistance.entity.Cita;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface CitaCrudRepository extends CrudRepository<Cita, Integer> {

    // Buscar por estado (por ejemplo: "PENDIENTE", "COMPLETADA", etc.)
    Optional<List<Cita>> findByEstado(String estado);

    // Buscar citas por ID de veterinario
    Optional<List<Cita>> findByVeterinarioIdVeterinario(Integer idVeterinario);

    // Buscar citas por ID de historia clínica
    Optional<List<Cita>> findByHistoriaClinicaIdHistoria(Integer idHistoria);

    // Buscar citas por ID de historia clínica
    Optional<List<Cita>> findByServicioIdServicio(Integer idServicio);

    // Buscar citas programadas después de una fecha determinada
    Optional<List<Cita>> findByFechaHoraAfter(LocalDateTime fecha);

    // Buscar citas entre dos fechas (por ejemplo, para agenda semanal)
    Optional<List<Cita>> findByFechaHoraBetween(LocalDateTime fechaInicio, LocalDateTime fechaFin);

    // Buscar por motivo
    Optional<List<Cita>> findByMotivoContainingIgnoreCase(String motivo);
}
