import '../styles/Landing.scss';
// import adalab from '../images/adalab.png';
// import avatar from '../images/avatar.webp';
import Card from './main/preview/Card';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Landing () {

    const [projects, setProjects] = useState([]);
    // const formData = {
    //   name: "",
    //   slogan: "",
    //   technologies: "",
    //   repo: "",
    //   demo: "",
    //   desc: "",
    //   autor: "",
    //   job: "",
    //   image: adalab,
    //   photo: avatar,
    // }

    useEffect(()=> {
      fetch("http://localhost:4000/projects/list")
      .then(res => res.json())
      .then((data) => {
        setProjects(data.result);
      })
    }, [])

    const renderList = ()=> {
      return projects.map((project, i) => (
        <Card key={i} formData = {project}/>
      ));
    }

    return (
      <>
      <div className="Landing_container">
        <main className="Landing_main">
          <section className="Landing_intro">
            <h1 className="Landing_intro_title">Proyectos molones</h1>
            <p className="Landing_intro_text">Escaparate en línea para recoger ideas a través de la tecnología.</p>
          </section>
          <Link className="Landing_linkProject" to={"/form"}>NUEVO PROYECTO</Link>
          <section className="Landing_previewLanding">
            {renderList()}
          </section>
        </main>
      </div> 
      </>
    );
}

export default Landing;