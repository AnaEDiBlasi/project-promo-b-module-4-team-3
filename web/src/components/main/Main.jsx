import "../../styles/main/Main.scss";
import Form from './form/Form';
import { useState } from 'react';
import ebookExample from '../../../src/images/ebook-example.jpg';
import avatar from '../../../src/images/avatar.webp';
import { Link } from 'react-router-dom';
import Preview from './preview/Preview';



function Main() {
  const [ projectUrl, setProjectUrl] = useState ("");
  const [formData, setFormData] = useState({
    name: "",
    slogan: "",
    technologies: "",
    repo: "",
    demo: "",
    desc: "",
    autor: "",
    job: "",
    image: ebookExample,
    photo: avatar
   })

   const updateAvatar = (urlImage, id,) => {
    setFormData({...formData, [id]: urlImage});
    
   }
   
  const changeFormData = (input, value) =>{
    setFormData({...formData, [input]: value})
   }

  return (
  <main className="Main_main">
    <section className="hero">
      <h2 className="title">Proyectos molones</h2>
      <p className="hero__text">Escaparate en línea para recoger ideas a través de la tecnología</p>
      <Link className="button--link" to="/">Ver proyectos</Link>
    </section>

    <div className='Main_container-card'>
      <Preview formData = {formData}/>
      <Form 
      changeFormData = {changeFormData} 
      updateAvatar={updateAvatar} 
      formData = {formData} 
      projectUrl = {projectUrl} 
      setProjectUrl = {setProjectUrl}
      setFormData = {setFormData}
      
     />
    </div>
  </main>
  )
}

export default Main