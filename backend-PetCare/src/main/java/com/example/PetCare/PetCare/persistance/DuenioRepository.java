package com.example.PetCare.PetCare.persistance;

import com.example.PetCare.PetCare.domain.Owner;
import com.example.PetCare.PetCare.domain.repository.OwnerRepository;
import com.example.PetCare.PetCare.persistance.crud.DuenioCrudRepository;
import com.example.PetCare.PetCare.persistance.entity.Duenio;
import com.example.PetCare.PetCare.persistance.entity.Usuario;
import com.example.PetCare.PetCare.persistance.mapper.OwnerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class DuenioRepository implements OwnerRepository {

    @Autowired
    private DuenioCrudRepository duenioCrudRepository;

    @Autowired
    private OwnerMapper mapper;


    @Override
    public List<Owner> getAll() {
        return mapper.toOwners((List<Duenio>) duenioCrudRepository.findAll());
    }

    @Override
    public Optional<Owner> getOwner(int ownerId) {
        return duenioCrudRepository.findById(ownerId).map(mapper::toOwner);
    }

    @Override
    public Optional<Owner> getByUserId(int userId) {
        return duenioCrudRepository.findByUsuario_IdUsuario(userId).map(mapper::toOwner);
    }

    @Override
    public List<Owner> getByAddress(String address) {
        return duenioCrudRepository.findByDireccionContainingIgnoreCase(address)
                .stream()
                .map(mapper::toOwner)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Owner> getByPhone(String phone) {
        return duenioCrudRepository.findByTelefono(phone).map(mapper::toOwner);
    }

    @Override
    public boolean existsByUserId(int userId) {
        return duenioCrudRepository.existsByUsuario_IdUsuario(userId);
    }

    @Override
    public Owner save(Owner owner) {
        Duenio duenio;

        // 🔍 Buscar si ya existe un dueño vinculado a ese usuario, aunque ownerId sea 0
        Optional<Duenio> existentePorUsuario = duenioCrudRepository.findByUsuario_IdUsuario(owner.getUser().getUserId());

        if (owner.getOwnerId() == 0 && existentePorUsuario.isPresent()) {
            // 🟢 Reutilizar el dueño existente aunque no se haya enviado ownerId
            Duenio existente = existentePorUsuario.get();
            existente.setTelefono(owner.getPhone());
            existente.setDireccion(owner.getAddress());
            duenio = existente;

        } else if (owner.getOwnerId() != 0) {
            // 🟢 Caso normal: se envió un ownerId válido
            Optional<Duenio> existenteOpt = duenioCrudRepository.findById(owner.getOwnerId());
            if (existenteOpt.isPresent()) {
                Duenio existente = existenteOpt.get();
                existente.setTelefono(owner.getPhone());
                existente.setDireccion(owner.getAddress());
                duenio = existente;
            } else {
                // ⚠️ Owner ID enviado pero no existe, fallback
                duenio = mapper.toDuenio(owner);
                Usuario usuario = new Usuario();
                usuario.setIdUsuario(owner.getUser().getUserId());
                duenio.setUsuario(usuario);
            }

        } else {
            // 🆕 No hay ownerId ni dueño existente → crear uno nuevo
            duenio = mapper.toDuenio(owner);
            Usuario usuario = new Usuario();
            usuario.setIdUsuario(owner.getUser().getUserId());
            duenio.setUsuario(usuario);
        }

        return mapper.toOwner(duenioCrudRepository.save(duenio));
    }


    @Override
    public void delete(int ownerId) {
        duenioCrudRepository.deleteById(ownerId);
    }
}
