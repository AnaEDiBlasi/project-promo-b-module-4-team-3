import "../../../styles/main/form/Form.scss";
import Btn_Photo from './Btn_Photo';
import api from "../../../services/api";
import { useEffect, useState } from 'react';
import ebookExample from '../../../images/ebook-example.jpg';
import avatar from '../../../images/avatar.webp';
import localStorage from "../../../services/localStorage";
//importo LocalStorage

function Form(props) {
  const [localError, setLocalError] = useState(""); // Estado local para el error
  const [isLoading, setIsLoading] = useState(false); // Estado para la carga
 

  // NUEVO: Estado para los valores del formulario, inicializados con datos de localStorage
  // const [formData, setFormData] = useState(() => {
  //   // Recupera los datos del formulario guardados previamente o usa valores por defecto
  //   return {
  //     name: localStorage.get("name", ""),
  //     slogan: localStorage.get("slogan", ""),
  //     technologies: localStorage.get("technologies", ""),
  //     repo: localStorage.get("repo", ""),
  //     demo: localStorage.get("demo", ""),
  //     desc: localStorage.get("desc", ""),
  //     autor: localStorage.get("autor", ""),
  //     job: localStorage.get("job", ""),
  //     image: localStorage.get("image", ebookExample),
  //     photo: localStorage.get("photo", avatar),
  //   };
  // });

  // NUEVO: Función para actualizar el localStorage cuando cambia un campo
  const updateLocalStorage = (name, value) => {
    localStorage.set(name, value); // Guarda cada campo individualmente en el localStorage
  };


  // NUEVO: Actualiza el localStorage cada vez que cambia el formData
  useEffect(() => {
    for (const key in props.formData) {
      localStorage.set(key, props.formData[key]);
    }
  }, [props.formData]);

  const resetForm = () => {
      props.setFormData({
        name: "",
        slogan: "",
        technologies: "",
        repo: "",
        demo: "",
        desc: "",
        autor: "",
        job: "",
        image: ebookExample,
        photo: avatar,
        });
        setLocalError("");
        setIsLoading (false);
        
    };


  // const handleChangeInput = (ev) =>{
  //   const input = ev.target.name;
  //   const value = ev.target.value;
  //   props.changeFormData(input, value);
  //   setLocalError(""); // Limpia el error al escribir
  //   //LocalStorage
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  //   // Limpia el error
  //   setLocalError(""); 

  //   // Guarda el valor en localStorage
  //   updateLocalStorage(name, value);

  // };

  //NUEVO CAMBIOS EN EL evento
  const handleChangeInput = (ev) => {
    const { name, value } = ev.target;

    // 1. Actualiza el estado global del formulario
    props.changeFormData(name, value);

    // 2. Actualiza el estado local para el campo
    props.setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Actualiza el campo correspondiente en formData
    }));

    // 3. Limpia el error
    setLocalError("");

    // 4. Guarda el valor actualizado en localStorage
    updateLocalStorage(name, value);
  };

const handleClick = (ev) => {
  ev.preventDefault ();
 if (!props.formData.name || !props.formData.repo || !props.formData.demo) {
    setLocalError("Por favor, completa todos los campos obligatorios."); 
 
    return;

  }
  console.log(props.formData)
  setLocalError(""); // Limpia el error si la validación pasa
  setIsLoading(true); // Indica que la llamada está en curso

  api(props.formData)
    .then((resp) => {
      console.log("✅ Respuesta de la API en Form.js:", resp);
      
      if (resp.success) {
        props.setProjectUrl(resp.cardURL);
      } else {
        console.log (resp);
        throw new Error(resp.error || "Error desconocido en la API");
      }
    })
    .catch((err) => {
      console.error("❌ Error en el formulario:", err);
      setLocalError(err.message || "Hubo un error al crear el proyecto. Inténtalo de nuevo.");
    })
   
      
};


//vinculamos el valor del input al estado de formdata value= {formData.name}


  return (
    <form className="addForm">
    <h2 className="title">Información</h2>
    
    <fieldset className="addForm__group">
      <legend className="addForm__title">Cuéntanos sobre el proyecto</legend>
      <input className="addForm__input" type="text" name="name" id="name" placeholder="Nombre del proyecto" 
      value= {props.formData.name}
      onChange={handleChangeInput}/>
      <input className="addForm__input" type="text" name="slogan" id="slogan" placeholder="Slogan" 
       value= {props.formData.slogan}
       onChange={handleChangeInput} />
      <div className="addForm__2col">
        <input className="addForm__input" type="url" name="repo" id="repo" placeholder="Repositorio"
        value= {props.formData.repo}
        onChange={handleChangeInput}/>
        <input className="addForm__input" type="url" name="demo" id="demo" placeholder="Demo"
        value= {props.formData.demo}
        onChange={handleChangeInput}/>
      </div>         
      <input className="addForm__input" type="text" name="technologies" id="technologies" placeholder="Tecnologías"
      value= {props.formData.technologies}
      onChange={handleChangeInput}/>
      <textarea className="addForm__input" type="text" name="desc" id="desc" placeholder="Descripción" rows="5" 
      value= {props.formData.desc}
      onChange={handleChangeInput}></textarea>
    </fieldset>

    <fieldset className="addForm__group">
      <legend className="addForm__title">Cuéntanos sobre la autora</legend>
      <input className="addForm__input" type="text" name="autor" id="autor" placeholder="Nombre" 
      value= {props.formData.autor}
      onChange={handleChangeInput} />
      <input className="addForm__input" type="text" name="job" id="job" placeholder="Trabajo" 
      value= {props.formData.job}
      onChange={handleChangeInput} />
    </fieldset>

    <fieldset className="addForm__group--upload">
      <div>
        <Btn_Photo  
        htmlFor="image" 
        name="image" 
        text="Subir foto del proyecto" 
        id= "image" 
        updateAvatar={props.updateAvatar}/>
        <p className="form-message">* Tamaño máximo de las fotos: 25MB</p>
      </div>
      <div>
        <Btn_Photo  
        htmlFor="photo" 
        name="photo" 
        text="Subir foto de la autora" 
        id= "photo" 
        updateAvatar={props.updateAvatar}/>
        <p className="form-message">* Tamaño máximo de las fotos: 5MB</p>
      </div>

      <button
          className="button--large"
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading ? "Creando..." : "Crear proyecto"}
        </button>
         <button type="reset" className="button" onClick={resetForm}>
          Resetear formulario
        </button>
        {localError && <p className="error-message">{localError}</p>} 
        {props.projectUrl && <a className="button" href={props.projectUrl}> Ver tarjeta</a>}
    </fieldset>
    
  </form>
    
  )
}

export default Form