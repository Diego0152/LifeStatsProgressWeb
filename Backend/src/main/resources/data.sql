INSERT INTO usuarios (activo, nombre, email, password, edad, tipoUsuario) 
VALUES (0, 'Admin', 'admin@gmail.com', 'admin123', 30, 'USER');
INSERT INTO usuario_estados_salud (usuario_id, estado_salud)
VALUES (1, ['CLARIDAD_TOTAL', 'ENERGÉTICO', 'EN_RECUPERACIÓN'] )