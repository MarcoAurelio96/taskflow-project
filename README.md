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
