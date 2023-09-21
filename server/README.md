# RetroPoP

Este ejercicio consiste en crear una API que simule el funcionamiento de una aplicación de compra-venta de artículos retro.

<p align="left">
  <img src="https://img.shields.io/badge/STATUS-EN%20DESAROLLO-green">
</p>

## Instalar

1. Instalar las dependencias mediante el comando `npm install` o `npm i`.
2. Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.
3. Ejecutar `npm run initDb` para crear las tablas necesarias en la base de datos anteriormente creada.
4. Ejecutar `npm run dev` o `npm start` para lanzar el servidor.

## Entidades

### User

| Campo            | Tipo     | Descripción                           |
| ---------------- | -------- | ------------------------------------- |
| id               | INT      | Identificador único del usuario.      |
| email            | VARCHAR  | Dirección de correo electrónico.      |
| username         | VARCHAR  | Nombre de usuario.                    |
| password         | VARCHAR  | Contraseña del usuario.               |
| avatar           | VARCHAR  | Nombre del avatar del usuario.        |
| bio              | VARCHAR  | Biografia del usuario.                |
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

<!-- ### Product_image

| Campo            | Tipo     | Descripción                                    |
| ---------------  | -------- | ---------------------------------------------- |
| id               | INT      | Identificador único de la imagen.              |
| productId        | INT      | Identificador producto.                        |
| name             | VARCHAR  | Nombre de la imagen.                           |
| createdAt        | DATETIME | Fecha y hora de creación del producto.         |
| modifiedAt       | DATETIME | Fecha y hora de última modificación.           | -->

### Bookings

| Campo         | Tipo     | Descripción                            |
| ------------- | -------- | -------------------------------------- |
| id            | INT      | Identificador único de la reserva.     |
| userBuyerId   | INT      | Identificador del usuario comprador.   |
| userSellerId  | INT      | Identificador del usuario vendedor.    |
| productId     | INT      | Identificador del producto.            |
| deliveryPlace | VARCHAR  | Lugar para la entrega.                 |
| deliveryTime  | DATETIME | Fecha y hora para la entrega.          |
| createdAt     | DATETIME | Fecha y hora de creación del producto. |

### Reviews

| Campo        | Tipo     | Descripción                                                  |
| ------------ | -------- | ------------------------------------------------------------ |
| id           | INT      | Identificador único de la valoración.                        |
| userSellerId | INT      | Identificador del usuario que recibió la valoración.         |
| userBuyerId  | INT      | Identificador del usuario que hizo la valoración.            |
| productId    | INT      | Identificador del producto por el que se hizo la valoración. |
| titleRw      | VARCHAR  | Título de la valoración.                                     |
| textRw       | VARCHAR  | Texto explicativo de la valoración.                          |
| starsRw      | ENUM     | Valoración en estrellas(1-5).                                |
| createdAt    | DATETIME | Fecha y hora de creación de la valoración.                   |
| modifiedAt   | DATETIME | Fecha y hora de modificación de la valoración.               |

## Endpoints

### Usuarios:

-   POST `/users` - Registro de usuario.
-   POST `/users/login` - Login de usuario (devuelve token).
-   POST `/users/validate/:regCode` - Permite validar un usuario.
-   GET `/users/:userId` - Devuelve información del usuario del token.
-   PUT `/users/edit` - Editar perfil.

### Productos:

-   POST `/products` - Permite crear un producto.
-   GET `/` - Lista todos los productos.
-   GET `/products/:productId` - Devuelve la infomación del producto y la info del vendedor con la media de valoraciones.
-   GET `/products` - Devuelve la infomación de los productos filtrados.
-   PUT `/products/edit/:id` - Editar producto.
-   DELETE `/products/:productId` - Borra un producto solo si eres quien lo creó.

### Reservas:

-   POST `/bookings/:productId` - Permite crear una reserva solo si no eres el propietario de producto.
-   GET `/bookings/` - Permite ver el listado de bookings que recibe el usuario logeado.
-   PUT `/bookings/confirm/:bookingId` - Confirmación de la reserva del comprador.

### Valoraciones

-   POST `/reviews/:bookingId` - Permite añadir una valoración al vendedor.
