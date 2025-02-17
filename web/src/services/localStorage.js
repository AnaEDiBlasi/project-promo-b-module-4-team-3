
//función devuelve un valor por defecto
const get = (key, defaultValue) => {
    const localStorageData = localStorage.getItem(key);
    if (localStorageData === null) {
      return defaultValue;
    } else {
      return JSON.parse(localStorageData);
    }
  };

  //guarda una propiedad y su valor en el local storage
  const set = (key, value) => {
    const localStorageData = JSON.stringify(value);
    localStorage.setItem(key, localStorageData);
  };

  // Función que borra una propiedad del local storage
  // const remove = (key) => {
  //   localStorage.removeItem(key);
  // };

  const objectToExport = {
    get: get,
    set: set,
    // remove: remove,
    
  };

  export default objectToExport;