CREATE TABLE Projects (
id_Project INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR (60) NOT NULL,
slogan VARCHAR (60),
technologies VARCHAR (60),
repo TEXT NOT NULL,
demo TEXT NOT NULL,
photo TEXT 
);

CREATE TABLE Autor (
id_Autor INT AUTO_INCREMENT PRIMARY KEY,
autor VARCHAR (45) NOT NULL,
job VARCHAR (45),
image TEXT
);

SELECT * FROM Projects;
SELECT * FROM Autor;


INSERT INTO Projects (name, slogan, technologies, repo, demo, photo) VALUES
('Elegant', 'Diseños Exclusivos', 'React JS - HTML - CSS', 'www.google.es', 'www.google.es', 'src\images\ebook-example.jpg');
INSERT INTO Autor  (autor, job, image) VALUES
('Emmelie Bjorjlund', 'Full Stack Developer', 'src\images\ebook-example.jpg');
INSERT INTO Projects (name, slogan, technologies, repo, demo, photo) VALUES
("Piedra, papel y tijera", "El mejor juego de la historia", "HTML - CSS - JS", "promo_b_modulo_2_PiedraPapelTijera","https://tsalvatellap.github.io/promo_b_modulo_2_PiedraPapelTijera/", "Descargas/photo.jpg");
INSERT INTO Autor  (autor, job, image) VALUES
("Tania Salvatella", "Buscavidas", "photo.jpg");

INSERT INTO Projects (name, slogan, technologies, repo, demo, photo) VALUES
('Cuidado con el Grogu', 'Diversión aprendiendo', 'React JS - HTML - CSS', 'https://github.com/AnaEDiBlasi/promo-b-module-3-pair-5-grogu-game', 'https://anaediblasi.github.io/promo-b-module-3-pair-5-grogu-game/', 'photo.jpg');
INSERT INTO Autor  (autor, job, image) VALUES
('Ana Elisa Di Blasi', 'Full Stack Developer', 'photo.jpg');

DESCRIBE Projects;
ALTER TABLE Projects ADD Foreign key (FK_Autor) references Autor (id_Autor);
DESCRIBE Autor;

SELECT * FROM Projects inner join Autor on Projects.FK_Autor = Autor.id_Autor;




