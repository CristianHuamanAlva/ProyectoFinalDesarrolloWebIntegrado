package com.example.PetCare.PetCare.domain;

public class Veterinarian {

    private int veterinarianId;
    private String specialty;
    private String licenseNumber;
    private User user;

    public int getVeterinarianId() {
        return veterinarianId;
    }

    public void setVeterinarianId(int veterinarianId) {
        this.veterinarianId = veterinarianId;
    }

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
