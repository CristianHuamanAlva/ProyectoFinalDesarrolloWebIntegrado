package com.example.PetCare.PetCare.domain.repository;

import com.example.PetCare.PetCare.domain.Pet;

import java.util.List;
import java.util.Optional;

public interface PetRepository {

    List<Pet> getAll();

    Optional<Pet> getPet(int petId);

    List<Pet> getByOwnerId(int ownerId);

    List<Pet> getBySpecies(String species);

    Pet save(Pet pet);

    void delete(int petId);

}
