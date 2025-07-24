package com.example.PetCare.PetCare.web.controller;

import com.example.PetCare.PetCare.domain.Serv;
import com.example.PetCare.PetCare.domain.service.ServService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/services")
public class ServController {

    @Autowired
    private ServService servService;

    @GetMapping("/all")
    public List<Serv> getAll() {
        return servService.getAll();
    }
    @GetMapping("/{id}")
    public Optional<Serv> getService(@PathVariable("id") int serviceId) {
        return servService.getService(serviceId);
    }
    @GetMapping("/{name}")
    public Optional<List<Serv>> getByName(@PathVariable("name") String name) {
        return servService.getByName(name);
    }
    @PostMapping("/save")
    public Serv save(@RequestBody Serv serv) {
        return servService.save(serv);
    }
    @DeleteMapping("/delete/{id}")
    public boolean delete(@PathVariable("id") int serviceId) {
        return servService.delete(serviceId);
    }

}
