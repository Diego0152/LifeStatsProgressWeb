package com.diegorr.objectives.repositories;

import com.diegorr.objectives.models.Objetivo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ObjetivoRepository extends JpaRepository<Objetivo, Long> {
    
    // Para ver todos los objetivos de una meta específica
    List<Objetivo> findByMetaPrincipalId(Long metaId);
    
    // Para el ranking de mejores hábitos del usuario
    List<Objetivo> findTop3ByMetaPrincipalUsuarioIdOrderByRachaAciertosDesc(Long usuarioId);
}