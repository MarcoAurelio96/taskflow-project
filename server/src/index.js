const { PORT } = require('./config/env');
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/task.routes');
const errorHandler = require('./middleware/errors')

const app = express();

// Middleware para parsear JSON en el body de las peticiones
app.use(express.json());

// Middleware para permitir peticiones desde el frontend
app.use(cors());

// Monta las rutas bajo el prefijo /api/v1/tasks
app.use('/api/v1/tasks', taskRoutes);

app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Requerido por Vercel para ejecutar como Serverless Function
module.exports = app;
