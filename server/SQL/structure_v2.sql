-- Active: 1733854314788@@127.0.0.1@5432@cocomaps_develop


-- SQL STRUCTURE FOR COCOMAPS APPLICATION
-- Imported from https://dbdiagram.io/d/COCOMAPS-6946fadd4bbde0fd74e5aac9


-- -------------------------
-- SCHEMA CREATION --
-- -------------------------
CREATE SCHEMA "locaciones";
CREATE SCHEMA "comedores";
CREATE SCHEMA "auth";


-- -------------------------
-- LOCACIONES TABLES
-- -------------------------

CREATE TABLE "locaciones"."provincias" (
  "id" SERIAL PRIMARY KEY,
  "nombre" varchar NOT NULL
);

CREATE TABLE "locaciones"."localidades" (
  "cp" INTEGER PRIMARY KEY,
  "nombre" varchar NOT NULL,
  "provincia_id" int
);

CREATE TABLE "locaciones"."direcciones" (
  "id" SERIAL PRIMARY KEY,
  "calle" varchar NOT NULL,
  "altura" int,
  "piso_depto" varchar,
  "distrito" varchar,
  "lat" decimal(10,8),
  "lng" decimal(11,8),
  "localidad_id" int,
  "creado_manualmente" boolean DEFAULT false
);


-- -------------------------
-- COMEDORES TABLES
-- -------------------------

CREATE TABLE "comedores"."organizaciones" (
  "id" SERIAL PRIMARY KEY,
  "nombre" varchar UNIQUE NOT NULL,
  "tipo" varchar,
  "contacto_central" varchar
);

CREATE TABLE "comedores"."encargados" (
  "dni" INTEGER PRIMARY KEY,
  "nombre" varchar NOT NULL,
  "apellido" varchar NOT NULL,
  "telefono" varchar NOT NULL,
  "email" varchar UNIQUE
);

CREATE TABLE "comedores"."comedor" (
  "id" SERIAL PRIMARY KEY,
  "nombre" varchar NOT NULL,
  "direccion_id" int UNIQUE,
  "encargado_id" int,
  "organizacion_id" int,
  "telefono_contacto" varchar,
  "personas_asistidas" int DEFAULT 0,
  "needs" text[],
  "horarios_apertura" varchar,
  "estado" varchar DEFAULT 'ACTIVO',
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp,
  "deleted_at" timestamp
);

-- -------------------------
-- AUTH TABLES
-- -------------------------

CREATE TABLE "auth"."usuarios" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar UNIQUE NOT NULL,
  "password_hash" varchar NOT NULL,
  "rol" varchar DEFAULT 'colaborador',
  "comedor_asignado_id" int,
  "created_at" timestamp DEFAULT (now())
);

-- -------------------------
-- COMMENTS
-- -------------------------

COMMENT ON COLUMN "locaciones"."direcciones"."calle" IS 'Ej: Juan de Garay';
COMMENT ON COLUMN "locaciones"."direcciones"."altura" IS 'Ej: 4151. Nullable para casos especiales, pero trataremos de evitarlo';
COMMENT ON COLUMN "locaciones"."direcciones"."piso_depto" IS 'Opcional';
COMMENT ON COLUMN "locaciones"."direcciones"."distrito" IS 'Barrio o Distrito (Ej: SUROESTE)';
COMMENT ON COLUMN "locaciones"."direcciones"."lat" IS 'Latitud precisa';
COMMENT ON COLUMN "locaciones"."direcciones"."lng" IS 'Longitud precisa';
COMMENT ON COLUMN "locaciones"."direcciones"."creado_manualmente" IS 'True si fue cargado por admin, False si vino de importación';
COMMENT ON COLUMN "comedores"."organizaciones"."tipo" IS 'ONG, Movimiento Social, Iglesia, Vecinal';
COMMENT ON COLUMN "comedores"."organizaciones"."contacto_central" IS 'Teléfono o email de la organización madre';
COMMENT ON COLUMN "comedores"."comedor"."organizacion_id" IS 'Referencia a la Asociación';
COMMENT ON COLUMN "comedores"."comedor"."personas_asistidas" IS 'Dato del CSV. Importante para métricas';
COMMENT ON COLUMN "comedores"."comedor"."needs" IS 'Array de necesidades: ["Leche", "Carne", "Voluntarios"]';
COMMENT ON COLUMN "comedores"."comedor"."horarios_apertura" IS 'Texto libre por ahora, ej: "Lun a Vie 12-14hs"';
COMMENT ON COLUMN "comedores"."comedor"."estado" IS 'ACTIVO, PENDIENTE_VERIFICACION, BAJA_TEMPORAL';
COMMENT ON COLUMN "comedores"."comedor"."deleted_at" IS 'Soft delete';
COMMENT ON COLUMN "auth"."usuarios"."rol" IS 'admin, colaborador, auditor';
COMMENT ON COLUMN "auth"."usuarios"."comedor_asignado_id" IS 'Si el usuario administra un comedor específico';

-- -------------------------
-- FOREIGN KEYS
-- -------------------------
ALTER TABLE "locaciones"."localidades" ADD FOREIGN KEY ("provincia_id") REFERENCES "locaciones"."provincias" ("id");
ALTER TABLE "locaciones"."direcciones" ADD FOREIGN KEY ("localidad_id") REFERENCES "locaciones"."localidades" ("cp");
ALTER TABLE "comedores"."comedor" ADD FOREIGN KEY ("direccion_id") REFERENCES "locaciones"."direcciones" ("id");
ALTER TABLE "comedores"."comedor" ADD FOREIGN KEY ("encargado_id") REFERENCES "comedores"."encargados" ("dni");
ALTER TABLE "comedores"."comedor" ADD FOREIGN KEY ("organizacion_id") REFERENCES "comedores"."organizaciones" ("id");
ALTER TABLE "auth"."usuarios" ADD FOREIGN KEY ("comedor_asignado_id") REFERENCES "comedores"."comedor" ("id");
