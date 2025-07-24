package com.example.PetCare.PetCare.web.controller;

import com.example.PetCare.PetCare.domain.User;
import com.example.PetCare.PetCare.domain.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public List<User> getAll() {
        return userService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<User> getUser(@PathVariable("id") int userId) {
        return userService.getUser(userId);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<User> getByEmail(@PathVariable("email") String email) {
        return userService.getByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/role/{role}")
    public List<User> getByRole(@PathVariable("role") String role) {
        return userService.getByRole(role);
    }

    @PostMapping("/save")
    public User save(@RequestBody User user) {
        return userService.save(user);
    }

    @DeleteMapping("/delete/{id}")
    public boolean delete(@PathVariable("id") int userId) {
        return userService.delete(userId);
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
