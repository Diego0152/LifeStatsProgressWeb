package com.diegorr.objectives.repositories;

import com.diegorr.objectives.models.RegistroActividad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface RegistroActividadRepository extends JpaRepository<RegistroActividad, Long> {
    
    // Para ver el historial de un objetivo concreto
    List<RegistroActividad> findByObjetivoIdOrderByFechaDesc(Long objetivoId);
    
    // Para comprobar si ya existe un registro para hoy
    Optional<RegistroActividad> findByObjetivoIdAndFecha(Long objetivoId, LocalDate fecha);
}