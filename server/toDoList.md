SPRINT I
[x] Análisis funcional
[x] Wireframe
BACKEND
[x] Creación de la base de datos
[x] Creación de proyecto de node y estructura inicial de carpetas
[x] Creación del servidor con express
[x] Creación de la conexión con la base de datos desde node
[x] Middleware: 404 not found
[x] Middleware: gestión de errores
[x] Middleware: parseo del body de la petición
[] Middleware: recogida de ficheros
[x] Endpoint: registro de usuarios
[] Endpoint: login de usuarios
[] Middleware: verificación de autenticación de usuarios
[] Endpoint: listado de artículos. Cada artículo deberá incluir
información del vendedor como el nombre y la valoración media
[] Endpoint: visualización de un artículo. El artículo deberá incluir
información del vendedor como el nombre y la valoración media
[] Añadir la posibilidad de mandar filtros por query params al
endpoint de listado de artículos (nombre, categoría, localidad y
precio)
[] Endpoint: creación de un artículo
[] Endpoint: actualización del perfil de un usuario
[] Endpoint: propuesta de compra de un artículo. Le debe llegar un
email al vendedor. Un usuario no debería de poder comprar un
artículo propio
[] Endpoint: confirmación de compra. Solo puede confirmar la
compra el vendedor. Le debe llegar un email al comprador con la
hora y lugar de entrega escogidos por el vendedor
[] Endpoint: valoración de compra. Una vez confirmada la compra y
pasada la hora de entrega, el comprador puede valorar al vendedor
[] Colección de Postman con todos los endpoints
[] Creación de una breve documentación en un fichero
README.md. Esta documentación debe incluir al menos una breve
descripción de la app, los pasos para arrancar el proyecto y el listado
de endpoints
[] NOTAS: Validar el body de la petición con Joi en todos los endpoints