package com.diegorr.objectives.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.diegorr.objectives.dto.BiometriaDTO;
import com.diegorr.objectives.models.Usuario;
import com.diegorr.objectives.repositories.UsuarioRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional
    public void registrarCronos(Long id, int edad) {
        Usuario user = usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));  
        user.actualizarBiometria(edad);
    }

    @Transactional
    public void actualizarPerfilBiometrico(Long id, BiometriaDTO dto) {
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        // 1. Actualizamos edad y etapa (lógica automática en la entidad)
        usuario.actualizarBiometria(dto.getEdad());

        // 2. Actualizamos la lista de estados de salud
        usuario.actualizarEstadosSalud(dto.getEstadosSalud());
    }
}
