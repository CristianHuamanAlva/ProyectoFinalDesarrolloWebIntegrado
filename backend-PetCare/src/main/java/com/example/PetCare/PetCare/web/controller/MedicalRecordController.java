package com.example.PetCare.PetCare.web.controller;

import com.example.PetCare.PetCare.domain.MedicalRecord;
import com.example.PetCare.PetCare.domain.service.MedicalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/medical-records")
public class MedicalRecordController {
    @Autowired
    private MedicalRecordService medicalRecordService;

    @GetMapping("/all")
    public List<MedicalRecord> getAll() {
        return medicalRecordService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<MedicalRecord> getMedicalRecord(@PathVariable("id") int id) {
        return medicalRecordService.getMedicalRecord(id);
    }

    @GetMapping("/pet/{petId}")
    public Optional<MedicalRecord> getByPetId(@PathVariable("petId") int petId) {
        return medicalRecordService.getByPetId(petId);
    }

    @PostMapping("/save")
    public MedicalRecord save(@RequestBody MedicalRecord medicalRecord) {
        return medicalRecordService.save(medicalRecord);
    }

    @DeleteMapping("/delete/{id}")
    public boolean delete(@PathVariable("id") int id) {
        return medicalRecordService.delete(id);
    }
}
