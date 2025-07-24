package com.example.PetCare.PetCare.domain.repository;

import com.example.PetCare.PetCare.domain.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository {

    List<User> getAll();

    Optional<User> getUser(int userId);

    Optional<User> getByEmail(String email);

    List<User> getByRole(String role);

    boolean existsByEmail(String email);

    User save(User user);

    void delete(int userId);

}
