package com.diegorr.objectives.models;

import java.time.LocalDate;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "registro_actividades")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistroActividad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private LocalDate fecha; // Mejor LocalDate que String para filtrar por fechas

    @Column(nullable = false)
    private Boolean completado = false; // "actividadRealizada" mejor como boolean (Hecho/No hecho)

    @ManyToOne
    @JoinColumn(name = "objetivo_id", nullable = false)
    private Objetivo objetivo;
}