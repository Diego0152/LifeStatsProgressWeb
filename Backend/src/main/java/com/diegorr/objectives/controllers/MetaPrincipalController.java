package com.diegorr.objectives.controllers;

import com.diegorr.objectives.models.MetaPrincipal;
import com.diegorr.objectives.models.Usuario;
import com.diegorr.objectives.repositories.MetaPrincipalRepository;
import com.diegorr.objectives.repositories.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/metas")
@CrossOrigin(origins = "*")
public class MetaPrincipalController {

    @Autowired
    private MetaPrincipalRepository metaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Crear meta asociando el usuario directamente desde la URL
    @PostMapping("/usuario/{usuarioId}")
    public ResponseEntity<MetaPrincipal> crearMeta(@PathVariable Long usuarioId, @Valid @RequestBody MetaPrincipal meta) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + usuarioId));

        meta.setUsuario(usuario);
        
        // Asignar valores por defecto si no vienen especificados
        if (meta.getPorcentajeExito() == null) {
            meta.setPorcentajeExito(0.0);
        }
        if (meta.getActivo() == null) {
            meta.setActivo(true);
        }

        return new ResponseEntity<>(metaRepository.save(meta), HttpStatus.CREATED);
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
            if (detalles.getActivo() != null) {
                meta.setActivo(detalles.getActivo());
            }
            if (detalles.getPorcentajeExito() != null) {
                meta.setPorcentajeExito(detalles.getPorcentajeExito());
            }
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