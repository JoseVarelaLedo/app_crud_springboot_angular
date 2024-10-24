ALTER TABLE departamento ADD CONSTRAINT unique_jefe_departamento UNIQUE (jefe_departamento);


-- Inserción de 10 departamentos
INSERT INTO departamento (nombre_departamento, fecha_registro)
VALUES ('Recursos Humanos', NOW()),
       ('Finanzas', NOW()),
       ('Tecnología de la Información', NOW()),
       ('Marketing', NOW()),
       ('Ventas', NOW()),
       ('Investigación y Desarrollo', NOW()),
       ('Logística', NOW()),
       ('Atención al Cliente', NOW()),
       ('Legal', NOW()),
       ('Producción', NOW());



-- Inserción de 30 empleados (todos relacionados con departamentos)
INSERT INTO empleado (nombre, apellidos, telefono, direccion, correo_electronico, es_jefe, nickname, departamento_id, fecha_nacimiento, fecha_registro)
VALUES
('Jose', 'Ledo', '637392907', 'Avenida de Barcelona, 25, 6ºB', 'jose.ledo@arela.com', true, 'joseLedo', 6, '1978-06-08', NOW()),
('María', 'García', '698765432', 'Avenida Siempre Viva 456', 'maria.garcia@example.com', false, 'mgarcia', 2, '1985-08-20', NOW()),
('Carlos', 'López', '623456789', 'Calle Ejemplo 789', 'carlos.lopez@example.com', true, 'carlitos', 3, '1980-12-10', NOW()),
('Laura', 'Sánchez', '685432109', 'Calle Verdadera 321', 'laura.sanchez@example.com', false, 'laura_s', 4, '1992-02-28', NOW()),
('Ana', 'Ramírez', '679012345', 'Avenida Principal 654', 'ana.ramirez@example.com', false, 'anita', 5, '1995-11-11', NOW()),
('Luis', 'Martínez', '687654321', 'Calle Real 987', 'luis.martinez@example.com', false, 'lmartinez', 6, '1988-07-07', NOW()),
('Sofía', 'Torres', '678801234', 'Calle 123 123', 'sofia.torres@example.com', false, 'sofi_t', 7, '1993-03-15', NOW()),
('Miguel', 'Hernández', '634567890', 'Calle 456 456', 'miguel.hernandez@example.com', true, 'migue', 8, '1982-06-21', NOW()),
('Isabella', 'Fernández', '698123456', 'Calle 789 789', 'isabella.fernandez@example.com', false, 'isa', 1, '1991-09-30', NOW()),
('José', 'González', '654789321', 'Avenida Oculta 159', 'jose.gonzalez@example.com', false, 'jose_g', 2, '1994-10-05', NOW()),
('Valentina', 'Cruz', '612345678', 'Calle Larga 753', 'valentina.cruz@example.com', false, 'valen', 3, '1989-04-17', NOW()),
('Diego', 'Jiménez', '674512389', 'Avenida Cortada 951', 'diego.jimenez@example.com', true, 'diego', 4, '1981-01-12', NOW()),
('Camila', 'Mora', '672891034', 'Calle Nueva 357', 'camila.mora@example.com', false, 'cami', 5, '1987-08-19', NOW()),
('Pablo', 'Rojas', '647123890', 'Calle Vieja 258', 'pablo.rojas@example.com', false, 'pablito', 6, '1983-07-07', NOW()),
('Martina', 'Díaz', '676543218', 'Calle Corta 654', 'martina.diaz@example.com', false, 'marti', 7, '1990-11-24', NOW()),
('Samuel', 'Salas', '698765431', 'Calle Desconocida 369', 'samuel.salas@example.com', true, 'sam', 1, '1986-02-12', NOW()),
('Natalia', 'Cordero', '611234567', 'Calle Secundaria 159', 'natalia.cordero@example.com', false, 'nati', 1, '1995-12-05', NOW()),
('Fernando', 'Paredes', '688765432', 'Avenida Centenario 951', 'fernando.paredes@example.com', false, 'fer', 2, '1992-03-18', NOW()),
('Valerio', 'Acosta', '654321789', 'Calle Primaria 753', 'valerio.acosta@example.com', false, 'valer', 3, '1984-06-15', NOW()),
('Lucía', 'Castillo', '655432109', 'Calle 404 111', 'lucia.castillo@example.com', false, 'lucy', 4, '1996-01-22', NOW()),
('Martín', 'Vega', '698765890', 'Calle Abierta 123', 'martin.vega@example.com', true, 'martin', 5, '1980-09-09', NOW()),
('Agustín', 'Zamora', '643215789', 'Calle Cerrada 456', 'agustin.zamora@example.com', false, 'agus', 6, '1985-04-30', NOW()),
('Marisol', 'Rivas', '689012345', 'Avenida Océano 321', 'marisol.rivas@example.com', true, 'mari', 7, '1990-08-08', NOW()),
('Oscar', 'Gonzalo', '698765043', 'Calle Conocida 654', 'oscar.gonzalo@example.com', true, 'oscar', 9, '1982-07-14', NOW()),
('Ricardo', 'Hidalgo', '617890123', 'Avenida Cielo 852', 'ricardo.hidalgo@example.com', false, 'rico', 1, '1993-05-16', NOW()),
('Bárbara', 'Peña', '637654890', 'Calle Vista 789', 'barbara.pena@example.com', true, 'barbie', 2, '1991-11-25', NOW()),
('Esteban', 'Téllez', '646789123', 'Calle Espiritual 951', 'esteban.tellez@example.com', false, 'este', 3, '1989-03-11', NOW()),
('Claudia', 'Maldonado', '678901234', 'Calle Alegre 258', 'claudia.maldonado@example.com', false, 'claud', 4, '1996-10-20', NOW()),
('Alberto', 'Castro', '684321456', 'Calle Brillante 357', 'alberto.castro@example.com', true, 'albert', 10, '1984-06-28', NOW());


-- Inserción de 20 contactos
INSERT INTO contacto (nombre, apellidos, telefono, email, direccion, fecha_registro)
VALUES
('María', 'Mendoza', '637123456', 'maria.mendoza@example.com', 'Calle Ejemplo 101', NOW()),
('Juan', 'Pérez', '698234567', 'juan.perez@example.com', 'Avenida Siempre Viva 202', NOW()),
('Sofía', 'Gutiérrez', '628345678', 'sofia.gutierrez@example.com', 'Calle Real 303', NOW()),
('Diego', 'Cruz', '675456789', 'diego.cruz@example.com', 'Calle Nueva 404', NOW()),
('Ana', 'Valenzuela', '689567890', 'ana.valenzuela@example.com', 'Avenida Principal 505', NOW()),
('Clara', 'Torres', '691678901', 'clara.torres@example.com', 'Calle Vieja 606', NOW()),
('Ricardo', 'Morales', '678789012', 'ricardo.morales@example.com', 'Avenida Cielo 707', NOW()),
('Gabriela', 'Vázquez', '612890123', 'gabriela.vazquez@example.com', 'Calle 8 808', NOW()),
('Cristian', 'Reyes', '688901234', 'cristian.reyes@example.com', 'Calle Abierta 909', NOW()),
('Esteban', 'Montalvo', '634012345', 'esteban.montalvo@example.com', 'Avenida Océano 111', NOW()),
('Valentina', 'Silva', '676123456', 'valentina.silva@example.com', 'Calle Cerrada 222', NOW()),
('Javier', 'Hernández', '693234567', 'javier.hernandez@example.com', 'Calle Larga 333', NOW()),
('Claudia', 'Alvarado', '678345678', 'claudia.alvarado@example.com', 'Avenida Secundaria 444', NOW()),
('Fernando', 'Martinez', '645456789', 'fernando.martinez@example.com', 'Calle 5 555', NOW()),
('Samantha', 'López', '654567890', 'samantha.lopez@example.com', 'Calle Vista 666', NOW()),
('Emilio', 'Ríos', '684678901', 'emilio.rios@example.com', 'Avenida Oculta 777', NOW()),
('Teresa', 'Cortez', '690789012', 'teresa.cortez@example.com', 'Calle 10 888', NOW()),
('Hugo', 'Cervantes', '671890123', 'hugo.cervantes@example.com', 'Calle Oscura 999', NOW()),
('Patricia', 'Navarro', '679901234', 'patricia.navarro@example.com', 'Avenida Verde 121', NOW()),
('Leonardo', 'García', '636123456', 'leonardo.garcia@example.com', 'Calle Azul 131', NOW());


-- Inserción de 10 usuarios, relacionados con empleados
INSERT INTO usuario (nickname, contrasena, fecha_registro)
VALUES
('nick_julian', 'password123', NOW()),
('nick_patricia', 'mypassword', NOW()),
('nick_jorge', 'securepass', NOW()),
('nick_teresa', 'admin2024', NOW()),
('nick_carlosS', 'qwerty123', NOW()),
('nick_anaM', 'letmein2024', NOW()),
('nick_luisG', 'helloWorld', NOW()),
('nick_mariaF', '123456abc', NOW()),
('nick_javierX', 'sunshine2024', NOW()),
('nick_claudiaT', 'mySecret!', NOW()),
('nick_fernandoA', 'superpass123', NOW()),
('nick_sofiaL', 'passw0rd', NOW()),
('nick_emilioB', 'welcome123', NOW()),
('nick_valeriaC', 'secretpassword', NOW()),
('nick_miguelD', 'mypass2024', NOW());




