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

Instalé el servidor MCP filesystem conectado a mi proyecto bootcamp-project.

Realicé estas 5 consultas:
1ª ¿Qué archivos hay en mi proyecto?
  index.html
  styles.css
  app.js
  README.md
  .gitignore
  docs/ai/ai-comparison.md
  docs/ai/cursor-workflow.md

2ª Lee el contenido de mi app.js
  Aquí tienes el contenido completo de tu app.js:
    let tareas = [];
    let filtroActivo = 'todas';
    (...)
    btnBorrarCompletadas.addEventListener('click', function() {
    tareas = tareas.filter(function(t) { return !t.completed; });
    renderizarTareas();
    });

3ª ¿Cuántas líneas tiene mi index.html?
  Tu index.html tiene 106 líneas.

4ª Busca en mi proyecto dónde uso localStorage
  Voy a buscar en todo el proyecto todas las apariciones de localStorage y te digo en qué archivos y líneas se usa.

  Dónde usas localStorage en tu proyecto
  index.html

  Línea 12: localStorage.getItem('modoOscuro')
  app.js

  Línea 25: localStorage.getItem(STORAGE_KEY_TAREAS) (cargar tareas)
  Línea 59: localStorage.setItem(STORAGE_KEY_TAREAS, ...) (guardar tareas)
  Línea 75: localStorage.setItem('modoOscuro', ...) (guardar modo)
  Línea 85: localStorage.getItem('modoOscuro') (leer modo)

5ª ¿Qué hay dentro de la carpeta docs?
  Tienes estos archivos:
    docs/ai/ai-comparison.md
    docs/ai/cursor-workflow.md
    docs/ai/experiments.md
    docs/ai/prompt-engineering.md
    docs/ai/reflection.md