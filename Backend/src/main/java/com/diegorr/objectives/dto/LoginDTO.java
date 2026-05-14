package com.diegorr.objectives.dto;

import lombok.Data;

@Data
public class LoginDTO {
    private String identificador; // Debe ser IGUAL al nombre en React
    private String contrasenna;

    // Getters y Setters
    public String getIdentificador() { return identificador; }
    public void setIdentificador(String identificador) { this.identificador = identificador; }
    public String getContrasenna() { return contrasenna; }
    public void setContrasenna(String contrasenna) { this.contrasenna = contrasenna; }
}