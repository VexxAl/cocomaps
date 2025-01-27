INSERT INTO locaciones.provincias (nombre) VALUES ('Santa Fe');

INSERT INTO locaciones.localidades (codigo_postal, nombre, provincia_id) 
    VALUES  (3000, 'Santa Fe', 1),
            (3016, 'Santo Tome', 1);

INSERT INTO locaciones.direcciones (direccion, barrio, localidad_id, calle, ciudad, provincia, codigo_postal) 
    VALUES  ('Calle 1', 'Barrio 1', 1, 'San Martín 1234', 'Santa Fe', 'Santa Fe', '3000'),
            ('Calle 2', 'Barrio 2', 1, 'San Martín 4022', 'Santa Fe', 'Santa Fe', '3000'),
            ('Calle 3', 'Barrio 3', 2, '25 de Mayo 2010', 'Santa Fe', 'Santa Fe', '3000');

INSERT INTO comedores.encargados (nombre, apellido, telefono) 
    VALUES  ('Juan', 'Perez', '342-1234567'),
            ('Maria', 'Gomez', '342-7654321'),
            ('Pedro', 'Gonzalez', '342-1234567');

INSERT INTO comedores.comedor (nombre, direccion_id, telefono, email, web, encargado_id, needs, horario_lunes_a_viernes, horario_sabado, horario_domingo) 
    VALUES  ('Comedor 1', 1, '342-1234567', 'comedor1@email.com', 'www.comedor1.com', 1, '{"Arroz", "Aceite"}', '12:00 - 23:00', '12:00 - 00:00', '12:00 - 22:00'),
            ('Comedor 2', 2, '342-7654321', 'comedor2@email.com', 'www.comedor2.com', 2, '{"Fideos", "Leche"}', '11:00 - 22:00', '11:00 - 23:00', 'Cerrado'),
            ('Comedor 3', 3, '342-1234567', 'comedor3@email.com', 'www.comedor3.com', 3, '{"Harina", "Azucar"}', '13:00 - 23:00', '13:00 - 00:00', '13:00 - 22:00');