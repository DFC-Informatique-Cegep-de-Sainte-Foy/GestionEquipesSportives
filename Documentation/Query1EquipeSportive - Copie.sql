CREATE DATABASE Equipe_sportive
USE Equipe_sportive;

GO
CREATE TABLE Roles(
IdRoles TINYINT PRIMARY KEY,
Description VARCHAR(20)
);

CREATE TABLE Etat(
IdEtat TINYINT PRIMARY KEY,
Description VARCHAR(20)
);

CREATE TABLE TypeEvenement(
IdTypeEvenement TINYINT PRIMARY KEY,
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
FK_Id_Etat TINYINT FOREIGN KEY REFERENCES dbo.Etat (IdEtat)
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
Description VARCHAR(350) NOT NULL,
Emplacement VARCHAR(200) NOT NULL,
DateDebut DATETIME2,
DateFin DATETIME2,
DateCreation DATETIME2,
TypeEvenement TINYINT FOREIGN KEY REFERENCES dbo.TypeEvenement (IdTypeEvenement),
FK_Id_Etat TINYINT FOREIGN KEY REFERENCES dbo.Etat (IdEtat)
);

CREATE TABLE ConnJoueurEquipe(
Id INT FOREIGN KEY REFERENCES dbo.Utilisateur (IdUtilisateur),
FK_Id_Equipe INT FOREIGN KEY REFERENCES dbo.Equipe (IdEquipe),
FK_Id_Roles TINYINT FOREIGN KEY REFERENCES dbo.Roles (IdRoles),
);

CREATE TABLE ConnEquipeEvenement(
FK_Id_Equipe INT FOREIGN KEY REFERENCES dbo.Equipe (IdEquipe),
FK_Id_Evenement INT FOREIGN KEY REFERENCES dbo.Evenement (IdEvenement)
);