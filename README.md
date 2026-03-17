# Next Task

Es una aplicación para crear, completar, eliminar y filtrar tareas del día a día.

## Diseño de la aplicación

La interfaz está dividida en cuatro secciones principales:

Cabecera: Muestra el nombre de la app. Es fija y siempre visible.

Formulario: Un campo de texto para escribir nuevas tareas con un botón para añadirlas. También incluye filtros para ver todas las tareas.

Lista de tareas: Muestra las tareas con un círculo para marcarlas como completadas y una papelera para eliminarlas. Las tareas completadas aparecen con texto tachado.

Panel de estadísticas: Muestra el total de tareas, cuántas están completadas, cuántas pendientes y una barra de progreso visual. Se actualiza en tiempo real.

### Acciones disponibles

Añadir tarea - Escribe en el input y pulsa Enter o el botón

Completar tarea - Haz clic en el círculo de la tarea

Eliminar tarea - Pulsa la papelera junto a la tarea

Filtrar tareas - Usa los chips: Todas / Pendientes / Completadas

### Responsive

Escritorio: Layout separado en 2 listas — lista de tareas a la izquierda, estadísticas a la derecha.
Móvil: Layout — estadísticas arriba, lista abajo.

### Persistencia

Los datos se guardan en `localStorage` para que las tareas no se pierdan al cerrar el navegador.

El diseño está en `docs/design/design.png`.

## Testing manual

La aplicación se probó manualmente con los siguientes casos:

La lista vacía se muestra correctamente.

No es posible añadir tareas sin título.

Las estadísticas se actualizan correctamente al marcar y eliminar tareas.

Los datos persisten al recargar la página.

Con títulos muy largos los iconos pueden desaparecer.

## Demo

La aplicación está desplegada en Vercel:
https://taskflow-project-42pz.vercel.app/
