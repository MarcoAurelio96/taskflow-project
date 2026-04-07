# Next Task

Aplicacion web de gestion de tareas con frontend en HTML/CSS/JS y backend REST en Node.js + Express.

## Arquitectura

### Frontend

- `index.html`: estructura semantica de la UI.
- `styles.css`: sistema visual y estilos responsivos.
- `app.js`: capa de presentacion y orquestacion de estados de red.
- `src/api/client.js`: capa de infraestructura HTTP con `fetch` para consumir `/api/v1/tasks`.

### Backend

- `server/src/index.js`: bootstrap de Express y registro de middlewares.
- `server/src/routes/task.routes.js`: definicion de rutas REST.
- `server/src/controllers/task.controller.js`: validacion HTTP y adaptacion request/response.
- `server/src/services/task.service.js`: reglas de dominio y persistencia en memoria.
- `server/src/middleware/errors.js`: middleware global de manejo de errores.

## Flujo tecnico de middlewares

1. `express.json()` parsea el payload JSON y lo deja disponible en `req.body`.
2. `cors()` habilita intercambio cross-origin entre frontend y backend en desarrollo.
3. Router `/api/v1/tasks` delega en handlers del controlador.
4. `errorHandler` captura excepciones sincronas/asincronas y transforma errores de dominio en codigos HTTP (`400`, `404`, `500`).

Este flujo sigue un pipeline de responsabilidad unica: parseo -> politicas CORS -> enrutamiento -> logica -> serializacion de error.

## Estados de red en frontend

La UI maneja 3 estados visibles:

- `loading`: muestra mensaje mientras la peticion esta en vuelo.
- `success`: feedback temporal cuando la operacion termina correctamente.
- `error`: mensaje con codigo HTTP y descripcion cuando hay fallos `4xx/5xx`.

La aplicacion ya no usa `localStorage` para tareas: la fuente de verdad es el backend.

## API REST

Base URL en local: `http://localhost:3000/api/v1/tasks`

### 1) Obtener tareas

```http
GET /api/v1/tasks
```

Respuesta `200`:

```json
[
  {
    "id": 1774523820769,
    "title": "Preparar entrega",
    "completed": false,
    "priority": "importante",
    "createdAt": "07/04/2026"
  }
]
```

### 2) Crear tarea

```http
POST /api/v1/tasks
Content-Type: application/json
```

Body:

```json
{
  "title": "Estudiar Node",
  "priority": "normal",
  "completed": false
}
```

Respuesta `201`: tarea creada.

### 3) Actualizar tarea

```http
PUT /api/v1/tasks/:id
Content-Type: application/json
```

Body (parcial permitido):

```json
{
  "title": "Estudiar Node + Express",
  "completed": true
}
```

Respuesta `200`: tarea actualizada.

### 4) Eliminar tarea

```http
DELETE /api/v1/tasks/:id
```

Respuesta `200` sin cuerpo.

## Ejecucion local

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

Abrir `index.html` con Live Server o un servidor estatico.

## Testing manual sugerido

- Crear tarea valida y comprobar respuesta `201`.
- Enviar `title` vacio y comprobar error `400`.
- Editar `title` y `completed` y validar respuesta `200`.
- Eliminar un `id` inexistente y validar `404`.
- Simular backend apagado y verificar estado visual `error` en frontend.

## Documentacion complementaria

- `docs/backend-api.md`: resumen de Axios, Postman, Sentry y Swagger.