package com.example.PetCare.PetCare.web.controller;

import com.example.PetCare.PetCare.domain.Pet;
import com.example.PetCare.PetCare.domain.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pets")
public class PetController {

    @Autowired
    private PetService petService;

    @GetMapping("/all")
    public List<Pet> getAll() {
        return petService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Pet> getPet(@PathVariable("id") int petId) {
        return petService.getPet(petId);
    }

    @GetMapping("/owner/{ownerId}")
    public List<Pet> getByOwnerId(@PathVariable("ownerId") int ownerId) {
        return petService.getByOwnerId(ownerId);
    }

    @GetMapping("/species/{species}")
    public List<Pet> getBySpecies(@PathVariable("species") String species) {
        return petService.getBySpecies(species);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Pet save(@RequestBody Pet pet) {
        return petService.save(pet);
    }

    @DeleteMapping("/delete/{id}")
    public boolean delete(@PathVariable("id") int petId) {
        return petService.delete(petId);
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
