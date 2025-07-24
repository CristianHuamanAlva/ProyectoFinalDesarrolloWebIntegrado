package com.example.PetCare.PetCare.domain.service;
import com.example.PetCare.PetCare.domain.Serv;
import com.example.PetCare.PetCare.domain.repository.ServRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServService {

    @Autowired
    private ServRepository servRepository;

    public List<Serv> getAll() {
        return servRepository.getAll();
    }

    public Optional<List<Serv>> getByName(String name) {
        return servRepository.getByName(name);
    }

    public Optional<List<Serv>> getByCostoLessThan(double maxPrice) {
        return servRepository.getByCostoLessThan(maxPrice);
    }

    public Optional<List<Serv>> getByCostoGreaterThanEqual(double maxPrice) {
        return servRepository.getByCostoGreaterThanEqual(maxPrice);
    }

    public Optional<List<Serv>> getByCostoBetween(double from, double until) {
        return servRepository.getByCostoBetween(from, until);
    }

    public Optional<Serv> getService(int serviceId) {
        return servRepository.getService(serviceId);
    }

    public Serv save(Serv serv) {
        return servRepository.save(serv);
    }

    public boolean delete(int serviceId) {
        return getService(serviceId).map(serv -> {
            servRepository.delete(serviceId);
            return true;
        }).orElse(false);
    }

}
