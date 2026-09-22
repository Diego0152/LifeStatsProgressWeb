package com.diegorr.objectives.config;

import com.diegorr.objectives.models.EstadoSalud;
import com.diegorr.objectives.models.TipoUsuario;
import com.diegorr.objectives.models.Usuario;
import com.diegorr.objectives.repositories.UsuarioRepository; // Ajusta el paquete de tu repositorio
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String correoAdmin = "admin@gmail.com";

            // Buscamos por 'correo' que es como se llama en tu entidad
            if (usuarioRepository.findByCorreo(correoAdmin).isEmpty()) {
                Usuario admin = new Usuario();
                admin.setNombre("admin");
                admin.setCorreo(correoAdmin);
                
                // Encriptamos la clave para tu atributo 'contrasenna'
                admin.setContrasenna(passwordEncoder.encode("admin123"));
                
                admin.setEdad(25);
                admin.setActivo(true);
                admin.setTipoUsuario(TipoUsuario.USER);
                admin.setEstadoSalud(List.of(EstadoSalud.ENERGÉTICO, EstadoSalud.EN_RECUPERACIÓN, EstadoSalud.CLARIDAD_TOTAL)); // Usa un Enum válido de tu EstadoSalud

                usuarioRepository.save(admin);

                System.out.println("==================================================");
                System.out.println("🚀 [DATA INITIALIZER] Usuario creado para pruebas:");
                System.out.println("📧 Correo:   " + correoAdmin);
                System.out.println("🔑 Password: admin123");
                System.out.println("==================================================");
            }
        };
    }
}