-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:33065
-- Tiempo de generación: 13-05-2022 a las 17:55:58
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `unicorn`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dictype`
--

CREATE TABLE `dictype` (
  `idType` int(11) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `dictype`
--

INSERT INTO `dictype` (`idType`, `type`) VALUES
(1, 'unico'),
(2, 'semanal'),
(3, 'quincenal'),
(4, 'mensual'),
(5, 'anual');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dictypeinput`
--

CREATE TABLE `dictypeinput` (
  `idTypeInput` int(11) NOT NULL,
  `typeInput` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `dictypeinput`
--

INSERT INTO `dictypeinput` (`idTypeInput`, `typeInput`) VALUES
(1, 'income'),
(2, 'outflow');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `income`
--

CREATE TABLE `income` (
  `idIncome` int(11) NOT NULL,
  `amount` double NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `status` tinyint(1) NOT NULL,
  `description` varchar(100) NOT NULL,
  `idType` int(11) NOT NULL,
  `idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `outflow`
--

CREATE TABLE `outflow` (
  `idOutflow` int(11) NOT NULL,
  `amount` double NOT NULL,
  `startDate` date NOT NULL DEFAULT current_timestamp(),
  `endDate` date DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `description` varchar(100) NOT NULL,
  `idType` int(11) NOT NULL,
  `idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `scheduledinput`
--

CREATE TABLE `scheduledinput` (
  `idSheduledInput` int(11) NOT NULL,
  `idTypeInput` int(11) NOT NULL,
  `amount` double NOT NULL,
  `description` varchar(100) NOT NULL,
  `idType` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date DEFAULT NULL,
  `lastUpdate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `scheduledinput`
--

INSERT INTO `scheduledinput` (`idSheduledInput`, `idTypeInput`, `amount`, `description`, `idType`, `idUser`, `status`, `startDate`, `endDate`, `lastUpdate`) VALUES
(1, 1, 1000, 'Primer Pago.', 1, 4, 1, '2022-05-10', '2022-04-10', '2022-05-10'),
(2, 2, 500, 'Primer gasto', 1, 4, 1, '2022-05-10', '2022-04-10', '2022-05-10'),
(3, 1, 1000, 'Manutencion2', 2, 4, 1, '2022-05-10', NULL, NULL),
(4, 1, 1000, 'Nomina', 3, 4, 1, '2022-05-10', NULL, '2022-05-10'),
(5, 1, 1000, 'ventas', 4, 4, 1, '2022-05-10', NULL, '2022-05-10'),
(6, 1, 1000, 'Renta', 5, 4, 1, '2022-05-10', NULL, NULL),
(7, 2, 500, 'canasta', 2, 4, 1, '2022-05-10', NULL, NULL),
(8, 2, 500, 'Envios', 3, 4, 1, '2022-05-10', NULL, '2022-05-10'),
(9, 2, 500, 'Chupe', 3, 4, 1, '2022-05-10', NULL, NULL),
(10, 2, 500, 'chequera', 4, 4, 1, '2022-05-10', NULL, NULL),
(11, 2, 500, 'una al año no hace daño', 5, 4, 0, '2022-05-10', NULL, NULL),
(20, 1, 500, 'azsd', 1, 4, 1, '2022-05-10', '2022-05-10', '0000-00-00'),
(21, 1, 500, 'asd', 1, 4, 1, '2022-05-10', '2022-05-10', '0000-00-00'),
(22, 1, 300, 'extra', 1, 4, 1, '2022-05-11', '2022-05-12', '0000-00-00'),
(23, 2, 200, 'joy', 1, 4, 1, '2022-05-11', '2022-05-12', '0000-00-00'),
(24, 2, 200, 'paletas', 1, 4, 1, '2022-05-11', '2022-05-12', '0000-00-00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `idUser` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `birthDate` date NOT NULL,
  `status` tinyint(1) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`idUser`, `firstName`, `lastName`, `email`, `birthDate`, `status`, `password`) VALUES
(1, 'juan', 'Corrizo', 'juan@outlook.com', '2000-02-10', 1, '$2b$10$Ajn65QHS4olElTgqnY3Z/Oz5UWgftBbxHvXhCEj4gvP3obaaAEB.W'),
(2, 'juan', 'Corrizo', 'a@a.com', '2000-02-10', 1, '$2b$10$mFggONsmHrnWjjI7tlwonOAPtUCIQITTE9/vpYIw60TnG3ZIC0xBy'),
(4, 'asd', 'asd', 'asd', '2022-03-01', 1, '$2b$10$fIoP7ptIgufDWfhTFgLR0.EYsnzNNfr6x9lxf9q/75crq1OK1RdYK'),
(9, 'dsa', 'dsa', 'dsa', '2022-03-09', 1, '$2b$10$uCCgz9RJqbjRdpdMi.f8gebSVRCA1GGDQcphOMAAO6aWoEZeoLxeu'),
(10, 'a', 'a', 'a', '2022-03-16', 1, '$2b$10$uPx75PDJQlZ6tz29EpQiS.AkR6s7/A3Ki6Ggajy..TagGy2YTJ06e');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `dictype`
--
ALTER TABLE `dictype`
  ADD PRIMARY KEY (`idType`);

--
-- Indices de la tabla `dictypeinput`
--
ALTER TABLE `dictypeinput`
  ADD PRIMARY KEY (`idTypeInput`);

--
-- Indices de la tabla `income`
--
ALTER TABLE `income`
  ADD PRIMARY KEY (`idIncome`),
  ADD KEY `idType` (`idType`),
  ADD KEY `idUser` (`idUser`);

--
-- Indices de la tabla `outflow`
--
ALTER TABLE `outflow`
  ADD PRIMARY KEY (`idOutflow`),
  ADD KEY `idType` (`idType`),
  ADD KEY `idUser` (`idUser`);

--
-- Indices de la tabla `scheduledinput`
--
ALTER TABLE `scheduledinput`
  ADD PRIMARY KEY (`idSheduledInput`),
  ADD KEY `idTypeInput` (`idTypeInput`),
  ADD KEY `idType` (`idType`),
  ADD KEY `idUser` (`idUser`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `dictype`
--
ALTER TABLE `dictype`
  MODIFY `idType` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `dictypeinput`
--
ALTER TABLE `dictypeinput`
  MODIFY `idTypeInput` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `scheduledinput`
--
ALTER TABLE `scheduledinput`
  MODIFY `idSheduledInput` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `income`
--
ALTER TABLE `income`
  ADD CONSTRAINT `income_ibfk_1` FOREIGN KEY (`idType`) REFERENCES `dictype` (`idType`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `income_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `outflow`
--
ALTER TABLE `outflow`
  ADD CONSTRAINT `outflow_ibfk_1` FOREIGN KEY (`idType`) REFERENCES `dictype` (`idType`) ON DELETE CASCADE,
  ADD CONSTRAINT `outflow_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `scheduledinput`
--
ALTER TABLE `scheduledinput`
  ADD CONSTRAINT `scheduledinput_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `scheduledinput_ibfk_2` FOREIGN KEY (`idType`) REFERENCES `dictype` (`idType`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `scheduledinput_ibfk_3` FOREIGN KEY (`idTypeInput`) REFERENCES `dictypeinput` (`idTypeInput`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
