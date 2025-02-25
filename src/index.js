const express = require('express');
const cors = require('cors');
const mysql = require ('mysql2/promise');

const server = express();

server.use(cors());
server.use(express.json({limit:'100mb'}));
server.set('view engine', 'ejs');
require('dotenv').config();


async function connectDB (){
    const conex = await mysql.createConnection ({
        host: process.env.HOSTDB, 
        user: process.env.USERDB,
        password: process.env.PASSDB,
        database: process.env.DATABASE,
    })
    conex.connect ();
    return conex;
}


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
    const insertAutor = 'INSERT INTO Autor(autor, photo) value (?, ?)'
    const [resultAutor] = await conex.query(insertAutor, [newProject.autor, newProject.photo])
    console.log(resultAutor)

    const insertProject = 'INSERT INTO Projects(name,slogan, technologies, repo, demo, image,FK_Autor) values (?,?,?,?,?,?,?)';
    const [resultproject] = await conex.query(insertProject, [
        newProject.name,
        newProject.slogan,
        newProject.technologies,
        newProject.repo,
        newProject.demo,
        newProject.image,
        resultAutor.insertId,
        
    ]);
    res.json({
        success: true,
        cardURL: `${process.env.URL_SERVER}/project/detail/${resultproject.insertId}`

    })
} )

server.get('/detail/:id', async (req, res) =>{
    const {id} = req.params;
    const conex = await connectDB();
    const sql = 'SELECT * FROM Projects INNER JOIN Autor ON Projects.FK_Autor = Autor.id_Autor WHERE id_Project= ?';
    const [result] = await conex.query(sql, [id]);

    conex.end();
    console.log(result);
    res.render('projectDetail', { project: result[0] });
    
})

server.use(express.static('./css'));


//select clients.name, sum(amount) as total
// from clients inner join sales on sales.fk_client = clients.id
// group by clients.id


const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is happily running at ${process.env.URL_SERVER}`);
});

const url = './src/public';
server.use(express.static(url));
