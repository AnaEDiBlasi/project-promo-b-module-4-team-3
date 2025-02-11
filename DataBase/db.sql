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
