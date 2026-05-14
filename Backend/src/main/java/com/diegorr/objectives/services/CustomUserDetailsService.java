package com.diegorr.objectives.services;

import com.diegorr.objectives.models.Usuario;
import com.diegorr.objectives.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UsuarioRepository repo;

    @Override
    public UserDetails loadUserByUsername(String identificador) throws UsernameNotFoundException {
        // Buscamos al usuario por nombre O correo
        Usuario user = repo.findByNombreOrCorreo(identificador, identificador)
            .orElseThrow(() -> new UsernameNotFoundException("No existe el agente: " + identificador));
        
        // Retornamos el usuario (Asegúrate de que tu clase Usuario implemente UserDetails)
        return user; 
    }
}