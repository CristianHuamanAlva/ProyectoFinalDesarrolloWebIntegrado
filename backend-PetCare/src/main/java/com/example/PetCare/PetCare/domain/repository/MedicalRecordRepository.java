package com.example.PetCare.PetCare.domain.repository;

import com.example.PetCare.PetCare.domain.MedicalRecord;

import java.util.List;
import java.util.Optional;

public interface MedicalRecordRepository {
    List<MedicalRecord> getAll();
    Optional<MedicalRecord> getByPetId(int petId);
    Optional<MedicalRecord> getMedicalRecord(int medicalRecordId);
    MedicalRecord save(MedicalRecord medicalRecord);
    void delete(int medicalRecordId);
}
