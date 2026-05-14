package com.diegorr.objectives.models;

import lombok.Getter;

@Getter
public enum EstadoSalud {
    // FÍSICOS
    OXIDADO("Sedentario", "SISTEMA_LENTO", "FISICO"),
    INICIADO("Activo", "MOTOR_EN_MARCHA", "FISICO"),
    EQUILIBRADO("Saludable", "SINCRO_OPTIMA", "FISICO"),
    IMPARABLE("Atleta", "MAXIMO_RENDIMIENTO", "FISICO"),
    ELITE("Fuerte", "POTENCIAL_LIMITLESS", "FISICO"),
    HERIDO("En recuperación", "AVISO_DAÑO_ESTRUCTURAL", "FISICO"),
    REPOSO("Retirado", "MODO_AHORRO_ENERGIA", "FISICO"),

    // MENTALES
    ZENIT("Mente clara", "CONEXIÓN_NEURAL_TOTAL", "MENTAL"),
    EN_FOCO("Flow", "PROCESAMIENTO_PRIORITARIO", "MENTAL"),
    QUEMADO("Burnout", "ALERTA_SOBRECARGA_COGNITIVA", "MENTAL"),
    DIFUSO("Niebla mental", "SEÑAL_FRAGMENTADA", "MENTAL"),
    INQUEBRANTABLE("Resiliencia", "NUCLEO_ESTABLE", "MENTAL");

    private final String descripcion;
    private final String sistemaMsg;
    private final String categoria;

    // Constructor
    EstadoSalud(String descripcion, String sistemaMsg, String categoria) {
        this.descripcion = descripcion;
        this.sistemaMsg = sistemaMsg;
        this.categoria = categoria;
    }

    // Getters para que Jackson los envíe al Front en el JSON
    public String getDescripcion() { return descripcion; }
    public String getSistemaMsg() { return sistemaMsg; }
    public String getCategoria() { return categoria; }
}