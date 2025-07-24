package com.example.PetCare.PetCare.domain.repository;

import com.example.PetCare.PetCare.domain.Owner;

import java.util.List;
import java.util.Optional;


public interface OwnerRepository {

    List<Owner> getAll();

    Optional<Owner> getOwner(int ownerId);

    Optional<Owner> getByUserId(int userId);

    List<Owner> getByAddress(String address);

    Optional<Owner> getByPhone(String phone);

    boolean existsByUserId(int userId);

    Owner save(Owner owner);

    void delete(int ownerId);

}
