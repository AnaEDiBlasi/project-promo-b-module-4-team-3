const express = require('express');
const cors = require('cors');
const mysql = require ('mysql2/promise');

const server = express();

server.use(cors());
server.use(express.json());
server.set('view engine', 'ejs');


async function connectDB (){
    const conex = await mysql.createConnection ({
        host: 'sql.freedb.tech', 
        user: 'freedb_adminAnaElisa',
        password:'3S4edgz$qcX@UEn',
        database:'freedb_poryectosMolones',
    })
    conex.connect ();
    return conex;
}


// const projectList = [
//     {
//         name: "FitLife",
//         slogan: "Achieve Your Fitness Goals with Personalized Plans",
//         technologies: "Swift, SwiftUI, Firebase",
//         repo: "https://github.com/example/fitlife",
//         demo: "https://fitlife.example.com",
//         desc: "A mobile app that provides customized fitness plans and tracks your progress.",
//         autor: "Carlos Lopez",
//         job: "Mobile App Developer",
//         image: "https://www.example.com/images/fitlife.jpg",
//         photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQODJ7ss6BGhUyG8s74ikwx7FVKAm5MBawQGw&s",
//     },
//     {
//         name: "Innovate Hub",
//         slogan: "Connecting Ideas, Building the Future",
//         technologies: "React, Node.js, Express, MongoDB",
//         repo: "https://github.com/example/innovate-hub",
//         demo: "https://innovate-hub.example.com",
//         desc: "A platform for entrepreneurs to connect, collaborate, and launch their startups.",
//         autor: "Alice Johnson",
//         job: "Software Engineer",
//         image: "https://www.example.com/images/innovate-hub.jpg",
//         photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5PzLk-Ah4sF8siEMha7KeQXOGGrBQ5z2pZg&s",
//     },
//     {
//         name: "EcoTrack",
//         slogan: "Tracking Your Carbon Footprint, Making a Difference",
//         technologies: "Python, Django, PostgreSQL, Machine Learning",
//         repo: "https://github.com/example/ecotrack",
//         demo: "https://ecotrack.example.com",
//         desc: "An app that helps users track and reduce their environmental impact.",
//         autor: "Bob Williams",
//         job: "Data Scientist",
//         image: "https://www.example.com/images/ecotrack.jpg",
//         photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8ZfI-j6y14EiQAF8_F9W1iM_T28ueZlgulw&s",
//     },
//     {
//         name: "StudyBuddy",
//         slogan: "Your Personalized Learning Companion",
//         technologies: "Java, Spring Boot, React, MySQL",
//         repo: "https://github.com/example/studybuddy",
//         demo: "https://studybuddy.example.com",
//         desc: "An application that helps students connect with tutors and study groups.",
//         autor: "Eva Rodriguez",
//         job: "Full-Stack Developer",
//         image: "https://www.example.com/images/studybuddy.jpg",
//         photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpmrTJWv3Sp1QqxBheAMibngTrNLgKnQxRtQ&s",
//     }
// ];

//endpoints
//devuelve la lista de proyecto

server.get("/projects/list", async (req, res) => {
   const conex = await connectDB ();
   const sql = 'SELECT * FROM Projects inner join Autor on Projects.FK_Autor = Autor.id_Autor';
   const [projectList] = await conex.query(sql);
   
    if (projectList.length === 0){
        res.status(404).json({success:false, error:"No se ha encontrado el recurso"});
    } else {
        res.status(200).json({
            success:true,
            result: projectList,
        })
    }
})

// crear un proyecto nuevo
server.post('/newproject', async(req, res)=>{
    const newProject = req.body;
    const conex = await connectDB();
    const insertAutor = 'INSERT INTO Autor(autor, image) value (?, ?)'
    const [resultAutor] = await conex.query(insertAutor, [newProject.autor, newProject.image])
    //

    const insertProject = 'INSERT INTO Projects(name,slogan, technologies, repo, demo, photo) values (?,?,?,?,?,?)';
    const [resultproject] = await conex.query(insertProject, [
        newProject.name,
        newProject.slogan,
        newProject.technologies,
        newProject.repo,
        newProject.demo,
        newProject.photo,
        resultAutor.insertId,
    ]);
    res.json({
        success: true,
        cardURL: `http://localhost:4000/detail ${resultproject.insertId}`

    })
} )

server.get('/detail/:id', async (req, res) =>{
    const {id} = req.params;
    const conex = await connectDB();
    const sql = 'SELECT * FROM Projects WHERE id_Project = ?';
    const [result] = await conex.query(sql, [id]);

    conex.end();

    res.render('projectDetail', { project: result[0] });
    console.log(result);
})


const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is happily running at http://localhost:${PORT}`);
});

const url = './src/public';
server.use(express.static(url));
