package com.example.PetCare.PetCare.persistance;

import com.example.PetCare.PetCare.domain.Veterinarian;
import com.example.PetCare.PetCare.domain.repository.VeterinarianRepository;
import com.example.PetCare.PetCare.persistance.crud.VeterinarioCrudRepository;
import com.example.PetCare.PetCare.persistance.entity.Veterinario;
import com.example.PetCare.PetCare.persistance.entity.Usuario;
import com.example.PetCare.PetCare.persistance.mapper.VeterinarianMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class VeterinarioRepository implements VeterinarianRepository {

    @Autowired
    private VeterinarioCrudRepository veterinarioCrudRepository;
    @Autowired
    private VeterinarianMapper mapper;

    @Override
    public List<Veterinarian> getAll() {
        List<Veterinario> veterinarios = (List<Veterinario>) veterinarioCrudRepository.findAll();
        return mapper.toVeterinarians(veterinarios);
    }

    @Override
    public Optional<Veterinarian> getVeterinarian(int veterinarianId) {
        return veterinarioCrudRepository.findById(veterinarianId)
                .map(mapper::toVeterinarian);
    }

    @Override
    public List<Veterinarian> getBySpecialty(String specialty) {
        List<Veterinario> veterinarios = veterinarioCrudRepository.findByEspecialidad(specialty);
        return mapper.toVeterinarians(veterinarios);
    }

    @Override
    public boolean existsByLicenseNumber(String licenseNumber) {
        return veterinarioCrudRepository.existsByNumeroColegiado(licenseNumber);
    }

    @Override
    public Veterinarian save(Veterinarian veterinarian) {
        Veterinario veterinario;

        if (veterinarian.getVeterinarianId() == 0) {
            // Crear nuevo veterinario
            veterinario = mapper.toVeterinario(veterinarian);

            // Asociar solo el ID del usuario
            Usuario usuario = new Usuario();
            usuario.setIdUsuario(veterinarian.getUser().getUserId());
            veterinario.setUsuario(usuario);

        } else {
            // Editar veterinario existente
            Optional<Veterinario> existenteOpt = veterinarioCrudRepository.findById(veterinarian.getVeterinarianId());

            if (existenteOpt.isPresent()) {
                Veterinario existente = existenteOpt.get();

                // Actualizar solo campos modificables
                existente.setEspecialidad(veterinarian.getSpecialty());
                existente.setNumeroColegiado(veterinarian.getLicenseNumber());

                // Si necesitas actualizar también el usuario, puedes hacerlo aquí (opcional)

                veterinario = existente;
            } else {
                // No encontrado, crear nuevo
                veterinario = mapper.toVeterinario(veterinarian);
                Usuario usuario = new Usuario();
                usuario.setIdUsuario(veterinarian.getUser().getUserId());
                veterinario.setUsuario(usuario);
            }
        }

        return mapper.toVeterinarian(veterinarioCrudRepository.save(veterinario));
    }

    @Override
    public void delete(int veterinarianId) {
        veterinarioCrudRepository.deleteById(veterinarianId);
    }
}
