// Función para poder previsualizar la imagen seleccionada en el input file.
export const handleAddFilePreview = (e, setFile, setPreviewUrl) => {
    // Agregamos la clase 'active' al input.
    e.target.classList.add('active');

    //obtenemos el primer indice del array, que es el que se va a previsualizar
    const selectedFile = e.target.files[0];

    // Se utilizapara actualizar el estado con el archivo seleccionado.
    //  Esto almacena el archivo seleccionado en el estado del componente para su posterior uso.
    setFile(selectedFile);

    // Crear una URL para la previsualización de la imagen. El objeto fileReader se utiliza para leer el contenido del archivo seleccionado
    const fileReader = new FileReader();

    fileReader.onload = () => {
        // Actualizar el estado con la URL de previsualización.
        setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(selectedFile);
};
