package com.example.PetCare.PetCare.web.controller;

import com.example.PetCare.PetCare.domain.Owner;
import com.example.PetCare.PetCare.domain.service.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/owners")
public class OwnerController {

    @Autowired
    private OwnerService ownerService;

    @GetMapping("/all")
    public List<Owner> getAll() {
        return ownerService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Owner> getOwner(@PathVariable("id") int ownerId) {
        return ownerService.getOwner(ownerId);
    }

    @GetMapping("/user/{userId}")
    public Optional<Owner> getByUserId(@PathVariable("userId") int userId) {
        return ownerService.getByUserId(userId);
    }

    @GetMapping("/address/{address}")
    public List<Owner> getByAddress(@PathVariable("address") String address) {
        return ownerService.getByAddress(address);
    }

    @GetMapping("/phone/{phone}")
    public Optional<Owner> getByPhone(@PathVariable("phone") String phone) {
        return ownerService.getByPhone(phone);
    }

    @PostMapping("/save")
    public Owner save(@RequestBody Owner owner) {
        return ownerService.save(owner);
    }

    @DeleteMapping("/delete/{id}")
    public boolean delete(@PathVariable("id") int ownerId) {
        return ownerService.delete(ownerId);
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
