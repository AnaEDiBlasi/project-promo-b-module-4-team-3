const express = require('express');
const cors = require('cors');

const server = express();

server.use(cors());
server.use(express.json());

const projectList = [{
    name: "Project Test",
    slogan: "test test test",
    technologies: "more test",
    repo: "repo test",
    demo: "demo test",
    desc: "test",
    autor: "test",
    job: "test",
    image: "https://cdn.pixabay.com/photo/2022/05/08/18/30/broken-heart-7182718_1280.png",
    photo: "https://cdn.pixabay.com/photo/2021/08/24/16/34/broken-heart-6571108_1280.png",
    }];

//endpoints

//devuelve la lista de proyecto

server.get("/projects/list", (req, res) => {
    if (projectList.length === 0){
        res.status(404).json({success:false, error:"No se ha encontrado el recurso"});
    } else {
        res.status(200).json({
            success:true,
            result: projectList
        })
    }
})


const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is happily running at http://localhost:${PORT}`);
});

const url = './src/public';
server.use(express.static(url));
