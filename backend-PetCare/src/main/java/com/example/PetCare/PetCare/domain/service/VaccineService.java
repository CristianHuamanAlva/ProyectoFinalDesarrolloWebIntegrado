package com.example.PetCare.PetCare.domain.service;

import com.example.PetCare.PetCare.domain.Vaccine;
import com.example.PetCare.PetCare.domain.repository.VaccineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VaccineService {

    @Autowired
    private VaccineRepository vaccineRepository;

    public List<Vaccine> getAll() {
        return vaccineRepository.getAll();
    }

    public List<Vaccine> getByPrice() {
        return vaccineRepository.getByPrice();
    }

    public Optional<List<Vaccine>> getByName(String name) {
        return vaccineRepository.getByName(name);
    }

    public Optional<List<Vaccine>> getByDosis(int dosis) {
        return vaccineRepository.getByDosis(dosis);
    }

    public Optional<Vaccine> getVaccine(int vaccineId) {
        return vaccineRepository.getVaccine(vaccineId);
    }

    public Vaccine save (Vaccine vaccine) {
        return vaccineRepository.save(vaccine);
    }

    public boolean delete(int vaccineId) {
        return getVaccine(vaccineId).map(vacc -> {
            vaccineRepository.delete(vaccineId);
            return true;
        }).orElse(false);
    }
}
