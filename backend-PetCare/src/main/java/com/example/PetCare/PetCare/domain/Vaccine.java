package com.example.PetCare.PetCare.domain;

public class Vaccine {
    private int vaccineId;
    private String name;
    private String description;
    private double price;
    private int dosisNumber;
    private Serv serv;

    public int getVaccineId() {
        return vaccineId;
    }

    public void setVaccineId(int vaccineId) {
        this.vaccineId = vaccineId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getDosisNumber() {
        return dosisNumber;
    }

    public void setDosisNumber(int dosisNumber) {
        this.dosisNumber = dosisNumber;
    }

    public Serv getServ() {
        return serv;
    }

    public void setServ(Serv serv) {
        this.serv = serv;
    }
}
