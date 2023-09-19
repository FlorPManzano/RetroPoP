import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Bienvenid@ a mi servidor');
});

app.get('/nueva-ruta', (req, res) => {
    res.send('Hola, te saludo desde una nueva ruta');
});

// GET para obtener datos
app.get('/users', (req, res) => {
    res.send('Recibimos tus datos por GET');
});

// PUT para actualizar datos
app.put('/users', (req, res) => {
    res.send('Recibimos tus datos por PUT');
});

// DELETE para eliminar datos
app.delete('/users', (req, res) => {
    res.send('Recibimos tus datos por DELETE');
});

// POST para crear datos
app.post('/users', (req, res) => {
    res.send('Recibimos tus datos por POST');
});

app.use((req, res) => {
    res.status(404);
    res.send('No se encontró la ruta');
});

app.listen(3000, () => {
    console.log('El servidor está inicializado en http://localhost:3000');
});
