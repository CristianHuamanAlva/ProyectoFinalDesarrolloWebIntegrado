package com.example.PetCare.PetCare.domain.service;

import com.example.PetCare.PetCare.domain.Owner;
import com.example.PetCare.PetCare.domain.User;
import com.example.PetCare.PetCare.domain.repository.OwnerRepository;
import com.example.PetCare.PetCare.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OwnerService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OwnerRepository ownerRepository;

    public List<Owner> getAll() {
        return ownerRepository.getAll();
    }

    public Optional<Owner> getOwner(int ownerId) {
        return ownerRepository.getOwner(ownerId);
    }

    public Optional<Owner> getByUserId(int userId) {
        return ownerRepository.getByUserId(userId);
    }

    public List<Owner> getByAddress(String address) {
        return ownerRepository.getByAddress(address);
    }

    public Optional<Owner> getByPhone(String phone) {
        return ownerRepository.getByPhone(phone);
    }

    public boolean existsByUserId(int userId) {
        return ownerRepository.existsByUserId(userId);
    }

    public Owner save(Owner owner) {
        if(owner.getUser() != null && owner.getUser().getUserId() > 0) {
            // Si el usuario ya existe, asegúrate de que está managed
            User managedUser = userRepository.getUser(owner.getUser().getUserId())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            owner.setUser(managedUser);
        }
        return ownerRepository.save(owner);
    }

    public boolean delete(int ownerId) {
        return getOwner(ownerId).map(owner -> {
            ownerRepository.delete(ownerId);
            return true;
        }).orElse(false);
    }

}
