# 🛠️ Backend Documentation (Server-side)

Este directorio contiene el núcleo lógico de la aplicación TaskFlow, construido sobre un modelo de **Arquitectura por Capas** y siguiendo principios de **Ingeniería de Software** robustos.

## 🏗️ Arquitectura y Capas
* **Services (`task.service.js`):** Lógica pura de negocio y persistencia (actualmente en memoria).
* **Controllers (`task.controller.js`):** Adaptación de protocolos, extracción de datos (`req.body`) y gestión de respuestas HTTP.
* **Routes (`task.routes.js`):** Definición semántica de endpoints REST.
* **Middleware (`errors.js`):** Sistema de gestión global de excepciones con mapeo semántico de códigos (400, 404, 500).

## 🛰️ Especificaciones de la API REST
**Base URL:** `https://tu-proyecto.vercel.app/api/v1/tasks` (o `http://localhost:3000/...`)

| Método | Endpoint | Acción | Status OK |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Obtiene todas las tareas | 200 |
| **POST** | `/` | Crea una nueva tarea | 201 |
| **PUT** | `/:id` | Actualiza título o estado | 200 |
| **DELETE** | `/:id` | Elimina una tarea por ID | 200 |

### Estructura de Datos (Task Object)
```json
{
  "id": "uuid",
  "title": "string",
  "completed": "boolean",
  "priority": "normal | high"
}
```

### Pipeline de Middlewares
El servidor procesa cada petición siguiendo este orden de responsabilidad:
1. `cors()`: Validación de origen cruzado.
2. `express.json()`: Parseo de payloads.
3. `Router`: Delegación a controladores.
4. `errorHandler`: Captura de excepciones y serialización de respuesta final.

## 🛠️ Observabilidad y Calidad
- **Manejo de Errores:** Centralizado para evitar fugas de stack traces en producción.
- **Monitoreo Sugerido:** Integración futura con **Sentry** para trazabilidad de errores en tiempo real.
- **Documentación:** Siguiendo estándares de **OpenAPI/Swagger** para la definición de contratos.

## 🚀 Despliegue en Vercel
El backend está configurado como **Serverless Functions** mediante el archivo `vercel.json` en la raíz, permitiendo escalabilidad automática y baja latencia.

## 🧪 Testing Manual
Se recomienda el uso de **Postman** o **Thunder Client** para validar:
- Errores de validación (POST con campos vacíos -> 400).
- Recursos inexistentes (DELETE de ID falso -> 404).