# Next Task

Aplicación web (HTML/CSS/JS) para gestionar tareas diarias: crear, completar, editar, eliminar, filtrar y visualizar estadísticas, con persistencia en `localStorage`.

## Demo

- **Live**: `https://taskflow-project-42pz.vercel.app/`

## Funcionalidades

- **CRUD de tareas**: crear, editar (inline), completar y eliminar (con animación).
- **Búsqueda + filtros**:
  - **Búsqueda** por texto.
  - **Filtro**: Todas / Pendientes / Completadas.
- **Prioridad**: Normal / Importante / Urgente.
- **Orden por prioridad**: Urgente → Importante → Normal (orden estable por `id`).
- **Fecha de creación**: cada tarea muestra `createdAt`.
- **Estadísticas**: totales, completadas, pendientes y porcentaje con barra de progreso.
- **Tema**: modo claro/oscuro con persistencia.

## Estructura del proyecto

- `index.html`: estructura UI (formulario, filtros, lista, estadísticas).
- `styles.css`: estilos (tema claro/oscuro con variables CSS, layout y componentes).
- `app.js`: lógica de tareas, render, persistencia, estadísticas y eventos.
- `docs/ai/`: notas de trabajo y documentación auxiliar.

## Cómo ejecutar en local

No requiere build ni dependencias.

- **Opción A (rápida)**: abre `index.html` en el navegador.
- **Opción B (recomendada)**: usar un servidor local para evitar problemas de rutas/caché.

Ejemplos:

```bash
# Python
python -m http.server 5500
```

Luego abre `http://localhost:5500`.

## Persistencia (localStorage)

La app guarda estado en el navegador:

- **Tareas**: clave `tareas` (array serializado).
- **Tema**: clave `modoOscuro` (`'true'` / `'false'`).

### Esquema de una tarea

```js
{
  id: number,
  title: string,
  completed: boolean,
  createdAt: string, // fecha en formato es-ES
  priority: "normal" | "importante" | "urgente"
}
```

## UX / Responsive

- **Escritorio**: lista de tareas a la izquierda, estadísticas a la derecha.
- **Móvil**: layout en columna (adaptado con media queries).

## Testing manual (checklist)

- [ ] Añadir tarea vacía no crea registros.
- [ ] Editar tarea (Enter / blur) persiste y no marca como completada por error.
- [ ] Completar/descompletar actualiza estadísticas y se guarda.
- [ ] Eliminar aplica animación y actualiza persistencia.
- [ ] Prioridad se guarda, se muestra y ordena correctamente.
- [ ] Al recargar, tareas + tema se restauran.

## Roadmap

- Filtro por prioridad (Urgente / Importante / Normal).
- Cancelar edición con `Escape`.
- Usar el `<template id="plantillaTarea">` para renderizar items (menos manipulación manual).


## API Test con Postman

-Método: Get
-Test: Sin tareas
  1. Status 200
  2. Respuesta JSON []

-Método: Post
-Test: Sin título
  1. Status 400
  2. Respuesta { "error": "El título es obligatorio"  }

-Método: Post
-Test: Título no válido
  1. Status 400
  2. Respuesta { "error": "El título no puede ser numérico"  }

-Método: Post
-Test: Título vacío
  1. Status 400
  2. Respuesta { "error": "El título no puede estar vacío"  }

-Método: Post
-Test: Título válido
  1. Status 201
  2. Respuesta { "id": 1774523820769, "title": "Test tercera fase", "completed": false, "createdAt": "2026-03-26T11:17:00.769Z" }

-Método: Delete
-Test: Eliminar una ID que no existe
  1. Status 404
  2. Respuesta { "error": "Recurso no encontrado"  }

-Método: Delete
-Test: Eliminar una ID no válida
  1. Status 400
  2. Respuesta { "El ID debe ser un número válido"  }

-Método: Delete
-Test: Eliminar una ID válida
  1. Status 200
  2. Respuesta 1