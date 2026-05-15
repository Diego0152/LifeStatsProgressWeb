package com.diegorr.objectives.models;

import lombok.Getter;

@Getter
public enum EstadoSalud {
    // FÍSICOS (Gama de Azules/Cian/Verde)
    OXIDADO("Sedentario", "SISTEMA_LENTO", "FISICO", "#555555"),
    INICIADO("Activo", "MOTOR_EN_MARCHA", "FISICO", "#00d4ff"),
    EQUILIBRADO("Saludable", "SINCRO_OPTIMA", "FISICO", "#00ffcc"),
    IMPARABLE("Atleta", "MAXIMO_RENDIMIENTO", "FISICO", "#00ff41"),
    ELITE("Fuerte", "POTENCIAL_LIMITLESS", "FISICO", "#ccff00"),
    REPOSO("Retirado", "MODO_AHORRO_ENERGIA", "FISICO", "#33ccff"),
    HERIDO("Daño detectado", "AVISO_DAÑO_ESTRUCTURAL", "FISICO", "#ff003c"),

    // MENTALES (Gama de Púrpuras/Rosas/Naranjas)
    ZENIT("Mente clara", "CONEXIÓN_NEURAL_TOTAL", "MENTAL", "#bc00ff"),
    EN_FOCO("Flow", "PROCESAMIENTO_PRIORITARIO", "MENTAL", "#7000ff"),
    QUEMADO("Burnout", "ALERTA_SOBRECARGA_COGNITIVA", "MENTAL", "#ff4e00"),
    DIFUSO("Niebla mental", "SEÑAL_FRAGMENTADA", "MENTAL", "#ff00c8"),
    INQUEBRANTABLE("Resiliencia", "NUCLEO_ESTABLE", "MENTAL", "#ffb400");

    private final String descripcion;
    private final String sistemaMsg;
    private final String categoria;
    private final String color; // <--- El nuevo parámetro

    // Constructor actualizado
    EstadoSalud(String descripcion, String sistemaMsg, String categoria, String color) {
        this.descripcion = descripcion;
        this.sistemaMsg = sistemaMsg;
        this.categoria = categoria;
        this.color = color;
    }

    // Getters
    public String getDescripcion() { return descripcion; }
    public String getSistemaMsg() { return sistemaMsg; }
    public String getCategoria() { return categoria; }
    public String getColor() { return color; }
}