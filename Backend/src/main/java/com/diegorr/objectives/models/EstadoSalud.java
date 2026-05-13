package com.diegorr.objectives.models;

import lombok.Getter;

@Getter
public enum EstadoSalud {
    OXIDADO("Sedentario"),
    INICIADO("Activo"),
    EQUILIBRADO("Saludable"),
    IMPARABLE("Atleta"),
    ELITE("Fuerte"),
    HERIDO("En recuperación"),
    REPOSO("Retirado"),
    OTRO("Desconocido");

    private final String descripcion;

    EstadoSalud(String descripcion) {
        this.descripcion = descripcion;
    }
}