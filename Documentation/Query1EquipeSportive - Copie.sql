CREATE DATABASE Equipe_sportive
USE Equipe_sportive;

GO
CREATE TABLE Roles(
IdRoles INT PRIMARY KEY,
Description VARCHAR(20)
);

CREATE TABLE Etat(
IdEtat INT PRIMARY KEY,
Description VARCHAR(20)
);

CREATE TABLE TypeEvenement(
IdTypeEvenement INT PRIMARY KEY,
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
FK_Id_Etat INT FOREIGN KEY REFERENCES dbo.Etat (IdEtat)
);

CREATE TABLE Equipe(
IdEquipe INT IDENTITY PRIMARY KEY,
Nom VARCHAR(50),
Region VARCHAR(30),
Etat INT FOREIGN KEY REFERENCES dbo.Etat (IdEtat),
DateCreation DATETIME2,
DateModification DATETIME2,
Sport VARCHAR(30),
AssociationSportive VARCHAR(100)
);

CREATE TABLE Evenements(
Id INT IDENTITY PRIMARY KEY,
Description VARCHAR(350) NOT NULL,
Emplacement VARCHAR(200) NOT NULL,
DateDebut DATETIME2,
DateFin DATETIME2,
DateCreation DATETIME2,
DateModification DATETIME2,
TypeEvenement INT FOREIGN KEY REFERENCES dbo.TypeEvenement (IdTypeEvenement),
Etat INT FOREIGN KEY REFERENCES dbo.Etat (IdEtat)
);

CREATE TABLE ConnJoueurEquipe(
Id INT FOREIGN KEY REFERENCES dbo.Utilisateur (IdUtilisateur),
FK_Id_Equipe INT FOREIGN KEY REFERENCES dbo.Equipe (IdEquipe),
FK_Id_Roles INT FOREIGN KEY REFERENCES dbo.Roles (IdRoles),
);

CREATE TABLE ConnEquipeEvenement(
FK_Id_Equipe INT FOREIGN KEY REFERENCES dbo.Equipe (IdEquipe),
FK_Id_Evenement INT FOREIGN KEY REFERENCES dbo.Evenements (Id)
);


INSERT INTO TypeEvenement(IdTypeEvenement,Description) VALUES(1,'Entrainement');
INSERT INTO TypeEvenement(IdTypeEvenement,Description) VALUES(2,'Partie');
INSERT INTO TypeEvenement(IdTypeEvenement,Description) VALUES(3,'Autre');
 

INSERT INTO Etat(IdEtat,Description) VALUES(0,'Actif');
INSERT INTO Etat(IdEtat,Description) VALUES(1,'Inactif');
 

INSERT INTO Evenements(Description, Emplacement, DateDebut, DateFin,DateCreation, DateModification,TypeEvenement,Etat)
    VALUES ('Match de foot', 'Sainte-foy', '2023-03-15','2023-03-17','2023-03-12','2023-03-15',1,1);

 

INSERT INTO Evenements(Description, Emplacement, DateDebut, DateFin,DateCreation, DateModification,TypeEvenement,Etat)
    VALUES ('Partie de soccer', 'Sagenay', '2023-03-15','2023-03-17','2023-03-12','2023-03-15',2,2);

 

INSERT INTO Evenements(Description, Emplacement, DateDebut, DateFin,DateCreation, DateModification,TypeEvenement,Etat)
    VALUES ('Match de basketball', 'Yaoundé', '2023-03-20','2023-03-23','2023-03-15','2023-03-15',3,3);