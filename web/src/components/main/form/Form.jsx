import "../../../styles/main/form/Form.scss";
import Btn_Photo from './Btn_Photo';
import api from "../../../services/api";
import { useState } from 'react';
import ebookExample from '../../../images/ebook-example.jpg';
import avatar from '../../../images/avatar.webp';

function Form(props) {
  const [localError, setLocalError] = useState({}); // Estado local para errores
  const [isLoading, setIsLoading] = useState(false); // Estado para la carga

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
    setLocalError({});
    setIsLoading(false);
  };

  const handleChangeInput = (ev) => {
    const { name, value } = ev.target;
    props.changeFormData(name, value);
    setLocalError((prevErrors) => ({ ...prevErrors, [name]: "" })); // Limpia el error al escribir
  };

  const handleClick = (ev) => {
    ev.preventDefault();

    // Validación de campos obligatorios
    const errors = {};
    if (!props.formData.name) errors.name = "El nombre del proyecto es obligatorio.";
    if (!props.formData.repo) errors.repo = "El repositorio es obligatorio.";
    if (!props.formData.demo) errors.demo = "La demo es obligatoria.";
    if (!props.formData.autor) errors.autor = "El nombre de la autora es obligatorio.";

    if (Object.keys(errors).length > 0) {
       setLocalError({ ...errors, form: "❌ Por favor, completa todos los campos obligatorios (*)." });
      return;
    }

    setIsLoading(true);

    api(props.formData)
      .then((resp) => {
        console.log("✅ Respuesta de la API en Form.js:", resp);
        if (resp.success) {
          props.setProjectUrl(resp.cardURL);
        } else {
          throw new Error(resp.error || "❌ Error desconocido en la API");
        }
      })
      .catch((err) => {
        console.error("❌ Error en el formulario:", err);
        setLocalError({ form: err.message || "❌ Hubo un error al crear el proyecto. Inténtalo de nuevo." });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form className="addForm">
      <h2 className="title">Información</h2>

      <fieldset className="addForm__group">
        <legend className="addForm__title">Cuéntanos sobre el proyecto</legend>
        <input 
          className={`addForm__input ${localError.name ? 'error' : ''}`} 
          type="text" 
          name="name" 
          placeholder="* Nombre del proyecto" 
          value={props.formData.name} 
          onChange={handleChangeInput}
        />
        
        <input 
          className="addForm__input" 
          type="text" 
          name="slogan" 
          placeholder="Slogan" 
          value={props.formData.slogan} 
          onChange={handleChangeInput}
        />

        <div className="addForm__2col">
          <input 
            className={`addForm__input ${localError.repo ? 'error' : ''}`} 
            type="url" 
            name="repo" 
            placeholder="* Repositorio" 
            value={props.formData.repo} 
            onChange={handleChangeInput}
          />
          
          <input 
            className={`addForm__input ${localError.demo ? 'error' : ''}`} 
            type="url" 
            name="demo" 
            placeholder="* Demo" 
            value={props.formData.demo} 
            onChange={handleChangeInput}
          />
         
        </div>

        <input 
          className="addForm__input" 
          type="text" 
          name="technologies" 
          placeholder="Tecnologías" 
          value={props.formData.technologies} 
          onChange={handleChangeInput}
        />

        <textarea 
          className="addForm__input" 
          name="desc" 
          placeholder="Descripción" 
          rows="5" 
          value={props.formData.desc} 
          onChange={handleChangeInput}
        ></textarea>
      </fieldset>

      <fieldset className="addForm__group">
        <legend className="addForm__title">Cuéntanos sobre la autora</legend>
        <input 
           className={`addForm__input ${localError.autor ? 'error' : ''}`}
          type="text" 
          name="autor" 
          placeholder="* Nombre" 
          value={props.formData.autor} 
          onChange={handleChangeInput}
        />
        <input 
          className="addForm__input" 
          type="text" 
          name="job" 
          placeholder="Trabajo" 
          value={props.formData.job} 
          onChange={handleChangeInput}
        />
      </fieldset>

      <fieldset className="addForm__group--upload">
        <Btn_Photo htmlFor="image" name="image" text="Subir foto del proyecto" updateAvatar={props.updateAvatar} />
        <Btn_Photo htmlFor="photo" name="photo" text="Subir foto de la autora" updateAvatar={props.updateAvatar} />

        <button className="button--large" onClick={handleClick} disabled={isLoading}>
          {isLoading ? "Creando..." : "Crear proyecto"}
        </button>
        <button type="reset" className="button" onClick={resetForm}>Resetear formulario</button>
        {localError.form && <p className="error-message">{localError.form}</p>}
        {props.projectUrl && <a className="button" href={props.projectUrl}>Ver tarjeta</a>}
      </fieldset>
    </form>
  );
}

export default Form;
