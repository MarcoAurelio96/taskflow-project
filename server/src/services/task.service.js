let tareas = [];

function obtenerTodas() {
    return tareas;
}

function crearTarea(data) {
    if (!data || !data.title) {
        throw new Error ('INVALID_DATA');
    }

  const nuevaTarea = {
    id: Date.now(),
    title: data.title,
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