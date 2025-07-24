package com.example.PetCare.PetCare.persistance;

import com.example.PetCare.PetCare.domain.Assistant;
import com.example.PetCare.PetCare.domain.repository.AssistantRepository;
import com.example.PetCare.PetCare.persistance.crud.AsistenteCrudRepository;
import com.example.PetCare.PetCare.persistance.entity.Asistente;
import com.example.PetCare.PetCare.persistance.entity.Usuario;
import com.example.PetCare.PetCare.persistance.mapper.AssistantMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class AsistenteRepository implements AssistantRepository {

    @Autowired
    private AsistenteCrudRepository asistenteCrudRepository;
    @Autowired
    private AssistantMapper mapper;

    @Override
    public List<Assistant> getAll() {
        List<Asistente> asistentes = (List<Asistente>) asistenteCrudRepository.findAll();
        return mapper.toAsistants(asistentes);
    }

    @Override
    public Optional<Assistant> getAssistant(int assistantId) {
        return asistenteCrudRepository.findById(assistantId)
                .map(mapper::toAssistant);
    }

    @Override
    public List<Assistant> getByUserId(int userId) {
        List<Asistente> asistentes = asistenteCrudRepository.findByUsuario_IdUsuario(userId);
        return mapper.toAsistants(asistentes);
    }

    @Override
    public List<Assistant> getByFunctions(String functions) {
        List<Asistente> asistentes = asistenteCrudRepository.findByFunciones(functions);
        return mapper.toAsistants(asistentes);
    }

    @Override
    public boolean existsByUserId(int userId) {
        return asistenteCrudRepository.existsByUsuario_IdUsuario(userId);
    }

    @Override
    public Assistant save(Assistant assistant) {
        Asistente asistente;

        if (assistant.getAssistantId() == 0) {
            // Crear nuevo asistente
            asistente = mapper.toAsistente(assistant);

            // Asociar solo el ID del usuario
            Usuario usuario = new Usuario();
            usuario.setIdUsuario(assistant.getUser().getUserId());
            asistente.setUsuario(usuario);

        } else {
            // Editar asistente existente
            Optional<Asistente> existenteOpt = asistenteCrudRepository.findById(assistant.getAssistantId());

            if (existenteOpt.isPresent()) {
                Asistente existente = existenteOpt.get();

                // Actualizar solo campo modificable
                existente.setFunciones(assistant.getFunctions());

                asistente = existente;
            } else {
                // No encontrado, crear nuevo
                asistente = mapper.toAsistente(assistant);
                Usuario usuario = new Usuario();
                usuario.setIdUsuario(assistant.getUser().getUserId());
                asistente.setUsuario(usuario);
            }
        }

        return mapper.toAssistant(asistenteCrudRepository.save(asistente));
    }

    @Override
    public void delete(int assistantId) {
        asistenteCrudRepository.deleteById(assistantId);
    }
}
