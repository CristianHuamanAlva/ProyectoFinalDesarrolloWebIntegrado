package com.example.PetCare.PetCare.domain.service;

import com.example.PetCare.PetCare.domain.Assistant;
import com.example.PetCare.PetCare.domain.repository.AssistantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssistantService {
    @Autowired
    private AssistantRepository assistantRepository;

    public List<Assistant> getAll() {
        return assistantRepository.getAll();
    }

    public Optional<Assistant> getAssistant(int assistantId) {
        return assistantRepository.getAssistant(assistantId);
    }

    public List<Assistant> getByUserId(int userId) {
        return assistantRepository.getByUserId(userId);
    }

    public List<Assistant> getByFunctions(String functions) {
        return assistantRepository.getByFunctions(functions);
    }

    public boolean existsByUserId(int userId) {
        return assistantRepository.existsByUserId(userId);
    }

    public Assistant save(Assistant assistant) {
        return assistantRepository.save(assistant);
    }

    public boolean delete(int assistantId) {
        return getAssistant(assistantId).map(assistant -> {
            assistantRepository.delete(assistantId);
            return true;
        }).orElse(false);
    }
}
