package com.example.PetCare.PetCare.web.controller;

import com.example.PetCare.PetCare.domain.Veterinarian;
import com.example.PetCare.PetCare.domain.service.VeterinarianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/veterinarians")
public class VeterinarianController {

    @Autowired
    private VeterinarianService veterinarianService;

    @GetMapping("/all")
    public List<Veterinarian> getAll() {
        return veterinarianService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Veterinarian> getVeterinarian(@PathVariable("id") int veterinarianId) {
        return veterinarianService.getVeterinarian(veterinarianId);
    }

    @GetMapping("/specialty/{specialty}")
    public List<Veterinarian> getBySpecialty(@PathVariable("specialty") String specialty) {
        return veterinarianService.getBySpecialty(specialty);
    }

    @PostMapping("/save")
    public Veterinarian save(@RequestBody Veterinarian veterinarian) {return veterinarianService.save(veterinarian);
    }

    @DeleteMapping("/delete/{id}")
    public boolean delete(@PathVariable("id") int veterinarianId) {
        return veterinarianService.delete(veterinarianId);
    }

    @ControllerAdvice
    public static class GlobalExceptionHandler {
        @ExceptionHandler(Exception.class)
        @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
        @ResponseBody
        public String handleAllExceptions(Exception ex) {
            return "Ocurrió un error interno: " + ex.getMessage();
        }
    }
}
