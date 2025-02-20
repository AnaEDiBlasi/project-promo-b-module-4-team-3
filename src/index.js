const express = require('express');
const cors = require('cors');
const mysql = require ('mysql2/promise');

const server = express();

server.use(cors());
server.use(express.json());
server.set('view engine', 'ejs');
require('dotenv').config();


async function connectDB (){
    const conex = await mysql.createConnection ({
        host: process.env.HOSTDB, 
        user:  process.env.USERDB,
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
    const sql = 'SELECT * FROM Projects INNER JOIN Autor ON Projects.FK_Autor = Autor.id_Autor WHERE id_Project= ?';
    const [result] = await conex.query(sql, [id]);

    conex.end();

    res.render('projectDetail', { project: result[0] });
    console.log(result);
})

server.use(express.static('./css'));


//select clients.name, sum(amount) as total
// from clients inner join sales on sales.fk_client = clients.id
// group by clients.id


const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is happily running at http://localhost:${PORT}`);
});

const url = './src/public';
server.use(express.static(url));
