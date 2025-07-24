package com.example.PetCare.PetCare.persistance.crud;

import com.example.PetCare.PetCare.persistance.entity.HistoriaClinica;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface HistoriaClinicaCrudRepository extends CrudRepository<HistoriaClinica, Integer> {

    Optional<HistoriaClinica> findByMascota_IdMascota(Integer idMascota);

}
