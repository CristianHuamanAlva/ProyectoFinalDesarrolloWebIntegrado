package com.example.PetCare.PetCare.persistance;

import com.example.PetCare.PetCare.domain.Serv;
import com.example.PetCare.PetCare.domain.repository.ServRepository;
import com.example.PetCare.PetCare.persistance.crud.ServicioCrudRepository;
import com.example.PetCare.PetCare.persistance.entity.Servicio;
import com.example.PetCare.PetCare.persistance.mapper.ServMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public class ServicioRepository implements ServRepository {

    @Autowired
    private ServicioCrudRepository servicioCrudRepository;

    @Autowired
    private ServMapper mapper;

    @Override
    public List<Serv> getAll() {
        List<Servicio> servicios = (List<Servicio>) servicioCrudRepository.findAll();
        return mapper.toServices(servicios);
    }

    @Override
    public Optional<List<Serv>> getByName(String name) {
        List<Servicio> servicios = (List<Servicio>) servicioCrudRepository.findByNombreServicioContainingIgnoreCase(name);
        return Optional.of(mapper.toServices(servicios));
    }

    @Override
    public Optional<List<Serv>> getByCostoLessThan(double maxPrice) {
        Optional<List<Servicio>>  servicios = servicioCrudRepository.findByCostoLessThan(maxPrice);
        return servicios.map(servs -> mapper.toServices(servs));
    }

    @Override
    public Optional<List<Serv>> getByCostoGreaterThanEqual(double minPrice) {
        Optional<List<Servicio>>  servicios = servicioCrudRepository.findByCostoGreaterThanEqual(minPrice);
        return servicios.map(servs -> mapper.toServices(servs));
    }

    @Override
    public Optional<List<Serv>> getByCostoBetween(double from, double until) {
        Optional<List<Servicio>>  servicios = servicioCrudRepository.findByCostoBetween(from, until);
        return servicios.map(servs -> mapper.toServices(servs));
    }

    @Override
    public Optional<Serv> getService(int serviceId) {
        return servicioCrudRepository.findById(serviceId).map(servicio -> mapper.toService(servicio));
    }

    @Override
    public Serv save(Serv serv) {
        Servicio servicio;

        if (serv.getServiceId() == 0) {
            // Es un nuevo servicio
            servicio = mapper.toServicio(serv);
            servicio.setIdServicio(null); // Asegúrate de no pasar 0 o cualquier número
        } else {
            // Es una actualización
            Optional<Servicio> existenteOpt = servicioCrudRepository.findById(serv.getServiceId());
            if (existenteOpt.isPresent()) {
                servicio = existenteOpt.get();
                servicio.setNombreServicio(serv.getServiceName());
                servicio.setCosto(BigDecimal.valueOf(serv.getPrice())); // ✅ correcto

            } else {
                // Si no se encuentra, se crea como nuevo
                servicio = mapper.toServicio(serv);
                servicio.setIdServicio(null);
            }
        }

        Servicio guardado = servicioCrudRepository.save(servicio);
        return mapper.toService(guardado);
    }

    @Override
    public void delete(int serviceId) {
        servicioCrudRepository.deleteById(serviceId);
    }
}
