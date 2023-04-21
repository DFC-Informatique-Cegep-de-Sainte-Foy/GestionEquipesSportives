--IF EXISTS(SELECT 1 FROM sys.tables WHERE object_id = OBJECT_ID('Evenement'))
--BEGIN;
--    DROP TABLE [Evenement];
--END;
--GO

--CREATE TABLE [Evenement] (
--    [EvenementID] INTEGER NOT NULL IDENTITY(1, 1),
--    [Description] VARCHAR(MAX) NULL,
--    [Emplacement] VARCHAR(MAX) NULL,
--    [dateDebut] VARCHAR(255) NULL,
--    [dateFin] VARCHAR(255) NULL,
--    [TypeEvenement] INTEGER NULL,
--    PRIMARY KEY ([EvenementID])
--);
--GO

INSERT INTO [Evenement] (Description,Emplacement,dateDebut,dateFin, Etat, Fk_Id_TypeEvenement)
VALUES
  ('Grande finale','Nunc commodo','Apr 20, 2022 11:44','Apr 21, 2022 11:44',1,1),
  ('Partie contre les capitales','accumsan interdum','Apr 20, 2022 11:44','Apr 21, 2022 11:44',1,1),
  ('Premiere partie de la saison','sodales purus,','Apr 20, 2022 11:44','Apr 21, 2022 11:44',1,1),
  ('montes, nascetur ridiculus','purus ac','Apr 20, 2022 11:44','Apr 21, 2022 11:44',1,1),
  ('egestas. Duis ac','mauris, aliquam','Apr 20, 2022 11:44','Apr 21, 2022 11:44',1,1),
  ('morbi tristique senectus','sit amet,','Apr 20, 2022 11:44','Apr 21, 2022 11:44',1,2),
  ('Partie contre les capitale','Nulla facilisis.','Apr 20, 2022 11:44','Apr 21, 2022 11:44',1,0),
  ('libero. Morbi accumsan','at sem','Apr 20, 2022 11:44','Apr 21, 2022 11:44',1,1),
  ('arcu vel quam','amet, dapibus','Apr 20, 2022 11:44','Apr 21, 2022 11:44',1,1),
  ('Partie contre les capitale','Cras pellentesque.','Apr 20, 2022 11:44','Apr 21, 2022 11:44',1,1);


