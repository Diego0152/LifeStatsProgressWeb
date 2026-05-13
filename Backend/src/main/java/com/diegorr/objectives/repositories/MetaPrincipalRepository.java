package com.diegorr.objectives.repositories;

import com.diegorr.objectives.models.MetaPrincipal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MetaPrincipalRepository extends JpaRepository<MetaPrincipal, Long> {
    
    // Para obtener solo las metas del usuario que está logueado
    List<MetaPrincipal> findByUsuarioId(Long usuarioId);
    
    // Para ver si el usuario tiene metas activas
    List<MetaPrincipal> findByUsuarioIdAndActivoTrue(Long usuarioId);
}