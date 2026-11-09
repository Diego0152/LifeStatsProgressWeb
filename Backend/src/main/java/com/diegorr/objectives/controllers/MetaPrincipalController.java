package com.diegorr.objectives.controllers;

import com.diegorr.objectives.dto.MetaDTO;
import com.diegorr.objectives.models.MetaPrincipal;
import com.diegorr.objectives.models.Usuario;
import com.diegorr.objectives.repositories.MetaPrincipalRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/metas")
@CrossOrigin(origins = "*")
public class MetaPrincipalController {

    @Autowired
    private MetaPrincipalRepository metaRepository;

    // Método auxiliar para convertir Entidad a DTO
    private MetaDTO convertirADto(MetaPrincipal meta) {
        MetaDTO dto = new MetaDTO();
        dto.setId(meta.getId());
        dto.setNombre(meta.getNombre());
        dto.setDescripcion(meta.getDescripcion());
        dto.setFechaInicio(meta.getFechaInicio());
        dto.setFechaFin(meta.getFechaFin());
        dto.setPorcentajeExito(meta.getPorcentajeExito());
        dto.setActivo(meta.getActivo());
        // Si tienes un campo categoría en tu modelo, asígnalo aquí:
        // dto.setCategoria(meta.getCategoria()); 
        if (meta.getUsuario() != null) {
            dto.setUsuarioId(meta.getUsuario().getId());
        }
        return dto;
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<MetaDTO>> listarPorUsuario(@PathVariable Long usuarioId) {
        List<MetaPrincipal> metas = metaRepository.findByUsuarioId(usuarioId);
        List<MetaDTO> metasDto = metas.stream()
                .map(this::convertirADto)
                .collect(Collectors.toList());
        
        System.out.println("🚨 TOTAL DE METAS MAPEADAS A DTO: " + metasDto.size());
        return ResponseEntity.ok(metasDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MetaDTO> obtenerMetaPorId(@PathVariable Long id) {
        return metaRepository.findById(id)
                .map(meta -> ResponseEntity.ok(convertirADto(meta)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/usuario/{usuarioId}")
    public ResponseEntity<MetaDTO> crearMeta(@PathVariable Long usuarioId, @Valid @RequestBody MetaDTO dto) {
        MetaPrincipal meta = new MetaPrincipal();
        meta.setNombre(dto.getNombre());
        meta.setDescripcion(dto.getDescripcion());
        meta.setFechaInicio(dto.getFechaInicio());
        meta.setFechaFin(dto.getFechaFin());
        meta.setPorcentajeExito(dto.getPorcentajeExito() != null ? dto.getPorcentajeExito() : 0.0);
        meta.setActivo(dto.getActivo() != null ? dto.getActivo() : true);

        Usuario usuario = new Usuario();
        usuario.setId(usuarioId);
        meta.setUsuario(usuario);

        MetaPrincipal savedMeta = metaRepository.save(meta);
        return ResponseEntity.ok(convertirADto(savedMeta));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MetaDTO> actualizarMeta(@PathVariable Long id, @Valid @RequestBody MetaDTO detalles) {
        return metaRepository.findById(id).map(meta -> {
            meta.setNombre(detalles.getNombre());
            meta.setDescripcion(detalles.getDescripcion());
            meta.setFechaInicio(detalles.getFechaInicio());
            meta.setFechaFin(detalles.getFechaFin());
            if (detalles.getActivo() != null) meta.setActivo(detalles.getActivo());
            if (detalles.getPorcentajeExito() != null) meta.setPorcentajeExito(detalles.getPorcentajeExito());

            MetaPrincipal updatedMeta = metaRepository.save(meta);
            return ResponseEntity.ok(convertirADto(updatedMeta));
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