package com.example.PetCare.PetCare.domain.service;

import com.example.PetCare.PetCare.domain.User;
import com.example.PetCare.PetCare.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    public List<User> getAll() {
        return userRepository.getAll();
    }

    public Optional<User> getUser(int userId) {
        return userRepository.getUser(userId);
    }

    public Optional<User> getByEmail(String email) {
        return userRepository.getByEmail(email);
    }

    public List<User> getByRole(String role) {
        return userRepository.getByRole(role);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User save(User user) {
        // Validar si el correo ya está registrado por otro usuario
        Optional<User> existingUser = userRepository.getByEmail(user.getEmail());

        if (existingUser.isPresent() && existingUser.get().getUserId() != user.getUserId()) {
            throw new RuntimeException("El correo ya está registrado");
        }

        // Encriptar si la contraseña no está ya codificada
        if (!user.getPassword().startsWith("$2a$")) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        return userRepository.save(user);
    }


    public boolean delete(int userId) {
        return getUser(userId).map(user -> {
            userRepository.delete(userId);
            return true;
        }).orElse(false);
    }


}
