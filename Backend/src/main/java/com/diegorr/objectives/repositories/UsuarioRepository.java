package com.diegorr.objectives.repositories;

import com.diegorr.objectives.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // Método personalizado para buscar por email (clave para el futuro login)
    Optional<Usuario> findByCorreo(String correo);
    
    // Para comprobar si un email ya existe antes de registrar
    boolean existsByCorreo(String correo);
}