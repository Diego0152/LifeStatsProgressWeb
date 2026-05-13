package com.diegorr.objectives.controllers;

import com.diegorr.objectives.models.Usuario;
import com.diegorr.objectives.repositories.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Crear un nuevo usuario
    @PostMapping
    public ResponseEntity<?> crearUsuario(@Valid @RequestBody Usuario usuario) {
        if (usuarioRepository.existsByCorreo(usuario.getCorreo())) {
            return ResponseEntity.badRequest().body("Error: El email ya está en uso.");
        }
        Usuario nuevoUsuario = usuarioRepository.save(usuario);
        return ResponseEntity.ok(nuevoUsuario);
    }

    // Obtener todos los usuarios
    @GetMapping
    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }

    // Obtener un usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerPorId(@PathVariable Long id) {
        return usuarioRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Eliminar usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Método para Loguearse (Validación de acceso)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario loginData) {
        return usuarioRepository.findByCorreo(loginData.getCorreo())
                .map(usuario -> {
                    // Por ahora validación simple (luego usaremos BCrypt para seguridad)
                    if (usuario.getContrasenna().equals(loginData.getContrasenna())) {
                        return ResponseEntity.ok(usuario); // Acceso concedido
                    }
                    return ResponseEntity.status(401).body("ACCESS_DENIED: Password incorrecto");
                })
                .orElse(ResponseEntity.status(404).body("USER_NOT_FOUND"));
    }
}