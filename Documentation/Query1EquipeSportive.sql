CREATE DATABASE Equipe_sportive
USE Equipe_sportive;

GO
CREATE TABLE Roles(
IdRole TINYINT PRIMARY KEY,
Description VARCHAR(20)
);
CREATE TABLE Etat(
IdEtat TINYINT PRIMARY KEY,
Description VARCHAR(20)
);
CREATE TABLE TypeEvenement(
IdType TINYINT PRIMARY KEY,
Description VARCHAR(20)
);

CREATE TABLE Utilisateur(
IdUtilisateur INT IDENTITY PRIMARY KEY,
Nom VARCHAR(30),
Prenom VARCHAR(30),
Email VARCHAR(100),
Adresse VARCHAR(120),
NumTelephone VARCHAR(20),
DateCreation DATETIME2,
DateModification DATETIME2,
EstAthlete BIT,
EstTuteur BIT,
EstEntraineur BIT,
EstAdmin Bit,
Etat TINYINT FOREIGN KEY REFERENCES dbo.Etat (IdEtat)
);

CREATE TABLE Equipe(
IdEquipe INT IDENTITY PRIMARY KEY,
Nom VARCHAR(50),
Region VARCHAR(30),
Etat TINYINT FOREIGN KEY REFERENCES dbo.Etat (IdEtat),
DateCreation DATETIME2,
DateModification DATETIME2,
Sport VARCHAR(30),
AssociationSportive VARCHAR(100)
);

CREATE TABLE Evenement(
IdEvenement INT IDENTITY PRIMARY KEY,
Object VARCHAR(350) NOT NULL,
DateDebut DATETIME2,
DateFin DATETIME2,
DateCreation DATETIME2,
DateModification DATETIME2,
Type TINYINT FOREIGN KEY REFERENCES dbo.TypeEvenement (IdType),
Etat TINYINT FOREIGN KEY REFERENCES dbo.Etat (IdEtat)
);


CREATE TABLE ConnJoueurEquipe(
IdUtilisateur INT FOREIGN KEY REFERENCES dbo.Utilisateur (IdUtilisateur),
IdEquipe INT FOREIGN KEY REFERENCES dbo.Equipe (IdEquipe),
Roles TINYINT FOREIGN KEY REFERENCES dbo.Roles (IdRole),
);

CREATE TABLE ConnEquipeEvenement(
IdEquipe INT FOREIGN KEY REFERENCES dbo.Equipe (IdEquipe),
IdEvenement INT FOREIGN KEY REFERENCES dbo.Evenement (IdEvenement)
);