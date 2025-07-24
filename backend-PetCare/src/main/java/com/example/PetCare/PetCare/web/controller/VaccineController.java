package com.example.PetCare.PetCare.web.controller;

import com.example.PetCare.PetCare.domain.Vaccine;
import com.example.PetCare.PetCare.domain.service.VaccineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/vaccines")
public class VaccineController {

    @Autowired
    private VaccineService vaccineService;

    @GetMapping("/all")
    public List<Vaccine> getAll() {
        return vaccineService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Vaccine> getVaccine(@PathVariable("id") int vaccineId) {
        return vaccineService.getVaccine(vaccineId);
    }

    @GetMapping("/name/{name}")
    public Optional<List<Vaccine>> getByName(@PathVariable("name") String name) {
        return vaccineService.getByName(name);
    }

    @GetMapping("/price")
    public List<Vaccine> getByPrice() {
        return vaccineService.getByPrice();
    }

    @GetMapping("/dosis/{dosis}")
    public Optional<List<Vaccine>> getByDosis(@PathVariable("dosis") int dosis) {
        return vaccineService.getByDosis(dosis);
    }

    @PostMapping("/save")
    public Vaccine save(@RequestBody Vaccine vaccine) {
        return vaccineService.save(vaccine);
    }

    @DeleteMapping("/delete/{id}")
    public boolean delete(@PathVariable("id") int vaccineId) {
        return vaccineService.delete(vaccineId);
    }
}
