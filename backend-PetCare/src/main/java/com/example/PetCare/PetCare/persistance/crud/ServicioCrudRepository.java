package com.example.PetCare.PetCare.persistance.crud;

import com.example.PetCare.PetCare.persistance.entity.Servicio;
import org.springframework.data.repository.CrudRepository;
import java.util.List;
import java.util.Optional;

public interface ServicioCrudRepository extends CrudRepository<Servicio, Integer> {

    // Buscar servicios que contengan parte del nombre
    List<Servicio> findByNombreServicioContainingIgnoreCase(String nombreParcial);

    // Buscar servicios con costo menor a cierto valor
    Optional <List<Servicio>> findByCostoLessThan(double costoMaximo);

    // Buscar servicios con costo mayor o igual a cierto valor
    Optional <List<Servicio>> findByCostoGreaterThanEqual(double costoMinimo);

    // Buscar servicios por un rango de costo
    Optional <List<Servicio>> findByCostoBetween(double desde, double hasta);

}
