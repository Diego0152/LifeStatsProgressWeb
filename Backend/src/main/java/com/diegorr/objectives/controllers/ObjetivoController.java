package com.diegorr.objectives.controllers;

import com.diegorr.objectives.models.Objetivo;
import com.diegorr.objectives.repositories.ObjetivoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/objetivos")
public class ObjetivoController {

    @Autowired
    private ObjetivoRepository objetivoRepository;

    // Crear objetivo: El JSON debe traer "metaPrincipal": {"id": X}
    @PostMapping
    public ResponseEntity<Objetivo> crear(@Valid @RequestBody Objetivo objetivo) {
        return ResponseEntity.ok(objetivoRepository.save(objetivo));
    }

    // Listar objetivos de una meta
    @GetMapping("/meta/{metaId}")
    public List<Objetivo> listarPorMeta(@PathVariable Long metaId) {
        return objetivoRepository.findByMetaPrincipalId(metaId);
    }

    // Obtener un objetivo específico (Uso de Optional + ResponseEntity)
    @GetMapping("/{id}")
    public ResponseEntity<Objetivo> obtenerPorId(@PathVariable Long id) {
        return objetivoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Actualizar nombre, descripción o racha
    @PutMapping("/{id}")
    public ResponseEntity<Objetivo> actualizar(@PathVariable Long id, @Valid @RequestBody Objetivo detalles) {
        return objetivoRepository.findById(id).map(obj -> {
            obj.setNombre(detalles.getNombre());
            obj.setDescripcion(detalles.getDescripcion());
            obj.setRachaAciertos(detalles.getRachaAciertos());
            return ResponseEntity.ok(objetivoRepository.save(obj));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        return objetivoRepository.findById(id).map(obj -> {
            objetivoRepository.delete(obj);
            return ResponseEntity.noContent().<Void>build();
        }).orElse(ResponseEntity.notFound().build());
    }
}