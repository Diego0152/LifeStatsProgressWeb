package com.diegorr.objectives.services;

import java.util.Date;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Service
public class JwtService {

    // Esta clave debe ser secreta y compleja
    private static final String SECRET_KEY = "TU_CLAVE_SECRETA_SUPER_SEGURA_QUE_NADIE_DEBE_CONOCER";
    private static final long EXPIRATION_TIME = 86400000; // 24 horas en milisegundos

    // 1. GENERAR EL TOKEN
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(io.jsonwebtoken.SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    // 2. EXTRAER EL USERNAME
    public String extractUsername(String token) {
        return getClaims(token).getSubject();
    }

    // 3. VALIDAR
    public boolean isTokenValid(String token, String username) {
        String tokenUsername = extractUsername(token);
        return (tokenUsername.equals(username) && !isTokenExpired(token));
    }

    private Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

    private boolean isTokenExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }
}