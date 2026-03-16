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

buscador.addEventListener('input',function() {
  renderizarTareas();
});

const tareasGuardadas = localStorage.getItem('tareas');
if (tareasGuardadas) {
  tareas = JSON.parse(tareasGuardadas);
}

renderizarTareas();

function crearTarea (titulo) {
  return {
    id: tareas.length + 1,
    title: titulo,
    completed: false,
    createAt: new Date().toLocaleDateString('es-ES')
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

   li.addEventListener('click', function(){
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

      inputEditar.addEventListener('keydown', function(e) {
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

function actualizarEstadisticas(){
  const total = tareas.length;
  const completadas = tareas.filter(function(t) { return t.completed; }).length;
  const pendientes = total - completadas;
  const porcentaje = total === 0 ? 0 : Math.round((completadas / total) * 100);

  document.getElementById('ttotales').textContent = total;
  document.getElementById('tcompletas').textContent = completadas;
  document.getElementById('tporhacer').textContent = pendientes;
  document.getElementById('tporcentaje').textContent = porcentaje + '%';
  document.getElementById('progresoBarra').style.width = porcentaje + '%';
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

function guardarTareas(){
  localStorage.setItem('tareas',JSON.stringify(tareas));
  }


btnModoOscuro.addEventListener('click', function() {
  document.documentElement.classList.toggle('dark');
  const esModoOscuro = document.documentElement.classList.contains('dark');
  localStorage.setItem('modoOscuro', esModoOscuro);
  btnModoOscuro.textContent = esModoOscuro ? '☀️ Modo claro' : '🌙 Modo oscuro';
  logo.src = esModoOscuro ? 'docs/recursos/LOGOokB.png' : 'docs/recursos/LOGOok.png';
});

btnMarcarTodas.addEventListener('click', function() {
  tareas.forEach(function(t) { t.completed = true; });
  renderizarTareas();
});

btnBorrarCompletadas.addEventListener('click', function() {
  tareas = tareas.filter(function(t) { return !t.completed; });
  renderizarTareas();
});