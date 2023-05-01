use Equipe_sportive

/* 
Table: EquipeEvenement
PK: FK_Id_Equipe, 
('f999a41f-74b8-4f95-8992-a1ca00f3d62a', 'Strosin-Bins', 'Larvik', '2022-08-13', '2022-05-19', 'Football', 'Services', 1, 1),
('c96bbb6a-36a5-4584-a38e-7cae7e19d9b7', 'Reynolds Inc', 'Sagua la Grande', '2022-06-04', '2022-06-09', 'Hokey', 'Human Resources', 1, 1),
FK_Id_Evenement
('4af815c6-e466-4b36-a85e-a88758aa33dc', 'Grande finale','Nunc commodo','Apr 20, 2022 11:44','Apr 21, 2022 11:44',1,1),
('77f03161-b320-48f6-b65f-9ca8080f40e1', 'Partie contre les capitales','accumsan interdum','Apr 20, 2022 11:44','Apr 21, 2022 11:44',1,1)
('4689a4c1-5c14-4983-9a15-bf51e52c9ad4', 'arcu vel quam','amet, dapibus','Apr 20, 2022 11:44','Apr 21, 2022 11:44',1,1),
*/

insert into EquipeEvenement ([FK_Id_Equipe], [FK_Id_Evenement])
values 
('f999a41f-74b8-4f95-8992-a1ca00f3d62a', '4af815c6-e466-4b36-a85e-a88758aa33dc'),
('f999a41f-74b8-4f95-8992-a1ca00f3d62a', '77f03161-b320-48f6-b65f-9ca8080f40e1'),
('f999a41f-74b8-4f95-8992-a1ca00f3d62a', '4689a4c1-5c14-4983-9a15-bf51e52c9ad4'),
('c96bbb6a-36a5-4584-a38e-7cae7e19d9b7', '4af815c6-e466-4b36-a85e-a88758aa33dc');