# RetroPoP

Este ejercicio consiste en crear una web que simule el funcionamiento de un marketplace de compra-venta de artículos retro.

<p align="left">
  <img src="https://img.shields.io/badge/STATUS-EN%20DESAROLLO-green">
</p>

## Instalar

1. Instalar las dependencias mediante el comando `npm install` o `npm i`.
2. Ejecutar `npm start` para iniciar el cliente.

## Notas

Para la fecha y la hora de una reserva se ha usado un input de tipo "datetime-local" que no es soportado por Firefox (pero se puede agregar manualmente). Recomendamos usar navegadores basados en Chromium.

## Rutas

### Rutas Públicas:

Pueden acceder tanto los usuarios anónimos como los registrados.

1. `/` - Página principal. Desde ella se puede acceder a:

-   Desde el buscador, se puede acceder a la página de productos filtrados `/search`, buscando por nombre del producto. También se puede acceder a través de los iconos.
-   Desde el icono de "login", un usuario puede registrarse o iniciar sesión (`/login`).
-   Por último, al final se encuentra el listado de todos los productos. Haciendo click, se accede a información más detallado del producto seleccionado (`/product/:id`).

2. `/search` - Página de filtrado de productos. En el menú lateral se encuentran todos los filtros. Para aplicarlos o borrarlos, basta con hacer click en el botón correspondiente.

3. `/login` - Mediante esta ruta, puedes loguearte, si ya estás registrado o hacer un registro, cumplimentando los campos necesarios (email, nombre de usuario y contraseña).

4. `/validate/:regCode` - Tras registrarte, llegará un correo al email proporcionado que mandará a esta ruta para activar el usuario.

5. `/product/:id` - Al clickar en un producto, aparece toda la información detallada, tanto del producto como de su vendedor. Un usuario anónimo no puede ni hacer reservas ni añadir a favoritos.

### Rutas Privadas:

Únicamente pueden hacer los usuarios que hayan iniciado sesión.

1. `/upload` - Tras el login, en la página principal aparecerá un botón de "Subir producto", por el cuál se puede acceder a esta ruta. Tras cumplimentar los campos necesarios se podrá agregar un producto al catálogo.

2. `/profile` - Cuando has iniciado sesión, el botón de login cambiará, y pasará a verse el avatar del usuario logueado. Haciendo click aparecerá un menú desplegable con dos opciones: ver perfil o cerrar sesión. Para acceder a esta ruta, se irá a la primera opción. Dentro del perfil se prodrán realizar diferentes acciones a través de la barra lateral:

-   Editar perfil: es la página por defecto del perfil. Aquí se puede editar la biografia y el perfil(`/profile`).
-   Productos en venta: aparece un listado de los productos a la venta que tiene el usuario logueado (`/profile/products`)
-   Productos vendidos: listado de productos que ya están vendidos del usuario (`/profile/sold`).
-   Favoritos: todos los productos que el usuario tiene añadidos en su lista de favoritos (`/profile/favs`).
-   Solicitudes: aquí aparecerán las reservas activas que tienen un vendedor (`/profile/bookings`).
-   Valoraciones pendientes: tras una reserva, el usuario comprador puede realizar una valoración del usuario vendedor. Aquí podrá realizar dicha review(`/profile/reviews`).

3. Al contrario que los usuarios anónimos, un usuario registrado si puede realizar reservas, a través del botón de "Reservar" de un producto. También puede agregar a favoritos, tanto desde la página principal, la de productos filtrados o la de un producto en detalle.

4. Tras hacer una reserva, al usuario vendedor le llegará un correo electrónico con la información de la reserva. Desde su perfil, podrá aceptar o rechazar estas propuestas. Tanto si confirma como si no, al usuario comprador se le informará vía email.

5. Si se a aceptado la reservado y, tras haber pasado la fecha para el encuentro, el usuario comprador puede calificar al usuario vendedor. Puede acceder a todas las valoraciones pendientes desde su perfil.
