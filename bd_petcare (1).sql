-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-07-2025 a las 01:05:28
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_petcare`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistente`
--

CREATE TABLE `asistente` (
  `id_asistente` int(11) NOT NULL,
  `funciones` text DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita`
--

CREATE TABLE `cita` (
  `id_cita` int(11) NOT NULL,
  `id_historia` int(11) DEFAULT NULL,
  `fecha_hora` datetime DEFAULT NULL,
  `motivo` text DEFAULT NULL,
  `estado` enum('programada','cancelada','completada') DEFAULT NULL,
  `diagnostico` text DEFAULT NULL,
  `tratamiento` text DEFAULT NULL,
  `id_veterinario` int(11) DEFAULT NULL,
  `costo` decimal(10,2) DEFAULT NULL,
  `id_servicio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cita`
--

INSERT INTO `cita` (`id_cita`, `id_historia`, `fecha_hora`, `motivo`, `estado`, `diagnostico`, `tratamiento`, `id_veterinario`, `costo`, `id_servicio`) VALUES
(1, 1, '2025-06-08 08:30:50', 'Mi perro necesita un baño', 'programada', 'Bañado de manera completa, perro muy tranquilo', 'Baño etíco', 1, 50.00, 2),
(2, 1, '2025-06-08 08:30:50', 'a', 'cancelada', 'No llego a la cita', 'Ninguno', 1, 50.00, 2),
(3, 1, '2025-06-08 08:30:50', 'Baño más vacuna', 'programada', 'nulo', 'nulo', 1, 70.00, 3),
(4, 1, '2023-06-25 07:40:00', 'Quiero bañar a Goldy, con shampoo caro', 'programada', 'ASDASDA', 'ASDASDAD', 1, 50.00, 2),
(5, 1, '2025-06-08 08:30:50', 'Baño más vacuna', 'programada', 'nulo', 'nulo', 1, 70.00, 3),
(6, 1, '2025-06-08 08:30:50', 'Mi perro necesita un baño', 'programada', 'ESTA ENFERMO', 'Por conocer', 1, 50.00, 2),
(7, 2, '2025-06-30 21:00:00', 'Necesita un baño', 'cancelada', 'Nulo', 'nulo', 2, 70.00, 3),
(8, 7, '2025-07-05 10:00:00', 'Consulta por diarrea', 'programada', 'Pendiente', 'Hidratación y dieta', 1, 60.00, 6),
(9, 8, '2025-07-06 11:30:00', 'Control prenatal', 'programada', 'Gestación detectada', 'Seguimiento mensual', 2, 45.00, 9),
(10, 9, '2025-07-07 15:00:00', 'Corte de uñas', 'completada', 'Sin incidentes', 'Listo', 2, 40.00, 4),
(11, 10, '2025-07-08 12:00:00', 'Consulta general', 'cancelada', 'N/A', 'N/A', 1, 35.00, 7),
(12, 7, '2025-07-09 09:00:00', 'Radiografía preventiva', 'programada', 'Pendiente', 'Evaluación estructural', 1, 90.00, 12),
(13, 5, '2025-07-14 16:30:00', 'Ya le toca su vacuna', 'programada', '', '', 2, 45.00, 9),
(14, 1, '2025-07-24 22:20:00', 'Necesito una revisión médica', 'programada', '', '', 2, 35.00, 7),
(15, 1, '2025-07-24 22:20:00', 'Necesito una revisión médica', 'cancelada', 'Por conocer', 'Por conocer', 2, 35.00, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita_servicio`
--

CREATE TABLE `cita_servicio` (
  `id_cita` int(11) NOT NULL,
  `id_servicio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cita_servicio`
--

INSERT INTO `cita_servicio` (`id_cita`, `id_servicio`) VALUES
(8, 6),
(9, 9),
(10, 4),
(11, 7),
(12, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `duenio`
--

CREATE TABLE `duenio` (
  `id_duenio` int(11) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `duenio`
--

INSERT INTO `duenio` (`id_duenio`, `telefono`, `direccion`, `id_usuario`) VALUES
(1, '905609172', 'Ventanilla', 2),
(2, '987654321', 'Independecia', 5),
(3, '907243142', 'Los Olivos ', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historiaclinica`
--

CREATE TABLE `historiaclinica` (
  `id_historia` int(11) NOT NULL,
  `id_mascota` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historiaclinica`
--

INSERT INTO `historiaclinica` (`id_historia`, `id_mascota`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascota`
--

CREATE TABLE `mascota` (
  `id_mascota` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `especie` varchar(50) DEFAULT NULL,
  `raza` varchar(50) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `id_duenio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mascota`
--

INSERT INTO `mascota` (`id_mascota`, `nombre`, `especie`, `raza`, `fecha_nacimiento`, `id_duenio`) VALUES
(1, 'Relámpago', 'perro', 'Chusco', '2023-03-16', 1),
(2, 'Minny', 'gato', 'Siames', '2024-03-31', 1),
(3, 'Purple', 'ave', 'Rapax', '2020-01-15', 2),
(4, 'Bugs', 'conejo', 'Chusca', '2022-06-12', 2),
(5, 'Goldy', 'perro', 'Dogo argentino', '2023-02-10', 1),
(6, 'Nami', 'gato', 'Siames', '2025-06-09', 3),
(7, 'Luna', 'perro', 'Labrador', '2022-11-10', 1),
(8, 'Coco', 'gato', 'Angora', '2023-07-15', 2),
(9, 'Toby', 'conejo', 'Mini Lop', '2021-05-20', 3),
(10, 'Max', 'ave', 'Canario', '2020-03-12', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio`
--

CREATE TABLE `servicio` (
  `id_servicio` int(11) NOT NULL,
  `nombre_servicio` varchar(100) DEFAULT NULL,
  `costo` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicio`
--

INSERT INTO `servicio` (`id_servicio`, `nombre_servicio`, `costo`) VALUES
(1, 'vacuna para parásitos', 30.00),
(2, 'Baño para mascota', 50.00),
(3, 'Vacuna + baño', 70.00),
(4, 'Desparasitación interna', 40.00),
(5, 'Corte de uñas', 20.00),
(6, 'Limpieza dental', 60.00),
(7, 'Consulta general', 35.00),
(8, 'Control de peso', 25.00),
(9, 'Vacuna antirrábica', 45.00),
(10, 'Control prenatal para mascotas', 55.00),
(11, 'Ecografía abdominal', 80.00),
(12, 'Radiografía', 90.00),
(13, 'Tratamiento antipulgas', 50.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `correo_electronico` varchar(100) DEFAULT NULL,
  `contraseña` varchar(255) DEFAULT NULL,
  `rol` enum('veterinario','duenio','asistente') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `correo_electronico`, `contraseña`, `rol`) VALUES
(1, 'Naomi', 'naomi@gmail.com', '$2a$10$ZmP22miVajwk1k/49PyYzeb.CM8/5gFyWnWgLxSHCIEo2GJzU2Q3y', 'veterinario'),
(2, 'Dave', 'Dave@gmail.com', '$2a$10$bhAeA4rFRlzulU8OdyhKGuluoZbzsx7aFyyAnQ7aUnEv0vmTWjp66', 'duenio'),
(3, 'Carlos', 'carlos@veterinario.com', '$2a$10$vX5lsrgjQvT7YCfv4strt.hC9fBzQnQTqKooy5mchvU6JLFpwxTB6', 'veterinario'),
(4, 'Jordany', 'Jordany@asistente.com', '$2a$10$fyow5RYO9LNfk1/vY80DkeWAih4k/EmxxNQLgPYpQ1wmZmcKOQ8/K', 'asistente'),
(5, 'Luis', 'Luis@gmail.com', '$2a$10$uN8B3kWNxYMlBILmP3Mfteh3Blm9Srr1Jn2vcizssctA5udfkg4FK', 'duenio'),
(6, 'Roberto', 'roberto@veterinario.com', '$2a$10$gNggr/3DPyoFvzxpw.blAuKg7mA/E9DFsAXdYqosihTVxUtJv/MIS', 'veterinario'),
(7, 'joaquin', 'joaquin@gmail.com', '$2a$10$K1LY71rfvvjO2I7RV0NnPeprgQT8mw0DmfSgS2pJam5.pzg7DI6LK', 'duenio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacuna`
--

CREATE TABLE `vacuna` (
  `id_vacuna` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(8,2) DEFAULT NULL,
  `dosis` int(11) DEFAULT NULL,
  `id_servicio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vacuna`
--

INSERT INTO `vacuna` (`id_vacuna`, `nombre`, `descripcion`, `precio`, `dosis`, `id_servicio`) VALUES
(1, 'Vacuna antirrábica', 'Protección contra la rabia', 45.00, 1, 6),
(2, 'Vacuna triple felina', 'Protección contra rinotraqueítis, calicivirus y panleucopenia', 55.00, 1, 10),
(3, 'Vacuna moquillo canino', 'Previene distemper en perros', 50.00, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `veterinario`
--

CREATE TABLE `veterinario` (
  `id_veterinario` int(11) NOT NULL,
  `especialidad` varchar(100) DEFAULT NULL,
  `numero_colegiado` varchar(50) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `veterinario`
--

INSERT INTO `veterinario` (`id_veterinario`, `especialidad`, `numero_colegiado`, `id_usuario`) VALUES
(1, 'Cirujano', 'Vet835', 3),
(2, 'Cirujano', 'Vet29900', 6);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asistente`
--
ALTER TABLE `asistente`
  ADD PRIMARY KEY (`id_asistente`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`id_cita`),
  ADD KEY `id_historia` (`id_historia`),
  ADD KEY `id_veterinario` (`id_veterinario`),
  ADD KEY `fk_cita_servicio` (`id_servicio`);

--
-- Indices de la tabla `cita_servicio`
--
ALTER TABLE `cita_servicio`
  ADD PRIMARY KEY (`id_cita`,`id_servicio`),
  ADD KEY `id_servicio` (`id_servicio`);

--
-- Indices de la tabla `duenio`
--
ALTER TABLE `duenio`
  ADD PRIMARY KEY (`id_duenio`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `historiaclinica`
--
ALTER TABLE `historiaclinica`
  ADD PRIMARY KEY (`id_historia`),
  ADD KEY `id_mascota` (`id_mascota`);

--
-- Indices de la tabla `mascota`
--
ALTER TABLE `mascota`
  ADD PRIMARY KEY (`id_mascota`),
  ADD KEY `id_duenio` (`id_duenio`);

--
-- Indices de la tabla `servicio`
--
ALTER TABLE `servicio`
  ADD PRIMARY KEY (`id_servicio`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `vacuna`
--
ALTER TABLE `vacuna`
  ADD PRIMARY KEY (`id_vacuna`),
  ADD KEY `id_servicio` (`id_servicio`);

--
-- Indices de la tabla `veterinario`
--
ALTER TABLE `veterinario`
  ADD PRIMARY KEY (`id_veterinario`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asistente`
--
ALTER TABLE `asistente`
  MODIFY `id_asistente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `cita`
--
ALTER TABLE `cita`
  MODIFY `id_cita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `duenio`
--
ALTER TABLE `duenio`
  MODIFY `id_duenio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `historiaclinica`
--
ALTER TABLE `historiaclinica`
  MODIFY `id_historia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `mascota`
--
ALTER TABLE `mascota`
  MODIFY `id_mascota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
  MODIFY `id_servicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `vacuna`
--
ALTER TABLE `vacuna`
  MODIFY `id_vacuna` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `veterinario`
--
ALTER TABLE `veterinario`
  MODIFY `id_veterinario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asistente`
--
ALTER TABLE `asistente`
  ADD CONSTRAINT `asistente_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `cita`
--
ALTER TABLE `cita`
  ADD CONSTRAINT `cita_ibfk_1` FOREIGN KEY (`id_historia`) REFERENCES `historiaclinica` (`id_historia`),
  ADD CONSTRAINT `cita_ibfk_2` FOREIGN KEY (`id_veterinario`) REFERENCES `veterinario` (`id_veterinario`),
  ADD CONSTRAINT `fk_cita_servicio` FOREIGN KEY (`id_servicio`) REFERENCES `servicio` (`id_servicio`);

--
-- Filtros para la tabla `cita_servicio`
--
ALTER TABLE `cita_servicio`
  ADD CONSTRAINT `cita_servicio_ibfk_1` FOREIGN KEY (`id_cita`) REFERENCES `cita` (`id_cita`),
  ADD CONSTRAINT `cita_servicio_ibfk_2` FOREIGN KEY (`id_servicio`) REFERENCES `servicio` (`id_servicio`);

--
-- Filtros para la tabla `duenio`
--
ALTER TABLE `duenio`
  ADD CONSTRAINT `duenio_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `historiaclinica`
--
ALTER TABLE `historiaclinica`
  ADD CONSTRAINT `historiaclinica_ibfk_1` FOREIGN KEY (`id_mascota`) REFERENCES `mascota` (`id_mascota`);

--
-- Filtros para la tabla `mascota`
--
ALTER TABLE `mascota`
  ADD CONSTRAINT `mascota_ibfk_1` FOREIGN KEY (`id_duenio`) REFERENCES `duenio` (`id_duenio`);

--
-- Filtros para la tabla `vacuna`
--
ALTER TABLE `vacuna`
  ADD CONSTRAINT `vacuna_ibfk_1` FOREIGN KEY (`id_servicio`) REFERENCES `servicio` (`id_servicio`);

--
-- Filtros para la tabla `veterinario`
--
ALTER TABLE `veterinario`
  ADD CONSTRAINT `veterinario_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
