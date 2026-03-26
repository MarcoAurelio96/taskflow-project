let tareas = [];

function obtenerTodas() {
    return tareas;
}

function crearTarea(data) {
  const title = data?.title;
  if (typeof title !== 'string') throw new Error('INVALID_TITLE');
  const trimmedTitle = title.trim();
  if (trimmedTitle === '') throw new Error('INVALID_TITLE_EMPTY');
  // Evita que se creen títulos que sean solo números (ej. "123")
  if (/^\d+$/.test(trimmedTitle)) throw new Error('INVALID_TITLE_NUMERIC');

  const nuevaTarea = {
    id: Date.now(),
    title: trimmedTitle,
    completed: false,
    createdAt: new Date()
  };

  tareas.push(nuevaTarea);

  return nuevaTarea;
}

function eliminarTarea(id) {
  const index = tareas.findIndex(t => t.id === id);

  if (index === -1) {
    throw new Error('NOT_FOUND');
  }

  const tareaEliminada = tareas.splice(index, 1);

  return tareaEliminada[0];
}

module.exports = {
  obtenerTodas,
  crearTarea,
  eliminarTarea
};