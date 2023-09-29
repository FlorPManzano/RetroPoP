// Formato de fecha: 2022-03-20 17:10:00.00
// Viene así 2023-10-05T08:00:00.000Z

const formatDate = (date) => {
    // Obtener las partes de la fecha y hora
    const age = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    // Agregar ceros a la izquierda si es necesario
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Formatear la fecha y hora en el nuevo formato
    const formatedDate = `${age}-${month}-${day} ${hour}:${minutes}:${seconds}`;

    return formatedDate;
};

export default formatDate;
