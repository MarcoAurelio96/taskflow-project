import { apiClient } from './src/api/client.js';

let tareas = [];

let filtroActivo = 'todas';

const form = document.querySelector('form');
const input = document.getElementById('inputTarea');
const lista = document.getElementById('listaTareas');
const buscador = document.getElementById('buscador');
const btnModoOscuro = document.getElementById('btnModoOscuro');
const logo = document.getElementById('logo');
const btnMarcarTodas = document.getElementById('btnMarcarTodas');
const btnBorrarCompletadas = document.getElementById('btnBorrarCompletadas');
const contadorCaracteres = document.getElementById('contadorCaracteres');
const selectPrioridad = document.getElementById('prioridadTarea');

buscador.addEventListener('input',function() {
  renderizarTareas();
});

input.addEventListener('input', function() {
  contadorCaracteres.textContent = input.value.length + '/100';
});

/**
 * Activa o desactiva el modo oscuro.
 * @param {boolean} esModoOscuro - true para modo oscuro, false para modo claro.
 */
function setModoOscuro(esModoOscuro) {
  document.documentElement.classList.toggle('dark', esModoOscuro);

  btnModoOscuro.textContent = esModoOscuro ? '☀️ Modo claro' : '🌙 Modo oscuro';
  logo.src = esModoOscuro ? 'docs/recursos/LOGOokB.png' : 'docs/recursos/LOGOok.png';
}

function aplicarModoOscuroDesdeStorage() {
  let esModoOscuro = false;
  setModoOscuro(esModoOscuro);
}

aplicarModoOscuroDesdeStorage();

// Inicializar cargando tareas del servidor
async function init() {
  try {
    tareas = await apiClient.getTasks();
    renderizarTareas();
  } catch (error) {
    console.error('Error al inicializar la app:', error);
  }
}

init();

form.addEventListener('submit', async function(e){
  e.preventDefault();

  const titulo = input.value.trim();
  if (titulo === ('')) return;

  const prioridad = selectPrioridad ? selectPrioridad.value : 'normal';

  try {
    const tareaNueva = {
      title: titulo,
      priority: prioridad,
      completed: false,
      createdAt: new Date().toLocaleDateString('es-ES')
    };
    const tareaCreada = await apiClient.createTask(tareaNueva);
    tareas.push(tareaCreada);
    renderizarTareas();

    const liNuevo = lista.lastElementChild;
    if (liNuevo) {
      liNuevo.style.opacity = '0';
      liNuevo.style.transform = 'translateY(-10px)';
      liNuevo.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      requestAnimationFrame(function() {
        liNuevo.style.opacity = '1';
        liNuevo.style.transform = 'translateY(0)';
      });

      // Limpia estilos inline al terminar, para no romper el :hover (transform).
      setTimeout(function() {
        liNuevo.style.opacity = '';
        liNuevo.style.transform = '';
        liNuevo.style.transition = '';
      }, 350);
    }

  } catch (error) {
    console.error('Error al crear tarea:', error);
  }

  input.value = '';
});

/**
 * Renderiza las tareas filtradas en el DOM.
 */
function renderizarTareas(){
  lista.innerHTML = '';

  const textoBusqueda = buscador.value.toLowerCase();

  let tareasFiltradas = tareas.filter(function(t) {
  const coincideTexto = t.title.toLowerCase().includes(textoBusqueda);
  if (filtroActivo === 'completadas') return t.completed && coincideTexto;
  if (filtroActivo === 'pendientes') return !t.completed && coincideTexto;
  return coincideTexto;
  });

  const prioridadRank = { urgente: 0, importante: 1, normal: 2 };
  tareasFiltradas.sort(function(a, b) {
    const ra = prioridadRank[a.priority] ?? 2;
    const rb = prioridadRank[b.priority] ?? 2;
    if (ra !== rb) return ra - rb;
    return (a.id ?? 0) - (b.id ?? 0);
  });

tareasFiltradas.forEach(function(tarea) {
    const li = document.createElement('li');

    const info = document.createElement('div');
    info.className = 'tarea-info';

    const header = document.createElement('div');
    header.className = 'tarea-header';

    const spanTexto = document.createElement('span');
    spanTexto.textContent = tarea.title;

    const badgePrioridad = document.createElement('span');
    const prioridad = tarea.priority || 'normal';
    badgePrioridad.className = `badge-prioridad prioridad-${prioridad}`;
    badgePrioridad.textContent =
      prioridad === 'urgente' ? 'Urgente' : prioridad === 'importante' ? 'Importante' : 'Normal';

    header.appendChild(spanTexto);

    const spanFecha = document.createElement('small');
    spanFecha.className = 'tarea-fecha';
    spanFecha.textContent = `Creada: ${tarea.createdAt}`;

    info.appendChild(header);
    info.appendChild(spanFecha);
    info.style.flex = '1';

    if (tarea.completed) {
      li.classList.add('completada');
    }

   li.addEventListener('click', async function(e){
      if (e && e.target && e.target.tagName === 'INPUT') return;
      
      try {
        const nuevoEstado = !tarea.completed;
        await apiClient.updateTask(tarea.id, { completed: nuevoEstado });
        tarea.completed = nuevoEstado;
        
        if (tarea.completed) {
         li.classList.add('completada');
        } else {
          li.classList.remove('completada');
        }
        actualizarEstadisticas();
      } catch (error) {
        console.error('Error al actualizar tarea:', error);
      }
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

      const guardarEdicion = async () => {
        const nuevoTitulo = inputEditar.value.trim();
        if (nuevoTitulo !== '' && nuevoTitulo !== tarea.title) {
          try {
            await apiClient.updateTask(tarea.id, { title: nuevoTitulo });
            tarea.title = nuevoTitulo;
            renderizarTareas();
          } catch (error) {
            console.error('Error al editar tarea:', error);
            renderizarTareas(); // Restaura si hay error de servidor
          }
        } else if (nuevoTitulo === tarea.title) {
          renderizarTareas(); // Solo salimos del modo edición
        }
      };

      inputEditar.addEventListener('keydown', function(e) {
        e.stopPropagation();
        if (e.key === 'Enter') guardarEdicion();
      });

      inputEditar.addEventListener('blur', guardarEdicion);
    });

    const botonEliminar = document.createElement('button');
    botonEliminar.innerHTML = '<img src="docs/recursos/papelel.png" alt="Eliminar" width="20">';
    botonEliminar.setAttribute('aria-label', 'Eliminar tarea');
    botonEliminar.addEventListener('click', async function(e){
      e.stopPropagation();
      try {
        await apiClient.deleteTask(tarea.id);
        li.classList.add('eliminando');
        setTimeout(function() {
          tareas = tareas.filter(function(t){ return t.id !== tarea.id; });
          renderizarTareas();
        }, 300); // espera 0.3s a que termine la animación
      } catch (error) {
        console.error('Error al eliminar tarea:', error);
      }
    });

    const actions = document.createElement('div');
    actions.className = 'tarea-actions';
    actions.appendChild(badgePrioridad);
    actions.appendChild(botonEditar);
    actions.appendChild(botonEliminar);

    li.appendChild(info);
    li.appendChild(actions);
    lista.appendChild(li);
  });

  actualizarEstadisticas();
}

/**
 * Actualiza las estadísticas del aside en tiempo real.
 */
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

btnMarcarTodas.addEventListener('click', async function() {
  try {
    const pendientes = tareas.filter(t => !t.completed);
    // Se lanzan las actualizaciones al servidor en paralelo
    await Promise.all(pendientes.map(t => apiClient.updateTask(t.id, { completed: true })));
    tareas.forEach(function(t) { t.completed = true; });
    renderizarTareas();
  } catch (error) {
    console.error('Error al marcar todas:', error);
  }
});

btnBorrarCompletadas.addEventListener('click', async function() {
  try {
    const completadas = tareas.filter(t => t.completed);
    await Promise.all(completadas.map(t => apiClient.deleteTask(t.id)));
    tareas = tareas.filter(function(t) { return !t.completed; });
    renderizarTareas();
  } catch (error) {
    console.error('Error al borrar completadas:', error);
  }
});