const form = document.querySelector('form');
const input = document.querySelector('input');
const lista = document.getElementById('Listatareas');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const tarea = input.value.trim();

  if (tarea === '') return;

  const li = document.createElement('li');
  li.textContent = tarea;

  li.addEventListener('click', function() {
  li.classList.toggle('completada');
  });

  const botonEliminar = document.createElement('button');
  botonEliminar.textContent = 'Eliminar';
  botonEliminar.addEventListener('click', function(e) {
  e.stopPropagation();
  lista.removeChild(li);
  });

  li.appendChild(botonEliminar);

  lista.appendChild(li);

  input.value = '';
});