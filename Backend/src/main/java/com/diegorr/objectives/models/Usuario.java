package com.diegorr.objectives.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "usuarios")
@Data
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El email no puede estar vacío")
    @Email(message = "Formato de email inválido")
    @Column(unique = true, nullable = false)
    private String correo;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 8, message = "Mínimo 8 caracteres")
    @Column(nullable = false)
    private String contrasenna;

    @NotBlank(message = "El nombre no puede estar vacío")
    @Column(nullable = false)
    private String nombre;

    @Enumerated(EnumType.STRING)
    @Column(nullable = true)
    private EstadoSalud estadoSalud;

    @Column(nullable = true)
    private Integer edad;

    // Relación para poder ver las metas desde el usuario
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<MetaPrincipal> metas;

    @Column(nullable = false)
    private Boolean activo = false;
}