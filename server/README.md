# RetroPoP

Este ejercicio consiste en crear una API que simule el funcionamiento de una aplicación de compra-venta de artículos retro.

<p align="left">
  <img src="https://img.shields.io/badge/STATUS-EN%20DESAROLLO-green">
</p>

## Instalar

1. Instalar las dependencias mediante el comando `npm install` o `npm i`.
2. Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.
3. Ejecutar `npm run initDb` para crear las tablas necesarias en la base de datos anteriormente creada.
4. Ejecutar `npm run backupDb` para rellenar los campos de las tablas de la base de datos.
5. Ejecutar `npm start` para lanzar el servidor.
6. Copiar la carpeta "uploads", que se encuentra en "assets" y llevarla a la carpeta server, con el mismo nombre.

## Entidades

### User

| Campo            | Tipo     | Descripción                           |
| ---------------- | -------- | ------------------------------------- |
| id               | INT      | Identificador único del usuario.      |
| email            | VARCHAR  | Dirección de correo electrónico.      |
| username         | VARCHAR  | Nombre de usuario.                    |
| password         | VARCHAR  | Contraseña del usuario.               |
| avatar           | VARCHAR  | Nombre del avatar del usuario.        |
| bio              | VARCHAR  | Biografía del usuario.                |
| createdAt        | DATETIME | Fecha y hora de creación del usuario. |
| modifiedAt       | DATETIME | Fecha y hora de última modificación.  |
| registrationCode | VARCHAR  | Código de validación del usuario.     |
| isActive         | TINYINT  | Estado de la validación.              |

### Products

| Campo       | Tipo     | Descripción                                     |
| ----------- | -------- | ----------------------------------------------- |
| id          | INT      | Identificador único del producto.               |
| userId      | INT      | Identificador del usuario que creó el producto. |
| productName | VARCHAR  | Nombre del producto.                            |
| category    | ENUM     | Categoria a la que pertenece el producto.       |
| state       | ENUM     | Estado del producto.                            |
| description | VARCHAR  | Descripción del producto.                       |
| place       | VARCHAR  | Localidad de venta.                             |
| price       | DECIMAL  | Precio del producto.                            |
| image       | VARCHAR  | Imagen adjunta al producto                      |
| createdAt   | DATETIME | Fecha y hora de creación del producto.          |
| modifiedAt  | DATETIME | Fecha y hora de última modificación.            |
| isSelled    | TINYINT  | Estado de compra.                               |

### Bookings

| Campo         | Tipo     | Descripción                            |
| ------------- | -------- | -------------------------------------- |
| id            | INT      | Identificador único de la reserva.     |
| userBuyerId   | INT      | Identificador del usuario comprador.   |
| productId     | INT      | Identificador del producto reservado.  |
| deliveryPlace | VARCHAR  | Lugar para la entrega.                 |
| deliveryTime  | DATETIME | Fecha y hora para la entrega.          |
| createdAt     | DATETIME | Fecha y hora de creación del producto. |
| resno         | VARCHAR  | Código único de la reserva.            |

### Reviews

| Campo      | Tipo     | Descripción                                    |
| ---------- | -------- | ---------------------------------------------- |
| id         | INT      | Identificador único de la valoración.          |
| bookingId  | INT      | Identificador de la reserva.                   |
| titleRw    | VARCHAR  | Título de la valoración.                       |
| textRw     | VARCHAR  | Texto de la valoración.                        |
| starsRw    | ENUM     | Valores para la valoración (1-5).              |
| createdAt  | DATETIME | Fecha y hora de creación de la valoración.     |
| modifiedAt | DATETIME | Fecha y hora de modificación de la valoración. |

### Favorites

| Campo        | Tipo | Descripción                                      |
| ------------ | ---- | ------------------------------------------------ |
| userIdFav    | INT  | Identificador del usuario que añade a favoritos. |
| productIdFav | INT  | Identificador del producto añadido a favoritos.  |

## Endpoints

### Usuarios:

-   POST `/users` - Registro de usuario.
-   POST `/users/login` - Login de usuario (devuelve token).
-   POST `/users/validate/:regCode` - Permite validar un usuario.
-   GET `/users/profile` - Devuelve información del usuario del token.
-   PUT `/users/edit` - Editar perfil.
-   DELETE `/users/delete` - Eliminar cuenta del usuario.
-   GET `/users/products/:id` - Ver los productos de un usuario.
-   GET `/users/requests` - Ver las solicitudes de reserva de un usuario.

### Productos:

-   POST `/products` - Permite crear un producto.
-   GET `/products` - Lista todos los productos.
-   GET `/products/:productId` - Devuelve la infomación del producto.
-   GET `/products/filters/?` - Devuelve la infomación de los productos filtrados.

### Reservas:

-   POST `/bookings` - Permite crear una reserva solo si no eres el propietario de producto.
-   PUT `/bookings/:resno` - Confirmación de la reserva del comprador.

### Valoraciones

-   POST `/reviews/:resno` - Permite añadir una valoración al vendedor.
-   GET `/reviews` - Lista las reviews de un usuario.

### Favoritos

-   PUT `/favorites` - Añade/elimina un favorito.
-   GET `/favorites` - Información de los favoritos del usuario logueado.
