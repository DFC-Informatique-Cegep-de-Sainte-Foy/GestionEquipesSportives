/****** Script for SelectTopNRows command from SSMS  ******/
-- SELECT TOP (1000) [IdEvenementJoueur]
--       ,[EstPresentAEvenement]
--       ,[FK_Id_Evenement]
--       ,[FK_Id_Utilisateur]
--   FROM [Equipe_sportive].[dbo].[EvenementJoueur]

/*
FK_Id_Evenement
('77f03161-b320-48f6-b65f-9ca8080f40e1', 'Partie contre les capitales','accumsan interdum','Apr 20, 2022 11:44','Apr 21, 2022 11:44',1,1)
FK_Id_Utilisateur
IdUtilisateur	Nom	Prenom	Age	Email	Adresse	NumTelephone	DateCreation	DateModification	Etat	Fk_Id_Etat	Fk_Id_Roles
581BD387-9FEC-4659-B374-502EFABE61A2	Carufel	Kevin	34	kevin.carufel@hotmail.com	PO Box 36733	(667) 6927777	2023-04-22 00:00:00.0000000	2023-04-22 00:00:00.0000000	1	1	3
*/

insert into [dbo].[EvenementJoueur] (FK_Id_Evenement, FK_Id_Utilisateur, EstPresentAEvenement)
 values
('77f03161-b320-48f6-b65f-9ca8080f40e1','581BD387-9FEC-4659-B374-502EFABE61A2', true),
('4E8A76BC-DE7A-4969-BE20-2EB5A6B0C1F0','581BD387-9FEC-4659-B374-502EFABE61A2', true);