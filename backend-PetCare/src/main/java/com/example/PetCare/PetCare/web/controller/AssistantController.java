package com.example.PetCare.PetCare.web.controller;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.PetCare.PetCare.domain.Assistant;
import com.example.PetCare.PetCare.domain.service.AssistantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/assistants")
public class AssistantController {

    @Autowired
    private AssistantService assistantService;

    @GetMapping("/all")
    public List<Assistant> getAll() {
        return assistantService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Assistant> getAssistant(@PathVariable("id") int assistantId) {
        return assistantService.getAssistant(assistantId);
    }

    @GetMapping("/user/{userId}")
    public List<Assistant> getByUserId(@PathVariable("userId") int userId) {
        return assistantService.getByUserId(userId);
    }

    @GetMapping("/functions/{functions}")
    public List<Assistant> getByFunctions(@PathVariable("functions") String functions) {
        return assistantService.getByFunctions(functions);
    }

    @PostMapping("/save")
    public Assistant save(@RequestBody Assistant assistant) {
        return assistantService.save(assistant);
    }

    @DeleteMapping("/delete/{id}")
    public boolean delete(@PathVariable("id") int assistantId) {
        return assistantService.delete(assistantId);
    }

    @ControllerAdvice
    public class GlobalExceptionHandler {
        @ExceptionHandler(Exception.class)
        @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
        @ResponseBody
        public String handleAllExceptions(Exception ex) {
            return "Ocurrió un error interno: " + ex.getMessage();
        }
    }
}
