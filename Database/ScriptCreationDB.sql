Use master;
GO
CREATE DATABASE Equipe_sportive;

GO
USE Equipe_sportive;

GO
CREATE TABLE Roles(
IdRole INT PRIMARY KEY,
Description VARCHAR(50) NOT NULL
);

CREATE TABLE Etats(
IdEtat BIT PRIMARY KEY,
Description VARCHAR(50) NOT NULL
);

CREATE TABLE TypeEvenements(
IdTypeEvenement INT PRIMARY KEY,
Description VARCHAR(50) NOT NULL
);

CREATE TABLE Utilisateur(
IdUtilisateur UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
Nom VARCHAR(50) NOT NULL,
Prenom VARCHAR(50) NOT NULL,
Age INT NOT NULL,
Email VARCHAR(100) NOT NULL,
Adresse VARCHAR(120),
NumTelephone VARCHAR(50),
DateCreation DATETIME2,
DateModification DATETIME2,
Etat BIT NOT NULL,
Fk_Id_Etat BIT FOREIGN KEY REFERENCES dbo.Etats (IdEtat),
Fk_Id_Roles INT FOREIGN KEY REFERENCES dbo.Roles (IdRole)
);

CREATE TABLE Equipe(
IdEquipe UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
Nom VARCHAR(50) NOT NULL,
Region VARCHAR(100) ,
DateCreation DATETIME2,
DateModification DATETIME2,
Sport VARCHAR(100) NOT NULL,
AssociationSportive VARCHAR(100),
Etat BIT NOT NULL,
Fk_Id_Etat BIT FOREIGN KEY REFERENCES dbo.Etats (IdEtat)
);

CREATE TABLE Evenement(
IdEvenement UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
Description VARCHAR(350) NOT NULL,
Emplacement VARCHAR(200) NOT NULL,
DateDebut DATETIME2 NOT NULL,
DateFin DATETIME2 NOT NULL,
DateCreation DATETIME2,
DateModification DATETIME2,
Etat BIT NOT NULL,
Fk_Id_TypeEvenement INT FOREIGN KEY REFERENCES dbo.TypeEvenements (IdTypeEvenement) NOT NULL);

CREATE TABLE EquipeJoueur(
IdJoueurEquipe UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
Fk_Id_Utilisateur UNIQUEIDENTIFIER FOREIGN KEY REFERENCES dbo.Utilisateur (IdUtilisateur) NOT NULL,
FK_Id_Equipe UNIQUEIDENTIFIER FOREIGN KEY REFERENCES dbo.Equipe (IdEquipe) NOT NULL
);

CREATE TABLE EquipeEvenement(
IdEquipeEvenement UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
FK_Id_Equipe UNIQUEIDENTIFIER FOREIGN KEY REFERENCES dbo.Equipe (IdEquipe) NOT NULL,
FK_Id_Evenement UNIQUEIDENTIFIER FOREIGN KEY REFERENCES dbo.Evenement (IdEvenement) NOT NULL
);

CREATE TABLE EvenementJoueur(
IdEvenementJoueur UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
EstPresentAEvenement BIT NOT NULL,
FK_Id_Evenement UNIQUEIDENTIFIER FOREIGN KEY REFERENCES dbo.Evenement (IdEvenement) NOT NULL,
FK_Id_Utilisateur UNIQUEIDENTIFIER FOREIGN KEY REFERENCES dbo.Utilisateur (IdUtilisateur) NOT NULL
);

GO
INSERT INTO TypeEvenements(IdTypeEvenement,Description) VALUES(0,'Entrainement');
INSERT INTO TypeEvenements(IdTypeEvenement,Description) VALUES(1,'Partie');
INSERT INTO TypeEvenements(IdTypeEvenement,Description) VALUES(2,'Autre');
 
GO
INSERT INTO Etats(IdEtat,Description) VALUES(0,'Inactif');
INSERT INTO Etats(IdEtat,Description) VALUES(1,'Actif');

Go
INSERT INTO Roles(IdRole, Description) VALUES(0, 'Administrateur')
INSERT INTO Roles(IdRole, Description) VALUES(1, 'Entraineur')
INSERT INTO Roles(IdRole, Description) VALUES(2, 'Tuteur')
INSERT INTO Roles(IdRole, Description) VALUES(3, 'Joueur')

--GO
--INSERT INTO Evenement(Description, Emplacement, DateDebut, DateFin,DateCreation, DateModification, IdTypeEvenement, Etat)
--   VALUES ('Match de foot', 'Sainte-foy', '2023-03-15','2023-03-17','2023-03-13','2023-03-14', 1, 1);

--GO
--INSERT INTO Evenement(Description, Emplacement, DateDebut, DateFin, DateCreation, DateModification, IdTypeEvenement, Etat)
--    VALUES ('Partie de soccer', 'Sagenay', '2023-03-15','2023-03-17','2023-03-12','2023-03-15',2,0);

--GO
--INSERT INTO Evenement(IdEvenement, Description, Emplacement, DateDebut, DateFin, DateCreation, DateModification, IdTypeEvenement, Etat)
--    VALUES ('EEED1C48-5DCE-4273-906E-57290EE21414','Match de basketball', 'Yaound�', '2023-03-20','2023-03-23','2023-03-15','2023-03-15', 1, 0);

--Select * from Evenement;