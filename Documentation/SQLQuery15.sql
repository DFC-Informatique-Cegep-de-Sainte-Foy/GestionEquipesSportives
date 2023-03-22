Use master;
GO
CREATE DATABASE Equipe_sportive;

GO
USE Equipe_sportive;

GO
CREATE TABLE Roles(
IdRole INT PRIMARY KEY,
Description VARCHAR(50)
);

CREATE TABLE Etats(
IdEtat BIT PRIMARY KEY,
Description VARCHAR(50)
);

CREATE TABLE TypeEvenements(
IdTypeEvenement INT PRIMARY KEY,
Description VARCHAR(50)
);

CREATE TABLE Utilisateur(
IdUtilisateur UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
Nom VARCHAR(50),
Prenom VARCHAR(50),
Email VARCHAR(100),
Adresse VARCHAR(120),
NumTelephone VARCHAR(50),
DateCreation DATETIME2,
DateModification DATETIME2,
EstJoueur BIT,
EstTuteur BIT,
EstEntraineur BIT,
EstAdmin BIT,
FK_Id_Etat BIT FOREIGN KEY REFERENCES dbo.Etats (IdEtat)
);

CREATE TABLE Equipe(
IdEquipe UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
Nom VARCHAR(50),
Region VARCHAR(100),
Etat BIT FOREIGN KEY REFERENCES dbo.Etats (IdEtat),
DateCreation DATETIME2,
DateModification DATETIME2,
Sport VARCHAR(100),
AssociationSportive VARCHAR(100)
);

CREATE TABLE Evenement(
IdEvenement UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
Description VARCHAR(350) NOT NULL,
Emplacement VARCHAR(200) NOT NULL,
DateDebut DATETIME2,
DateFin DATETIME2,
DateCreation DATETIME2,
DateModification DATETIME2,
IdTypeEvenement INT FOREIGN KEY REFERENCES dbo.TypeEvenements (IdTypeEvenement),
Etat BIT FOREIGN KEY REFERENCES dbo.Etats (IdEtat)
);

CREATE TABLE EquipeJoueur(
IdJoueurEquipe UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
Id UNIQUEIDENTIFIER FOREIGN KEY REFERENCES dbo.Utilisateur (IdUtilisateur),
FK_Id_Equipe UNIQUEIDENTIFIER FOREIGN KEY REFERENCES dbo.Equipe (IdEquipe),
FK_Id_Roles INT FOREIGN KEY REFERENCES dbo.Roles (IdRole),
);

CREATE TABLE EquipeEvenement(
IdEquipeEvenement UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
FK_Id_Equipe UNIQUEIDENTIFIER FOREIGN KEY REFERENCES dbo.Equipe (IdEquipe),
FK_Id_Evenement UNIQUEIDENTIFIER FOREIGN KEY REFERENCES dbo.Evenement (IdEvenement)
);

CREATE TABLE EvenementJoueur(
IdEvenementJoueur UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
EstPresentAEvenement BIT,
FK_Id_Evenement UNIQUEIDENTIFIER FOREIGN KEY REFERENCES dbo.Evenement (IdEvenement),
FK_Id_Utilisateur UNIQUEIDENTIFIER FOREIGN KEY REFERENCES dbo.Utilisateur (IdUtilisateur)
);




GO
INSERT INTO TypeEvenements(IdTypeEvenement,Description) VALUES(1,'Entrainement');
INSERT INTO TypeEvenements(IdTypeEvenement,Description) VALUES(2,'Partie');
INSERT INTO TypeEvenements(IdTypeEvenement,Description) VALUES(3,'Autre');
 
GO
INSERT INTO Etats(IdEtat,Description) VALUES(0,'Actif');
INSERT INTO Etats(IdEtat,Description) VALUES(1,'Inactif');
 
--GO
--INSERT INTO Evenement(Description, Emplacement, DateDebut, DateFin,DateCreation, DateModification, IdTypeEvenement, Etat)
--    VALUES ('Match de foot', 'Sainte-foy', '2023-03-15','2023-03-17','2023-03-13','2023-03-14', 1, 1);

--GO
--INSERT INTO Evenement(Description, Emplacement, DateDebut, DateFin, DateCreation, DateModification, IdTypeEvenement, Etat)
--    VALUES ('Partie de soccer', 'Sagenay', '2023-03-15','2023-03-17','2023-03-12','2023-03-15',2,0);

--GO
--INSERT INTO Evenement(Description, Emplacement, DateDebut, DateFin, DateCreation, DateModification, IdTypeEvenement, Etat)
--    VALUES ('Match de basketball', 'Yaoundé', '2023-03-20','2023-03-23','2023-03-15','2023-03-15',1,1);

--Select * from Evenement;