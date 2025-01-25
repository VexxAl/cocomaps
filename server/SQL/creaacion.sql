CREATE SCHEMA IF NOT EXISTS locaciones;

CREATE TABLE locaciones.provincias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE locaciones.localidades (
    id SERIAL PRIMARY KEY,
    codigo_postal BIGINT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    provincia_id INT NOT NULL,
    FOREIGN KEY (provincia_id) REFERENCES locaciones.provincias(id)
);

CREATE TABLE locaciones.direcciones (
    id SERIAL PRIMARY KEY,
    direccion VARCHAR(100) NOT NULL,
    barrio VARCHAR(100) NULL,
    localidad_id INT NOT NULL,
    FOREIGN KEY (localidad_id) REFERENCES locaciones.localidades(id)
);

----------------------------------------------------------------------------------------------------

CREATE SCHEMA IF NOT EXISTS comedores;

CREATE TABLE comedores.encargados (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    telefono VARCHAR(100) NOT NULL
);

CREATE TABLE comedores.comedor (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion_id INT NOT NULL,
    telefono VARCHAR(100) NULL,
    email VARCHAR(100) NULL,
    web VARCHAR(100) NULL,
    encargado_id INT NOT NULL,
    needs TEXT[], -- Array para almacenar necesidades (ej: ["Arroz", "Aceite"])
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (direccion_id) REFERENCES locaciones.direcciones(id),
    FOREIGN KEY (encargado_id) REFERENCES comedores.encargados(id)
);
