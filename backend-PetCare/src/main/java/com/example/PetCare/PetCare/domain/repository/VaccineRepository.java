package com.example.PetCare.PetCare.domain.repository;

import com.example.PetCare.PetCare.domain.Vaccine;

import java.util.List;
import java.util.Optional;

public interface VaccineRepository {

    List<Vaccine> getAll();
    List<Vaccine> getByPrice();
    Optional<List<Vaccine>> getByName(String name);
    Optional<List<Vaccine>> getByDosis(int dosisNumber);
    Optional<Vaccine> getVaccine(int vaccineId);
    Vaccine save(Vaccine vaccine);
    void delete(int vaccineId);
}
