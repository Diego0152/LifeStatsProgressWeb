package com.diegorr.objectives.models;

import lombok.Getter;

@Getter
public enum EstadoEdad {
    INFANTE(0, 3, "PROTOCOLO_INFANTE", "V-01", "#00f3ff"),
    NINO(4, 12, "FASE_DESARROLLO", "V-02", "#7000ff"),
    ADOLESCENTE(13, 17, "EXPANSION_NEURAL", "V-03", "#ff00c8"),
    ADULTO(18, 66, "UNIDAD_OPERATIVA", "V-04", "#00ff41"),
    SENIOR(67, 100, "LEGADO_SABIDURIA", "V-05", "#ffb400");

    private final int min;
    private final int max;
    private final String label;
    private final String code;
    private final String color;

    EstadoEdad(int min, int max, String label, String code, String color) {
        this.min = min;
        this.max = max;
        this.label = label;
        this.code = code;
        this.color = color;
    }

    // Método de utilidad para encontrar la etapa según el número
    public static EstadoEdad desdeEdad(int edad) {
        for (EstadoEdad estado : values()) {
            if (edad >= estado.min && edad <= estado.max) return estado;
        }
        return ADULTO; // Default
    }
}
