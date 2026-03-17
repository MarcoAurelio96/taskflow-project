# Flujo de trabajo con Cursor

En este documento escribo mi experiencia usando Cursor. Incluiré atajos útiles y cómo ha mejorado partes de mi código.

Para comenzar abrí el chat y pregunté para que me explicara algunas funciones del código.

Utilicé el composer en mi archivo de app.js con este promt: Añade localStorage a esta app para guardar las tareas, cargar al iniciar y mantener el estado tras recargar la página

Atajos de teclado que más he utilzado:
Control + K - edición inline.
Control + L - para abrir el chat.
Control + I - para modificar multiples archivos

Ejemplos de mejora de código. 
1º: Ahora es más exacto generando IDs únicos para cada tarea

renderizarTareas();
function crearTarea(titulo) {
  // Genera un ID único incluso si se borran tareas anteriores
  let nuevoId = 1;
  if (tareas.length > 0) {
    // Buscar el máximo id ya asignado
    nuevoId = Math.max(...tareas.map(t => t.id)) + 1;
  }
  return {
    id: nuevoId,
    title: titulo,
    completed: false,
    createdAt: new Date().toLocaleDateString('es-ES') // corregido typo: createAt -> createdAt
  };
}

2º: Evita código repetido y la barra de progreso se actualiza de manera más segura

function actualizarEstadisticas() {
  const total = tareas.length;
  const completadas = tareas.reduce((acc, t) => acc + (t.completed ? 1 : 0), 0);
  const pendientes = total - completadas;
  const porcentaje = total > 0 ? Math.round((completadas / total) * 100) : 0;

  // Utiliza un helper para evitar código repetido
  const actualizarTexto = (id, valor) => {
    const el = document.getElementById(id);
    if (el) el.textContent = valor;
  };

  actualizarTexto('ttotales', total);
  actualizarTexto('tcompletas', completadas);
  actualizarTexto('tporhacer', pendientes);
  actualizarTexto('tporcentaje', `${porcentaje}%`);

  // Actualiza la barra de progreso de manera más segura
  const barra = document.getElementById('progresoBarra');
  if (barra) {
    barra.style.width = `${porcentaje}%`;
    barra.setAttribute('aria-valuenow', porcentaje);
  }
}
