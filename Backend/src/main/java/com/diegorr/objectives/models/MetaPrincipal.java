package com.diegorr.objectives.models;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "meta_principal")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MetaPrincipal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "El nombre es obligatorio")
    @Column(nullable = false)
    private String nombre;

    @Column(length = 200)
    private String descripcion;

    @NotNull(message = "El porcentaje de éxito es obligatorio")
    @Column(nullable = false, precision = 10) // nullable=false para DB
    private Double porcentajeExito = 0.0;

    @Column(nullable = false)
    private Boolean activo = true;

    @NotNull(message = "La fecha de inicio es obligatoria")
    @Column(nullable = false)
    private LocalDate fechaInicio;

    @NotNull(message = "La fecha de fin es obligatoria")
    @Column(nullable = false)
    private LocalDate fechaFin;

    // IMPORTANTE: cascade y orphanRemoval para que la base de datos se limpie sola
    @OneToMany(mappedBy = "metaPrincipal", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Objetivo> objetivos;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
}