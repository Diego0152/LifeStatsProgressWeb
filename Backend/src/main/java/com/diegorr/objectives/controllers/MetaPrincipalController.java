package com.diegorr.objectives.controllers;

import com.diegorr.objectives.models.MetaPrincipal;
import com.diegorr.objectives.repositories.MetaPrincipalRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/metas")
public class MetaPrincipalController {

    @Autowired
    private MetaPrincipalRepository metaRepository;

    @PostMapping
    public ResponseEntity<MetaPrincipal> crearMeta(@Valid @RequestBody MetaPrincipal meta) {
        // Al guardar, se incluyen nombre, descripcion, fechas, etc.
        return ResponseEntity.ok(metaRepository.save(meta));
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<MetaPrincipal> listarPorUsuario(@PathVariable Long usuarioId) {
        return metaRepository.findByUsuarioId(usuarioId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MetaPrincipal> actualizarMeta(@PathVariable Long id, @Valid @RequestBody MetaPrincipal detalles) {
        return metaRepository.findById(id).map(meta -> {
            meta.setNombre(detalles.getNombre());
            meta.setDescripcion(detalles.getDescripcion());
            meta.setFechaInicio(detalles.getFechaInicio());
            meta.setFechaFin(detalles.getFechaFin());
            meta.setActivo(detalles.getActivo());
            meta.setPorcentajeExito(detalles.getPorcentajeExito());
            return ResponseEntity.ok(metaRepository.save(meta));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (metaRepository.existsById(id)) {
            metaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}