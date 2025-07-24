package com.example.PetCare.PetCare.domain.repository;

import com.example.PetCare.PetCare.domain.Assistant;

import java.util.List;
import java.util.Optional;

public interface AssistantRepository{

    List<Assistant> getAll();

    Optional<Assistant> getAssistant(int assistantId);

    List<Assistant> getByUserId(int userId);

    List<Assistant> getByFunctions(String functions);

    boolean existsByUserId(int userId);

    Assistant save(Assistant assistant);

    void delete(int assistantId);

}
