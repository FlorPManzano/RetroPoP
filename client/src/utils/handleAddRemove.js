// Función que se encarga de eliminar la previsualización de la imagen seleccionada en el input file.
export const handleRemoveFilePreview = (
    fileInputRef,
    setFile,
    setPreviewUrl
) => {
    setFile(null);
    setPreviewUrl('');

    // Eliminamos la clase 'active' del botón del input.
    fileInputRef.current.classList.remove('active');

    // Restablecer el valor del input de tipo file a null.
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
};
