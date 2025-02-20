SELECT * FROM Projects INNER JOIN Autor ON Projects.FK_Autor = Autor.id_Autor WHERE id_Project= 2;

SELECT * FROM Autor INNER JOIN Projects ON Projects.FK_Autor = Autor.id_Autor WHERE Autor.id_Autor = 3;