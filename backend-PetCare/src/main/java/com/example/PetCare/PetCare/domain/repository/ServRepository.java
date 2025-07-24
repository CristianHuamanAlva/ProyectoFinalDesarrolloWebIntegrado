package com.example.PetCare.PetCare.domain.repository;

import com.example.PetCare.PetCare.domain.Serv;

import java.util.List;
import java.util.Optional;

public interface ServRepository {

    List<Serv>getAll();
    Optional<List<Serv>>getByName(String name);
    Optional<List<Serv>>getByCostoLessThan(double maxPrice);
    Optional<List<Serv>>getByCostoGreaterThanEqual(double minPrice);
    Optional<List<Serv>>getByCostoBetween(double from, double until);
    Optional<Serv> getService(int serviceId);
    Serv save(Serv serv);
    void delete(int serviceId);
}
