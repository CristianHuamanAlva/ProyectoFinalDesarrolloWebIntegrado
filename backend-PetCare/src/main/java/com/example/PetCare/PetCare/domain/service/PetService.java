package com.example.PetCare.PetCare.domain.service;

import com.example.PetCare.PetCare.domain.Pet;
import com.example.PetCare.PetCare.domain.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    public List<Pet> getAll() {
        return petRepository.getAll();
    }

    public Optional<Pet> getPet(int petId) {
        return petRepository.getPet(petId);
    }

    public List<Pet> getByOwnerId(int ownerId) {
        return petRepository.getByOwnerId(ownerId);
    }

    public List<Pet> getBySpecies(String species) {
        return petRepository.getBySpecies(species);
    }

    public Pet save(Pet pet) {
        return petRepository.save(pet);
    }

    public boolean delete(int petId) {
        return getPet(petId).map(pet -> {
            petRepository.delete(petId);
            return true;
        }).orElse(false);
    }

}
