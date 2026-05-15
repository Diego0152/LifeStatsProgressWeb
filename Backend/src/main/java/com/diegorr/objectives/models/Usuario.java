package com.diegorr.objectives.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "usuarios")
@Data
public class Usuario implements UserDetails {

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

    @ElementCollection(targetClass = EstadoSalud.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "usuario_estados_salud", joinColumns = @JoinColumn(name = "usuario_id"))
    @Column(name = "estado_salud")
    private List<EstadoSalud> estadoSalud = new ArrayList<>();

    @Column(nullable = true)
    private String fotoPerfil;

    @Column(nullable = true)
    private Integer edad;

    @Enumerated(EnumType.STRING)
    @Column(name = "etapa_vida")
    private EstadoEdad etapaVida;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoUsuario tipoUsuario = TipoUsuario.USER; // Por defecto, todos son USER

    // Relación para poder ver las metas desde el usuario
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<MetaPrincipal> metas;

    @Column(nullable = false)
    private Boolean activo = false;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() { return List.of(); }
    
    @Override
    public String getPassword() { return this.contrasenna; }
    
    @Override
    public String getUsername() { return this.nombre; }
    
    // Todos estos deben retornar true para que el login no de 401
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }

    public void actualizarBiometria(int edad) {
        this.edad = edad;
        this.etapaVida = EstadoEdad.desdeEdad(edad);
    }

    public void actualizarEstadosSalud(List<EstadoSalud> nuevosEstados) {
        this.estadoSalud.clear();
        this.estadoSalud.addAll(nuevosEstados);
    }
}