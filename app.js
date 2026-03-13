let tareas =[];

function crearTarea (titulo) {
  return {
    id: tareas.length + 1,
    title: titulo,
    completed: false,
    createAt: new Date().toLocaleDateString('es-ES')
  };
}

const form = document.querySelector('form');
const input = document.getElementById('inputTarea');
const lista = document.getElementById('listaTareas');

form.addEventListener('submit', function(e){
  e.preventDefault();

  const titulo = input.value.trim();
  if (titulo === ('')) return;

  const tarea = crearTarea(titulo);
  tareas.push(tarea);
  renderizarTareas();

  input.value = '';
});

function renderizarTareas(){
  lista.innerHTML = '';

  let tareasFiltradas = tareas.filter(function(t) {
    if (filtroActivo === 'completadas') return t.completed;
    if (filtroActivo === 'pendientes') return !t.completed;
    return true;
  });

  tareasFiltradas.forEach(function(tarea) {
    const li = document.createElement('li');
    li.textContent = tarea.title;

    if (tarea.completed) {
      li.classList.add('completada');
    }

    li.addEventListener('click', function(){
      tarea.completed = !tarea.completed;
      renderizarTareas();
    });

    const botonEliminar = document.createElement('button');
    botonEliminar.innerHTML = '<img src="docs/recursos/papelel.png" alt="Eliminar" width="20">';
    botonEliminar.addEventListener ('click', function(e){
      e.stopPropagation();
      tareas = tareas.filter(function(t){
        return t.id !== tarea.id;
      });
      renderizarTareas();
    });

    li.appendChild(botonEliminar);

    lista.appendChild(li);
  });

  actualizarEstadisticas();
}

function actualizarEstadisticas(){
  const total = tareas.length;
  const completadas = tareas.filter(function(t) { return t.completed; }).length;
  const pendientes = total - completadas;

  document.getElementById('ttotales').textContent = total;
  document.getElementById('tcompletas').textContent = completadas;
  document.getElementById('tporhacer').textContent = pendientes;
}

const filtros = document.querySelectorAll('.filtro');
let filtroActivo = 'todas';

filtros.forEach(function(boton) {
  boton.addEventListener('click', function() {
    filtros.forEach(function(b) { b.classList.remove('activo'); });
    boton.classList.add('activo');
    filtroActivo = boton.dataset.filtro;
    renderizarTareas();
  });
});