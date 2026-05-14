package com.diegorr.objectives.controllers;

import com.diegorr.objectives.dto.LoginDTO;
import com.diegorr.objectives.models.Usuario;
import com.diegorr.objectives.repositories.UsuarioRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173") 
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Para encriptar en el registro

    @Autowired
    private AuthenticationManager authenticationManager; // El motor de login de Security

    // --- REGISTRO CON ENCRIPTACIÓN ---
    @PostMapping("/register")
    public ResponseEntity<?> crearUsuario(@RequestBody Usuario usuario) {
        if (usuarioRepository.existsByCorreo(usuario.getCorreo())) {
            return ResponseEntity.badRequest().body("Error: El email ya está en uso.");
        }
        
        // ¡IMPORTANTE! Encriptamos la contraseña antes de guardar
        usuario.setContrasenna(passwordEncoder.encode(usuario.getContrasenna()));
        usuario.setActivo(true); // El usuario nace activo
        
        Usuario nuevoUsuario = usuarioRepository.save(usuario);
        return ResponseEntity.ok(nuevoUsuario);
    }

    // --- LOGIN CON SPRING SECURITY ---
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        try {
            Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginDTO.getIdentificador(), 
                    loginDTO.getContrasenna()
                )
            );

            Usuario usuario = (Usuario) auth.getPrincipal();
            usuario.setActivo(true);
            usuarioRepository.save(usuario);

            return ResponseEntity.ok(usuario);

        } catch (AuthenticationException e) { // Ahora usa la de org.springframework.security.core
            return ResponseEntity.status(401).body("ACCESS_DENIED: Credenciales inválidas");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody Map<String, Long> request) {
        Long userId = request.get("id");
        
        return usuarioRepository.findById(userId)
            .map(usuario -> {
                usuario.setActivo(false); // <--- Aquí forzamos el 0
                usuarioRepository.save(usuario);
                return ResponseEntity.ok("Usuario " + userId + " marcado como inactivo");
            })
            .orElse(ResponseEntity.status(404).body("Usuario no encontrado"));
    }

    // --- MÉTODOS PROTEGIDOS (Solo accesibles con login) ---
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerPorId(@PathVariable Long id) {
        return usuarioRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}