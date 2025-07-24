package com.example.PetCare.PetCare.domain.service;

import com.example.PetCare.PetCare.domain.MedicalRecord;
import com.example.PetCare.PetCare.domain.repository.MedicalRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicalRecordService {

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    public List<MedicalRecord> getAll() {
        return medicalRecordRepository.getAll();
    }

    public Optional<MedicalRecord> getByPetId(int petId) {
        return medicalRecordRepository.getByPetId(petId);
    }

    public Optional<MedicalRecord> getMedicalRecord(int medicalRecordId) {
        return medicalRecordRepository.getMedicalRecord(medicalRecordId);
    }

    public MedicalRecord save(MedicalRecord medicalRecord) {
        return medicalRecordRepository.save(medicalRecord);
    }

    public boolean delete(int medicalRecordId) {
        return getMedicalRecord(medicalRecordId).map(medRec -> {
            medicalRecordRepository.delete(medicalRecordId);
            return true;
        }).orElse(false);
    }
}
