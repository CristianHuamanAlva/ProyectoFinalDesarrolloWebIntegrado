package com.example.PetCare.PetCare.persistance;

import com.example.PetCare.PetCare.domain.Pet;
import com.example.PetCare.PetCare.domain.repository.PetRepository;
import com.example.PetCare.PetCare.persistance.crud.MascotaCrudRepository;
import com.example.PetCare.PetCare.persistance.entity.Duenio;
import com.example.PetCare.PetCare.persistance.entity.HistoriaClinica;
import com.example.PetCare.PetCare.persistance.entity.Mascota;
import com.example.PetCare.PetCare.persistance.mapper.PetMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class MascotaRepository implements PetRepository {

    @Autowired
    private MascotaCrudRepository mascotaCrudRepository;

    @Autowired
    private PetMapper mapper;

    @Override
    public List<Pet> getAll() {
        List<Mascota> mascotas = (List<Mascota>) mascotaCrudRepository.findAll();
        return mapper.toPets(mascotas);
    }

    @Override
    public Optional<Pet> getPet(int petId) {
        return mascotaCrudRepository.findById(petId)
                .map(mascota -> mapper.toPet(mascota));
    }

    @Override
    public List<Pet> getByOwnerId(int ownerId) {
        List<Mascota> mascotas = mascotaCrudRepository.findByDuenio_IdDuenio(ownerId);
        return mapper.toPets(mascotas);
    }

    @Override
    public List<Pet> getBySpecies(String species) {
        List<Mascota> mascotas = mascotaCrudRepository.findByEspecie(species);
        return mapper.toPets(mascotas);
    }

    @Override
    public Pet save(Pet pet) {
        Mascota mascota;

        if (pet.getPetId() == 0) {
            // Crear nueva mascota
            mascota = mapper.toMascota(pet);

            // Asociar dueño correctamente, solo con id para evitar problemas
            if (pet.getOwner() != null) {
                Duenio duenio = new Duenio();
                duenio.setIdDuenio(pet.getOwner().getOwnerId());
                mascota.setDuenio(duenio);
            }
            //  Crear y asociar historia clínica vacía
            HistoriaClinica historiaClinica = new HistoriaClinica();
            historiaClinica.setMascota(mascota);
            mascota.setHistoriaClinica(historiaClinica);

        } else {
            // Editar mascota existente
            Optional<Mascota> existenteOpt = mascotaCrudRepository.findById(pet.getPetId());
            if (existenteOpt.isPresent()) {
                Mascota existente = existenteOpt.get();

                // Actualizar campos editables
                existente.setNombre(pet.getName());
                existente.setEspecie(pet.getSpecies());
                existente.setRaza(pet.getBreed());
                existente.setFechaNacimiento(pet.getBirthDate());

                // Actualizar dueño solo la referencia id para mantener integridad
                if (pet.getOwner() != null) {
                    Duenio duenio = new Duenio();
                    duenio.setIdDuenio(pet.getOwner().getOwnerId());
                    existente.setDuenio(duenio);
                } else {
                    existente.setDuenio(null);
                }

                mascota = existente;
            } else {
                // Si no existe, crear nuevo (similar a arriba)
                mascota = mapper.toMascota(pet);
                if (pet.getOwner() != null) {
                    Duenio duenio = new Duenio();
                    duenio.setIdDuenio(pet.getOwner().getOwnerId());
                    mascota.setDuenio(duenio);
                }
                HistoriaClinica historiaClinica = new HistoriaClinica();
                historiaClinica.setMascota(mascota);
                mascota.setHistoriaClinica(historiaClinica);
            }
        }

        // Guardar y retornar mapeado a dominio
        return mapper.toPet(mascotaCrudRepository.save(mascota));
    }


    @Override
    public void delete(int petId) {
        mascotaCrudRepository.deleteById(petId);
    }
}
