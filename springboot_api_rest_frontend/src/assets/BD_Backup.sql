-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: crud_angular_rest
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `contacto`
--

DROP TABLE IF EXISTS `contacto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `apellidos` varchar(50) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `fecha_registro` datetime(6) DEFAULT NULL,
  `nombre` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `empleado_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK2n25rys9cp2tmgt8j3s9w5i5b` (`email`),
  UNIQUE KEY `UKfab9hm3p6dx8oc972p2rpq0kb` (`telefono`),
  UNIQUE KEY `UK6wfx2gsr8a00hqjsgmjdei7tt` (`empleado_id`),
  CONSTRAINT `FKdjsdne94splvcqpc52ocliee3` FOREIGN KEY (`empleado_id`) REFERENCES `empleado` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacto`
--

LOCK TABLES `contacto` WRITE;
/*!40000 ALTER TABLE `contacto` DISABLE KEYS */;
INSERT INTO `contacto` VALUES (1,'Mendoza','Calle Ejemplo 101','maria.mendoza@example.com','2024-10-19 21:55:42.000000','María','637123456',NULL),(2,'Pérez','Avenida Siempre Viva 202','juan.perez@example.com','2024-10-19 21:55:42.000000','Juan','698234567',NULL),(3,'Gutiérrez','Calle Real 303','sofia.gutierrez@example.com','2024-10-19 21:55:42.000000','Sofía','628345678',NULL),(4,'Cruz','Calle Nueva 404','diego.cruz@example.com','2024-10-19 21:55:42.000000','Diego','675456789',NULL),(5,'Valenzuela','Avenida Principal 505','ana.valenzuela@example.com','2024-10-19 21:55:42.000000','Ana','689567890',NULL),(6,'Torres','Calle Vieja 606','clara.torres@example.com','2024-10-19 21:55:42.000000','Clara','691678901',NULL),(7,'Morales','Avenida Cielo 707','ricardo.morales@example.com','2024-10-19 21:55:42.000000','Ricardo','678789012',NULL),(8,'Vázquez','Calle 8 808','gabriela.vazquez@example.com','2024-10-19 21:55:42.000000','Gabriela','612890123',NULL),(9,'Reyes','Calle Abierta 909','cristian.reyes@example.com','2024-10-19 21:55:42.000000','Cristian','688901234',NULL),(10,'Montalvo','Avenida Océano 111','esteban.montalvo@example.com','2024-10-19 21:55:42.000000','Esteban','634012345',NULL),(11,'Silva','Calle Cerrada 222','valentina.silva@example.com','2024-10-19 21:55:42.000000','Valentina','676123456',NULL),(12,'Hernández','Calle Larga 333','javier.hernandez@example.com','2024-10-19 21:55:42.000000','Javier','693234567',NULL),(13,'Alvarado','Avenida Secundaria 444','claudia.alvarado@example.com','2024-10-19 21:55:42.000000','Claudia','678345678',NULL),(14,'Martinez','Calle 5 555','fernando.martinez@example.com','2024-10-19 21:55:42.000000','Fernando','645456789',NULL),(15,'López','Calle Vista 666','samantha.lopez@example.com','2024-10-19 21:55:42.000000','Samantha','654567890',NULL),(16,'Ríos','Avenida Oculta 777','emilio.rios@example.com','2024-10-19 21:55:42.000000','Emilio','684678901',NULL),(17,'Cortez','Calle 10 888','teresa.cortez@example.com','2024-10-19 21:55:42.000000','Teresa','690789012',NULL),(18,'Cervantes','Calle Oscura 999','hugo.cervantes@example.com','2024-10-19 21:55:42.000000','Hugo','671890123',NULL),(19,'Navarro','Avenida Verde 121','patricia.navarro@example.com','2024-10-19 21:55:42.000000','Patricia','679901234',NULL),(20,'García','Calle Azul 131','leonardo.garcia@example.com','2024-10-19 21:55:42.000000','Leonardo','636123456',NULL);
/*!40000 ALTER TABLE `contacto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamento`
--

DROP TABLE IF EXISTS `departamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departamento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) DEFAULT NULL,
  `nombre_departamento` varchar(100) NOT NULL,
  `jefe_departamento` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKoo0048at0g9382sfgurv5p8b9` (`nombre_departamento`),
  UNIQUE KEY `UK5ugyoew23b0i7h084j1b1bufb` (`jefe_departamento`),
  UNIQUE KEY `unique_jefe_departamento` (`jefe_departamento`),
  CONSTRAINT `FKgsl2yrhinnribglyxth9kqa7p` FOREIGN KEY (`jefe_departamento`) REFERENCES `empleado` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamento`
--

LOCK TABLES `departamento` WRITE;
/*!40000 ALTER TABLE `departamento` DISABLE KEYS */;
INSERT INTO `departamento` VALUES (1,NULL,'Recursos Humanos',NULL),(2,NULL,'Sistemas',NULL),(3,NULL,'Tecnología de la Información',NULL),(4,NULL,'Marketing',NULL),(5,NULL,'Ventas',NULL),(6,NULL,'Investigación y Desarrollo',NULL),(7,NULL,'Logística',NULL),(8,NULL,'Atención al Cliente',NULL),(9,NULL,'Legal',NULL),(10,NULL,'Producción',NULL);
/*!40000 ALTER TABLE `departamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleado` (
  `id` int NOT NULL AUTO_INCREMENT,
  `apellidos` varchar(100) NOT NULL,
  `correo_electronico` varchar(100) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `es_jefe` bit(1) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `fecha_registro` datetime(6) DEFAULT NULL,
  `nickname` varchar(50) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `departamento_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK4aeilml7d5u4hanijlpykfdql` (`nickname`),
  UNIQUE KEY `UK4qdaf2666jbwsetk6eri0jn6m` (`correo_electronico`),
  UNIQUE KEY `UKoinctok6ayd7sbigtv9j1itj6` (`telefono`),
  KEY `FKhdjjhohpyjsfta5g6p8b8e00i` (`departamento_id`),
  CONSTRAINT `FKhdjjhohpyjsfta5g6p8b8e00i` FOREIGN KEY (`departamento_id`) REFERENCES `departamento` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
INSERT INTO `empleado` VALUES (1,'Ledo','jose.ledo@arela.com','Avenida de Barcelona, 25, 6ºB',_binary '','1978-06-08','2024-10-19 21:55:16.000000','joseLedo','Jose','637392907',6),(2,'García','maria.garcia@example.com','Avenida Siempre Viva 456',_binary '\0','1985-08-20','2024-10-19 21:55:16.000000','mgarcia','María','698765432',2),(3,'López','carlos.lopez@example.com','Calle Ejemplo 789',_binary '','1980-12-10','2024-10-19 21:55:16.000000','carlitos','Carlos','623456789',3),(4,'Sánchez','laura.sanchez@example.com','Calle Verdadera 321',_binary '\0','1992-02-28','2024-10-19 21:55:16.000000','laura_s','Laura','685432109',4),(5,'Ramírez','ana.ramirez@example.com','Avenida Principal 654',_binary '\0','1995-11-11','2024-10-19 21:55:16.000000','anita','Ana','679012345',5),(6,'Martínez','luis.martinez@example.com','Calle Real 987',_binary '\0','1988-07-07','2024-10-19 21:55:16.000000','lmartinez','Luis','687654321',6),(7,'Torres','sofia.torres@example.com','Calle 123 123',_binary '\0','1993-03-15','2024-10-19 21:55:16.000000','sofi_t','Sofía','678801234',7),(8,'Hernández','miguel.hernandez@example.com','Calle 456 456',_binary '','1982-06-21','2024-10-19 21:55:16.000000','migue','Miguel','634567890',8),(9,'Fernández','isabella.fernandez@example.com','Calle 789 789',_binary '\0','1991-09-30','2024-10-19 21:55:16.000000','isa','Isabella','698123456',1),(10,'González','jose.gonzalez@example.com','Avenida Oculta 159',_binary '\0','1994-10-05','2024-10-19 21:55:16.000000','jose_g','José','654789321',2),(11,'Cruz','valentina.cruz@example.com','Calle Larga 753',_binary '\0','1989-04-17','2024-10-19 21:55:16.000000','valen','Valentina','612345678',3),(12,'Jiménez','diego.jimenez@example.com','Avenida Cortada 951',_binary '','1981-01-12','2024-10-19 21:55:16.000000','diego','Diego','674512389',4),(13,'Mora','camila.mora@example.com','Calle Nueva 357',_binary '\0','1987-08-19','2024-10-19 21:55:16.000000','cami','Camila','672891034',5),(14,'Rojas','pablo.rojas@example.com','Calle Vieja 258',_binary '\0','1983-07-07','2024-10-19 21:55:16.000000','pablito','Pablo','647123890',6),(15,'Díaz','martina.diaz@example.com','Calle Corta 654',_binary '\0','1990-11-24','2024-10-19 21:55:16.000000','marti','Martina','676543218',7),(16,'Salas','samuel.salas@example.com','Calle Desconocida 369',_binary '','1986-02-12','2024-10-19 21:55:16.000000','sam','Samuel','698765431',1),(17,'Cordero','natalia.cordero@example.com','Calle Secundaria 159',_binary '\0','1995-12-05','2024-10-19 21:55:16.000000','nati','Natalia','611234567',1),(18,'Paredes','fernando.paredes@example.com','Avenida Centenario 951',_binary '\0','1992-03-18','2024-10-19 21:55:16.000000','fer','Fernando','688765432',2),(19,'Acosta','valerio.acosta@example.com','Calle Primaria 753',_binary '\0','1984-06-15','2024-10-19 21:55:16.000000','valer','Valerio','654321789',3),(20,'Castillo','lucia.castillo@example.com','Calle 404 111',_binary '\0','1996-01-22','2024-10-19 21:55:16.000000','lucy','Lucía','655432109',4),(21,'Vega','martin.vega@example.com','Calle Abierta 123',_binary '','1980-09-09','2024-10-19 21:55:16.000000','martin','Martín','698765890',5),(22,'Zamora','agustin.zamora@example.com','Calle Cerrada 456',_binary '\0','1985-04-30','2024-10-19 21:55:16.000000','agus','Agustín','643215789',6),(23,'Rivas','marisol.rivas@example.com','Avenida Océano 321',_binary '','1990-08-08','2024-10-19 21:55:16.000000','mari','Marisol','689012345',7),(24,'Gonzalo','oscar.gonzalo@example.com','Calle Conocida 654',_binary '','1982-07-14','2024-10-19 21:55:16.000000','oscar','Oscar','698765043',9),(25,'Hidalgo','ricardo.hidalgo@example.com','Avenida Cielo 852',_binary '\0','1993-05-16','2024-10-19 21:55:16.000000','rico','Ricardo','617890123',1),(26,'Peña','barbara.pena@example.com','Calle Vista 789',_binary '','1991-11-25','2024-10-19 21:55:16.000000','barbie','Bárbara','637654890',2),(27,'Téllez','esteban.tellez@example.com','Calle Espiritual 951',_binary '\0','1989-03-11','2024-10-19 21:55:16.000000','este','Esteban','646789123',3),(28,'Maldonado','claudia.maldonado@example.com','Calle Alegre 258',_binary '\0','1996-10-20','2024-10-19 21:55:16.000000','claud','Claudia','678901234',4),(29,'Castro','alberto.castro@example.com','Calle Brillante 357',_binary '','1984-06-28','2024-10-19 21:55:16.000000','albert','Alberto','684321456',10);
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKl0qdsam7tunbtmxcmeeyfcifk` (`nombre_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contrasena` varchar(30) NOT NULL,
  `fecha_registro` datetime(6) DEFAULT NULL,
  `nickname` varchar(50) NOT NULL,
  `empleado_id` int DEFAULT NULL,
  `rol_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKlbkxel95iw6vtu2w6huyrpu26` (`nickname`),
  UNIQUE KEY `UK4x5qp17tw5kh1feqdgqu8ek4o` (`empleado_id`),
  KEY `FKshkwj12wg6vkm6iuwhvcfpct8` (`rol_id`),
  CONSTRAINT `FKjn24nnj8w0mmt2eq54ol6xrq2` FOREIGN KEY (`empleado_id`) REFERENCES `empleado` (`id`),
  CONSTRAINT `FKshkwj12wg6vkm6iuwhvcfpct8` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'password123','2024-10-19 21:56:06.000000','nick_julian',NULL,NULL),(2,'mypassword','2024-10-19 21:56:06.000000','nick_patricia',NULL,NULL),(3,'securepass','2024-10-19 21:56:06.000000','nick_jorge',NULL,NULL),(4,'admin2024','2024-10-19 21:56:06.000000','nick_teresa',NULL,NULL),(5,'qwerty123','2024-10-19 21:56:06.000000','nick_carlosS',NULL,NULL),(6,'letmein2024','2024-10-19 21:56:06.000000','nick_anaM',NULL,NULL),(7,'helloWorld','2024-10-19 21:56:06.000000','nick_luisG',NULL,NULL),(8,'123456abc','2024-10-19 21:56:06.000000','nick_mariaF',NULL,NULL),(9,'sunshine2024','2024-10-19 21:56:06.000000','nick_javierX',NULL,NULL),(10,'mySecret!','2024-10-19 21:56:06.000000','nick_claudiaT',NULL,NULL),(11,'superpass123','2024-10-19 21:56:06.000000','nick_fernandoA',NULL,NULL),(12,'passw0rd','2024-10-19 21:56:06.000000','nick_sofiaL',NULL,NULL),(13,'welcome123','2024-10-19 21:56:06.000000','nick_emilioB',NULL,NULL),(14,'secretpassword','2024-10-19 21:56:06.000000','nick_valeriaC',NULL,NULL),(15,'mypass2024','2024-10-19 21:56:06.000000','nick_miguelD',NULL,NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'crud_angular_rest'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-19 22:06:07
