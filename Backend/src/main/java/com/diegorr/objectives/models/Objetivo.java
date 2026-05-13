package com.diegorr.objectives.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "objetivos")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Objetivo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "El nombre del objetivo es obligatorio")
    @Column(nullable = false)
    private String nombre;

    private String descripcion;

    @Column(nullable = false)
    private Integer rachaAciertos = 0;

    // Aquí está la unión con MetaPrincipal
    @ManyToOne
    @JoinColumn(name = "meta_id", nullable = false)
    private MetaPrincipal metaPrincipal;

    @OneToMany(mappedBy = "objetivo", cascade = CascadeType.ALL)
    private List<RegistroActividad> registros;
}