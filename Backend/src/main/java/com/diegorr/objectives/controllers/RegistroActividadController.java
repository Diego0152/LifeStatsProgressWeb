package com.diegorr.objectives.controllers;

import com.diegorr.objectives.models.RegistroActividad;
import com.diegorr.objectives.repositories.RegistroActividadRepository;
import com.diegorr.objectives.repositories.ObjetivoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registros")
public class RegistroActividadController {

    @Autowired
    private RegistroActividadRepository registroRepository;

    @Autowired
    private ObjetivoRepository objetivoRepository;

    // Crear un registro (Marcar check diario)
    @PostMapping
    public ResponseEntity<?> registrarActividad(@Valid @RequestBody RegistroActividad registro) {
        // 1. Verificar si ya existe registro para ese objetivo en esa fecha
        if (registroRepository.findByObjetivoIdAndFecha(
                registro.getObjetivo().getId(), registro.getFecha()).isPresent()) {
            return ResponseEntity.badRequest().body("Ya existe un registro para este objetivo en la fecha indicada.");
        }

        // 2. Guardar el registro
        RegistroActividad nuevoRegistro = registroRepository.save(registro);

        // 3. Lógica simple de racha: Si completado es true, aumentamos la racha en el Objetivo
        if (Boolean.TRUE.equals(nuevoRegistro.getCompletado())) {
            objetivoRepository.findById(nuevoRegistro.getObjetivo().getId()).ifPresent(obj -> {
                obj.setRachaAciertos(obj.getRachaAciertos() + 1);
                objetivoRepository.save(obj);
            });
        }

        return ResponseEntity.ok(nuevoRegistro);
    }

    // Obtener historial de un objetivo
    @GetMapping("/objetivo/{objetivoId}")
    public List<RegistroActividad> listarPorObjetivo(@PathVariable Long objetivoId) {
        return registroRepository.findByObjetivoIdOrderByFechaDesc(objetivoId);
    }

    // Cambiar un estado (por si el usuario se equivocó y quiere desmarcar el check)
    @PatchMapping("/{id}/toggle")
    public ResponseEntity<RegistroActividad> toggleCompletado(@PathVariable Long id) {
        return registroRepository.findById(id).map(reg -> {
            reg.setCompletado(!reg.getCompletado());
            return ResponseEntity.ok(registroRepository.save(reg));
        }).orElse(ResponseEntity.notFound().build());
    }
}