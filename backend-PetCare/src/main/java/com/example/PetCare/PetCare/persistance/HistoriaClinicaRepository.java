package com.example.PetCare.PetCare.persistance;

import com.example.PetCare.PetCare.domain.MedicalRecord;
import com.example.PetCare.PetCare.domain.repository.MedicalRecordRepository;
import com.example.PetCare.PetCare.persistance.crud.HistoriaClinicaCrudRepository;
import com.example.PetCare.PetCare.persistance.entity.HistoriaClinica;
import com.example.PetCare.PetCare.persistance.mapper.MedicalRecordMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class HistoriaClinicaRepository implements MedicalRecordRepository {

    @Autowired
    private HistoriaClinicaCrudRepository historiaClinicaCrudRepository;

    @Autowired
    private MedicalRecordMapper mapper;

    @Override
    public List<MedicalRecord> getAll() {
        List<HistoriaClinica> historiaClinicas = (List<HistoriaClinica>) historiaClinicaCrudRepository.findAll();
        return mapper.toMedicalRecords(historiaClinicas);
    }

    @Override
    public Optional<MedicalRecord> getByPetId(int petId) {
        return historiaClinicaCrudRepository.findByMascota_IdMascota(petId).map(historiaClinica -> mapper.toMedicalRecord(historiaClinica));
    }

    @Override
    public Optional<MedicalRecord> getMedicalRecord(int medicalRecordId) {
        return historiaClinicaCrudRepository.findById(medicalRecordId).map(historiaClinica -> mapper.toMedicalRecord(historiaClinica));
    }

    @Override
    public MedicalRecord save(MedicalRecord medicalRecord) {
        HistoriaClinica historiaClinica = mapper.toHistoriaClinica(medicalRecord);
        return mapper.toMedicalRecord(historiaClinicaCrudRepository.save(historiaClinica));
    }

    @Override
    public void delete(int medicalRecordId) {
        historiaClinicaCrudRepository.deleteById(medicalRecordId);
    }
}
