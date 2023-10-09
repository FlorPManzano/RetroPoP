export default function formatDate(date) {
    // Parsear la fecha y hora en el formato original
    var dateTime = new Date(date);

    // Obtener las partes de la fecha y hora
    var year = dateTime.getFullYear();
    var month = ('0' + (dateTime.getMonth() + 1)).slice(-2);
    var day = ('0' + dateTime.getDate()).slice(-2);
    var hours = ('0' + dateTime.getHours()).slice(-2);
    var minutes = ('0' + dateTime.getMinutes()).slice(-2);
    var seconds = ('0' + dateTime.getSeconds()).slice(-2);

    // Formatear la fecha y hora en el nuevo formato
    var dateTimeFormated =
        year +
        '-' +
        month +
        '-' +
        day +
        ' ' +
        hours +
        ':' +
        minutes +
        ':' +
        seconds;

    return dateTimeFormated;
}
