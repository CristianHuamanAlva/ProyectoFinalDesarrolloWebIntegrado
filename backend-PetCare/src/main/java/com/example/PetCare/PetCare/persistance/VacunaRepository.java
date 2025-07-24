package com.example.PetCare.PetCare.persistance;

import com.example.PetCare.PetCare.domain.Vaccine;
import com.example.PetCare.PetCare.domain.repository.VaccineRepository;
import com.example.PetCare.PetCare.persistance.crud.VacunaCrudRepository;
import com.example.PetCare.PetCare.persistance.entity.Vacuna;
import com.example.PetCare.PetCare.persistance.mapper.VaccineMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class VacunaRepository implements VaccineRepository {

    @Autowired
    private VacunaCrudRepository vacunaCrudRepository;

    @Autowired
    private VaccineMapper mapper;

    @Override
    public List<Vaccine> getAll() {
        List<Vacuna> vacunas = (List<Vacuna>) vacunaCrudRepository.findAll();
        return mapper.toVaccines(vacunas);
    }

    @Override
    public List<Vaccine> getByPrice() {
        List<Vacuna> vacunas = (List<Vacuna>) vacunaCrudRepository.findAllByOrderByPrecioAsc();
        return mapper.toVaccines(vacunas);
    }

    @Override
    public Optional<List<Vaccine>> getByName(String name) {
        Optional<List<Vacuna>> vacunas = vacunaCrudRepository.findByNombreContainingIgnoreCase(name);
        return vacunas.map(vaccs -> mapper.toVaccines(vaccs));
    }

    @Override
    public Optional<List<Vaccine>> getByDosis(int dosisNumber) {
        Optional<List<Vacuna>> vacunas = vacunaCrudRepository.findByDosis(dosisNumber);
        return vacunas.map(vaccs -> mapper.toVaccines(vaccs));
    }

    @Override
    public Optional<Vaccine> getVaccine(int vaccineId) {
        return vacunaCrudRepository.findById(vaccineId).map(vacuna -> mapper.toVaccine(vacuna));
    }

    @Override
    public Vaccine save(Vaccine vaccine) {
        Vacuna vacuna = mapper.toVacuna(vaccine);
        return mapper.toVaccine(vacunaCrudRepository.save(vacuna));
    }

    @Override
    public void delete(int vaccineId) {
        vacunaCrudRepository.deleteById(vaccineId);
    }
}
