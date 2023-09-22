// Importamos las dependencias.
import fs from 'fs/promises';
import url from 'url';
import path from 'path';
import sharp from 'sharp';
import { v4 } from 'uuid';

// Importamos la constante que contiene el nombre del directorio de subida de archivos.
import { UPLOADS_DIR } from '../../config.js';

// Importamos las funciones de error.
import { saveFileError } from '../errors/errorService.js';

// Función que se encargará de guardar una imagen en el disco en la cuál recibe tres parametros.
// 1. La imagen. 2. El ancho de la imagen. 3. El nombre de la carpeta en la que se guardará la imagen (Solo puede ser "avatars" para el avatar de los perfiles o "images" para las imágenes de los productos)
const savePhoto = async (img, folder) => {
    const resize = (folder = 'avatars') ? 100 : 600;
    const dirname = path.dirname(url.fileURLToPath(import.meta.url));

    try {
        // Creamos la ruta absoluta al directorio de subida de archivos.
        const uploadsPath = path.join(dirname, '..', UPLOADS_DIR, folder);

        try {
            // El método "access" lanza un error si la ruta especificada no existe.
            await fs.access(uploadsPath);
        } catch {
            // Si no existe entraremos en este catch y crearemos el directorio.
            await fs.mkdir(uploadsPath);
        }
        // Convertimos la imagen a un objeto tipo Sharp para poder redimensionarla.
        const sharpImg = sharp(img.data);
        // Redimensionamos la imagen. El parámetro "width" representa un ancho en píxeles.
        sharpImg.resize(resize);
        // Generamos un nombre único para la imagen.
        const imgName = `${v4()}.jpg`;
        // Generamos la ruta absoluta a la imagen.
        const imgPath = path.join(uploadsPath, imgName);
        // Guardamos la imagen en el disco.
        await sharpImg.toFile(imgPath);
        // Retornamos el nombre que le hemos dado a la imagen.
        return imgName;
    } catch (err) {
        console.error(err);
        saveFileError();
    }
};

export default savePhoto;
