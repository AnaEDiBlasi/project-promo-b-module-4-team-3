CREATE DATABASE molones;
USE molones;
CREATE TABLE Projects (
id_Project INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR (60) NOT NULL,
slogan VARCHAR (60),
technologies VARCHAR (60),
repo TEXT NOT NULL,
demo TEXT NOT NULL,
description TEXT NOT NULL,
photo TEXT 
);
ALTER TABLE Projects CHANGE description `desc` TEXT NOT NULL;

CREATE TABLE Autor (
id_Autor INT AUTO_INCREMENT PRIMARY KEY,
autor VARCHAR (45) NOT NULL,
job VARCHAR (45),
image TEXT
);

SELECT * FROM Projects;
SELECT * FROM Autor;

INSERT INTO Autor  (autor, job, image) VALUES
('Emmelie Bjorjlund', 'Full Stack Developer', 'src\images\ebook-example.jpg'),
("Tania Salvatella", "Buscavidas", "https://i.ytimg.com/vi/RFNurIDjwPk/maxresdefault.jpg"),
('Ana Elisa Di Blasi', 'Full Stack Developer', 'https://ca.slack-edge.com/T2Q8FS5QB-U080UMYBJ3D-1030f7fc7299-512'),
('Carlos Lopez', 'Mobile App Developer', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQODJ7ss6BGhUyG8s74ikwx7FVKAm5MBawQGw&s'),
('Alice Johnson', 'Software Engineer', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5PzLk-Ah4sF8siEMha7KeQXOGGrBQ5z2pZg&s'),
('Bob Williams', 'Data Scientist', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8ZfI-j6y14EiQAF8_F9W1iM_T28ueZlgulw&s'),
('Eva Rodriguez','Full-Stack Developer', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpmrTJWv3Sp1QqxBheAMibngTrNLgKnQxRtQ&s');

ALTER TABLE Projects ADD COLUMN description VARCHAR(60) AFTER demo;
ALTER TABLE Projects DROP COLUMN description;
DELETE FROM Projects;
DROP TABLE Projects;

INSERT INTO Projects (name, slogan, technologies, repo, demo, description, photo) VALUES
('Elegant', 'Diseños Exclusivos', 'React JS - HTML - CSS', 'www.google.es', 'www.google.es', 'A platform for entrepreneurs to connect, collaborate, and launch their startups.', 'src\images\ebook-example.jpg'),
("Piedra, papel y tijera", "El mejor juego de la historia", "HTML - CSS - JS", "promo_b_modulo_2_PiedraPapelTijera","https://tsalvatellap.github.io/promo_b_modulo_2_PiedraPapelTijera/", "No te volverás a aburrir nunca más", "https://img.freepik.com/vector-gratis/manos-2x2-design-concept-set_98292-2776.jpg?semt=ais_hybrid"),
('Cuidado con el Grogu', 'Diversión aprendiendo', 'React JS - HTML - CSS', 'https://github.com/AnaEDiBlasi/promo-b-module-3-pair-5-grogu-game', 'https://anaediblasi.github.io/promo-b-module-3-pair-5-grogu-game/', 'Descarga todas las mercancías antes de que Grogu llegue a la nave', 'https://img.freepik.com/foto-gratis/duendes-plano-medio-abrazando-mundo-fantasia_23-2150900649.jpg?semt=ais_hybrid'),
('FitLife', 'Achieve Your Fitness Goals with Personalized Plans', 'Swift, SwiftUI, Firebase', 'https://github.com/example/fitlife', 'https://fitlife.example.com', 'A mobile app that provides customized fitness plans and tracks your progress.', 'https://img.freepik.com/foto-gratis/bombilla-grafico-dibujo_1232-2105.jpg?semt=ais_hybrid'),
('Innovate Hub', 'Connecting Ideas, Building the Future', 'React, Node.js, Express, MongoDB', 'https://github.com/example/innovate-hub', 'https://innovate-hub.example.com', 'A platform for entrepreneurs to connect, collaborate, and launch their startups.', 'https://img.freepik.com/foto-gratis/ejecutivo-anotando-algunos-datos-pizarra_329181-15112.jpg?semt=ais_hybrid'),
('EcoTrack', 'Tracking Your Carbon Footprint, Making a Difference', 'Python, Django, PostgreSQL, Machine Learning', 'https://github.com/example/ecotrack', 'https://ecotrack.example.com', 'An app that helps users track and reduce their environmental impact.', 'https://img.freepik.com/vector-gratis/aplicacion-reserva-salon-belleza_52683-39737.jpg?semt=ais_hybrid'),
('StudyBuddy', 'Your Personalized Learning Companion', 'Java, Spring Boot, React, MySQL', 'https://github.com/example/studybuddy', 'https://studybuddy.example.com', 'An application that helps students connect with tutors and study groups.', 'https://img.freepik.com/vector-gratis/plantilla-landing-page-abstracta_52683-4027.jpg?semt=ais_hybrid');

DESCRIBE Projects;
ALTER TABLE Projects ADD COLUMN FK_Autor INT;
ALTER TABLE Projects ADD Foreign key (FK_Autor) references Autor (id_Autor);
DESCRIBE Autor;

SELECT * FROM Projects inner join Autor on Projects.FK_Autor = Autor.id_Autor;

