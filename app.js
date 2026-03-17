let tareas = [];

let filtroActivo = 'todas';

const STORAGE_KEY_TAREAS = 'tareas';

const form = document.querySelector('form');
const input = document.getElementById('inputTarea');
const lista = document.getElementById('listaTareas');
const buscador = document.getElementById('buscador');
const btnModoOscuro = document.getElementById('btnModoOscuro');
const logo = document.getElementById('logo');
const btnMarcarTodas = document.getElementById('btnMarcarTodas');
const btnBorrarCompletadas = document.getElementById('btnBorrarCompletadas');

buscador.addEventListener('input',function() {
  renderizarTareas();
});

function cargarTareas() {
  const raw = localStorage.getItem(STORAGE_KEY_TAREAS);
  if (!raw) return [];

  try {
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];

    return data
      .map((t, idx) => {
        if (!t || typeof t !== 'object') return null;
        const id = Number.isFinite(Number(t.id)) ? Number(t.id) : idx + 1;
        const title = typeof t.title === 'string' ? t.title : '';
        const completed = Boolean(t.completed);
        const createdAt =
          typeof t.createdAt === 'string'
            ? t.createdAt
            : typeof t.createAt === 'string'
              ? t.createAt
              : new Date().toLocaleDateString('es-ES');

        if (!title.trim()) return null;
        return { id, title: title.trim(), completed, createdAt };
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

function guardarTareas() {
  try {
    localStorage.setItem(STORAGE_KEY_TAREAS, JSON.stringify(tareas));
  } catch {
    // Si el almacenamiento está lleno o bloqueado, evitamos romper la app.
  }
}

tareas = cargarTareas();

function setModoOscuro(esModoOscuro) {
  document.documentElement.classList.toggle('dark', esModoOscuro);

  try {
    localStorage.setItem('modoOscuro', esModoOscuro ? 'true' : 'false');
  } catch {}

  btnModoOscuro.textContent = esModoOscuro ? '☀️ Modo claro' : '🌙 Modo oscuro';
  logo.src = esModoOscuro ? 'docs/recursos/LOGOokB.png' : 'docs/recursos/LOGOok.png';
}

function aplicarModoOscuroDesdeStorage() {
  let esModoOscuro = false;
  try {
    esModoOscuro = localStorage.getItem('modoOscuro') === 'true';
  } catch {}
  setModoOscuro(esModoOscuro);
}

aplicarModoOscuroDesdeStorage();

renderizarTareas();
/* Funciones para crear tareas, actualizar estadisticas y guardar tareas*/
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

form.addEventListener('submit', function(e){
  e.preventDefault();

  const titulo = input.value.trim();
  if (titulo === ('')) return;

  const tarea = crearTarea(titulo);
  tareas.push(tarea);
  renderizarTareas();

  const liNuevo = lista.lastElementChild;
    if (liNuevo) {
      liNuevo.style.opacity = '0';
      liNuevo.style.transform = 'translateY(-10px)';
      liNuevo.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      setTimeout(function() {
        liNuevo.style.opacity = '1';
        liNuevo.style.transform = 'translateY(0)';
      }, 10);
    }

  input.value = '';
});

function renderizarTareas(){
  lista.innerHTML = '';

  const textoBusqueda = buscador.value.toLowerCase();

  let tareasFiltradas = tareas.filter(function(t) {
  const coincideTexto = t.title.toLowerCase().includes(textoBusqueda);
  if (filtroActivo === 'completadas') return t.completed && coincideTexto;
  if (filtroActivo === 'pendientes') return !t.completed && coincideTexto;
  return coincideTexto;
  });

tareasFiltradas.forEach(function(tarea) {
    const li = document.createElement('li');

    const spanTexto = document.createElement('span');
    spanTexto.textContent = tarea.title;
    spanTexto.style.flex = '1';

    if (tarea.completed) {
      li.classList.add('completada');
    }

   li.addEventListener('click', function(e){
      if (e && e.target && e.target.tagName === 'INPUT') return;
      tarea.completed = !tarea.completed;
      if (tarea.completed) {
       li.classList.add('completada');
      } else {
        li.classList.remove('completada');
      }
    actualizarEstadisticas();
    guardarTareas();
    });

    const botonEditar = document.createElement('button');
    botonEditar.innerHTML = '<img src="docs/recursos/lapiz.png" alt="Editar" width="20">';
    botonEditar.setAttribute('aria-label', 'Editar tarea');
    botonEditar.addEventListener('click', function(e) {
      e.stopPropagation();

      const inputEditar = document.createElement('input');
      inputEditar.type = 'text';
      inputEditar.value = tarea.title;

      li.textContent = '';
      li.appendChild(inputEditar);
      li.appendChild(botonEditar);
      li.appendChild(botonEliminar);

      inputEditar.focus();

      inputEditar.addEventListener('click', function(e) {
        e.stopPropagation();
      });

      inputEditar.addEventListener('keydown', function(e) {
        e.stopPropagation();
        if (e.key === 'Enter' && inputEditar.value.trim() !== '') {
          tarea.title = inputEditar.value.trim();
          renderizarTareas();
        }
      });

      inputEditar.addEventListener('blur', function() {
        if (inputEditar.value.trim() !== '') {
          tarea.title = inputEditar.value.trim();
          renderizarTareas();
        }
      });
    });

    const botonEliminar = document.createElement('button');
    botonEliminar.innerHTML = '<img src="docs/recursos/papelel.png" alt="Eliminar" width="20">';
    botonEliminar.setAttribute('aria-label', 'Eliminar tarea');
    botonEliminar.addEventListener('click', function(e){
      e.stopPropagation();
      li.classList.add('eliminando');
      setTimeout(function() {
        tareas = tareas.filter(function(t){
          return t.id !== tarea.id;
        });
      renderizarTareas();
      }, 300); // espera 0.3s a que termine la animación
    });

    li.appendChild(spanTexto);
    li.appendChild(botonEditar);
    li.appendChild(botonEliminar);
    lista.appendChild(li);
  });

  actualizarEstadisticas();
  guardarTareas();
}

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

const filtros = document.querySelectorAll('.filtro');

filtros.forEach(function(boton) {
  boton.addEventListener('click', function() {
    filtros.forEach(function(b) { b.classList.remove('activo'); });
    boton.classList.add('activo');
    filtroActivo = boton.dataset.filtro;
    renderizarTareas();
  });
});


btnModoOscuro.addEventListener('click', function() {
  const esModoOscuro = !document.documentElement.classList.contains('dark');
  setModoOscuro(esModoOscuro);
});

btnMarcarTodas.addEventListener('click', function() {
  tareas.forEach(function(t) { t.completed = true; });
  renderizarTareas();
});

btnBorrarCompletadas.addEventListener('click', function() {
  tareas = tareas.filter(function(t) { return !t.completed; });
  renderizarTareas();
});