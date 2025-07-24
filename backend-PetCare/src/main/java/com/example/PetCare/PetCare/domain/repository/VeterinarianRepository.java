package com.example.PetCare.PetCare.domain.repository;

import com.example.PetCare.PetCare.domain.Veterinarian;

import java.util.List;
import java.util.Optional;

public interface VeterinarianRepository {

    List<Veterinarian> getAll();

    Optional<Veterinarian> getVeterinarian(int veterinarianId);

    List<Veterinarian> getBySpecialty(String specialty);

    boolean existsByLicenseNumber(String licenseNumber);

    Veterinarian save(Veterinarian veterinarian);

    void delete(int veterinarianId);

}
