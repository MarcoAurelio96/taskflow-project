let tareas = [];
const PRIORIDADES_VALIDAS = new Set(['normal', 'importante', 'urgente']);

function obtenerTodas() {
    return tareas;
}

function crearTarea(data) {
  const title = data?.title;
  const priorityRaw = data?.priority ?? data?.prioridad ?? 'normal';
  const priority = PRIORIDADES_VALIDAS.has(priorityRaw) ? priorityRaw : 'normal';
  if (typeof title !== 'string') throw new Error('INVALID_TITLE');
  const trimmedTitle = title.trim();
  if (trimmedTitle === '') throw new Error('INVALID_TITLE_EMPTY');
  // Evita que se creen títulos que sean solo números (ej. "123")
  if (/^\d+$/.test(trimmedTitle)) throw new Error('INVALID_TITLE_NUMERIC');

  const nuevaTarea = {
    id: Date.now(),
    title: trimmedTitle,
    completed: Boolean(data?.completed),
    priority,
    createdAt: data?.createdAt ?? new Date().toLocaleDateString('es-ES')
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

function actualizarTarea(id, data) {
  const index = tareas.findIndex((t) => t.id === id);
  if (index === -1) {
    throw new Error('NOT_FOUND');
  }

  const tarea = tareas[index];
  const payload = {};

  if (Object.prototype.hasOwnProperty.call(data, 'title')) {
    if (typeof data.title !== 'string') throw new Error('INVALID_TITLE');
    const trimmedTitle = data.title.trim();
    if (trimmedTitle === '') throw new Error('INVALID_TITLE_EMPTY');
    if (/^\d+$/.test(trimmedTitle)) throw new Error('INVALID_TITLE_NUMERIC');
    payload.title = trimmedTitle;
  }

  if (Object.prototype.hasOwnProperty.call(data, 'completed')) {
    if (typeof data.completed !== 'boolean') throw new Error('INVALID_COMPLETED');
    payload.completed = data.completed;
  }

  const priorityCandidate = Object.prototype.hasOwnProperty.call(data, 'priority')
    ? data.priority
    : Object.prototype.hasOwnProperty.call(data, 'prioridad')
      ? data.prioridad
      : undefined;

  if (priorityCandidate !== undefined) {
    if (!PRIORIDADES_VALIDAS.has(priorityCandidate)) throw new Error('INVALID_PRIORITY');
    payload.priority = priorityCandidate;
  }

  const tareaActualizada = { ...tarea, ...payload };
  tareas[index] = tareaActualizada;
  return tareaActualizada;
}

module.exports = {
  obtenerTodas,
  crearTarea,
  eliminarTarea,
  actualizarTarea
};