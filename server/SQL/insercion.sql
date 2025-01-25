INSERT INTO locaciones.provincias (nombre) VALUES ('Santa Fe');

INSERT INTO locaciones.localidades (codigo_postal, nombre, provincia_id) 
    VALUES  (3000, 'Santa Fe', 1),
            (3016, 'Santo Tome', 1);

INSERT INTO locaciones.direcciones (direccion, barrio, localidad_id) 
    VALUES  ('Calle 1', 'Barrio 1', 1),
            ('Calle 2', 'Barrio 2', 1),
            ('Calle 3', 'Barrio 3', 2);

INSERT INTO comedores.encargados (nombre, apellido, telefono) 
    VALUES  ('Juan', 'Perez', '342-1234567'),
            ('Maria', 'Gomez', '342-7654321'),
            ('Pedro', 'Gonzalez', '342-1234567');

INSERT INTO comedores.comedor (nombre, direccion_id, telefono, email, web, encargado_id, needs) 
    VALUES  ('Comedor 1', 1, '342-1234567', 'comnedor1@email.com', 'www.comedor1.com', 1, '{"Arroz", "Aceite"}'),
            ('Comedor 2', 2, '342-7654321', 'comedor2@email.com', 'www.comedor2.com', 2, '{"Fideos", "Leche"}'),
            ('Comedor 3', 3, '342-1234567', 'comedor3@email.com', 'www.comedor3.com', 3, '{"Harina", "Azucar"}');

-- ----------------------------------------------------------------------------------------------------
