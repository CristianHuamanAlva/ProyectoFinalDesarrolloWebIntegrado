package com.example.PetCare.PetCare.domain.service;

import com.example.PetCare.PetCare.domain.Veterinarian;
import com.example.PetCare.PetCare.domain.repository.VeterinarianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VeterinarianService {

    @Autowired
    private VeterinarianRepository veterinarianRepository;

    public List<Veterinarian> getAll() {
        return veterinarianRepository.getAll();
    }

    public Optional<Veterinarian> getVeterinarian(int veterinarianId) {
        return veterinarianRepository.getVeterinarian(veterinarianId);
    }

    public List<Veterinarian> getBySpecialty(String specialty) {
        return veterinarianRepository.getBySpecialty(specialty);
    }

    public boolean existsByLicenseNumber(String licenseNumber) {
        return veterinarianRepository.existsByLicenseNumber(licenseNumber);
    }

    public Veterinarian save(Veterinarian veterinarian) {
        return veterinarianRepository.save(veterinarian);
    }

    public boolean delete(int veterinarianId) {
        return getVeterinarian(veterinarianId).map(veterinarian -> {
            veterinarianRepository.delete(veterinarianId);
            return true;
        }).orElse(false);
    }

}
