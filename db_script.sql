--
-- ER/Studio 8.0 SQL Code Generation
-- Company :      CR
-- Project :      DATA MODEL
-- Author :       Carlos Rodriguez
--
-- Date Created : Tuesday, August 11, 2015 16:44:09
-- Target DBMS : MySQL 3.x
--

-- 
-- TABLE: ALUMNO 
--

CREATE TABLE ALUMNO(
    maestro    VARCHAR(9)     NOT NULL,
    seccion    VARCHAR(50)    NOT NULL,
    carnet     VARCHAR(9)     NOT NULL,
    nombre     VARCHAR(50),
    PRIMARY KEY (maestro, seccion, carnet)
)TYPE=INNODB
;



-- 
-- TABLE: ASISTENCIA 
--

CREATE TABLE ASISTENCIA(
    id_evento    INT        NOT NULL,
    carnet       CHAR(9)    NOT NULL,
    PRIMARY KEY (id_evento, carnet)
)TYPE=INNODB
;



-- 
-- TABLE: EVENTO 
--

CREATE TABLE EVENTO(
    id_evento    INT            AUTO_INCREMENT,
    nombre       VARCHAR(25)    NOT NULL,
    inicio       DATETIME,
    final        DATETIME,
    estado       INT            NOT NULL,
    PRIMARY KEY (id_evento)
)TYPE=INNODB
;



-- 
-- TABLE: SECCION 
--

CREATE TABLE SECCION(
    maestro    VARCHAR(9)     NOT NULL,
    nombre     VARCHAR(50)    NOT NULL,
    PRIMARY KEY (maestro, nombre)
)TYPE=INNODB
;



-- 
-- TABLE: USUARIO 
--

CREATE TABLE USUARIO(
    carnet         VARCHAR(9)     NOT NULL,
    password       VARCHAR(15)    NOT NULL,
    nombre         VARCHAR(15),
    apellido       VARCHAR(15),
    rol            INT            NOT NULL,
    bloqueada      INT            NOT NULL,
    libre_hasta    DATETIME,
    PRIMARY KEY (carnet)
)TYPE=INNODB
;



-- 
-- TABLE: ALUMNO 
--

ALTER TABLE ALUMNO ADD CONSTRAINT RefSECCION2 
    FOREIGN KEY (maestro, seccion)
    REFERENCES SECCION(maestro, nombre)
;


-- 
-- TABLE: ASISTENCIA 
--

ALTER TABLE ASISTENCIA ADD CONSTRAINT RefEVENTO3 
    FOREIGN KEY (id_evento)
    REFERENCES EVENTO(id_evento)
;


-- 
-- TABLE: SECCION 
--

ALTER TABLE SECCION ADD CONSTRAINT RefUSUARIO1 
    FOREIGN KEY (maestro)
    REFERENCES USUARIO(carnet)
;


