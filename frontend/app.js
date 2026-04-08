import { apiClient } from "./api/client.js";

let tareas = [];
let filtroActivo = "todas";

const form = document.getElementById("formularioTarea");
const input = document.getElementById("inputTarea");
const lista = document.getElementById("listaTareas");
const buscador = document.getElementById("buscador");
const btnModoOscuro = document.getElementById("btnModoOscuro");
const btnMarcarTodas = document.getElementById("btnMarcarTodas");
const btnBorrarCompletadas = document.getElementById("btnBorrarCompletadas");
const contadorCaracteres = document.getElementById("contadorCaracteres");
const selectPrioridad = document.getElementById("prioridadTarea");
const estadoRed = document.getElementById("estadoRed");

function setEstadoRed(tipo, mensaje) {
  estadoRed.className = `estado-red ${tipo}`;
  estadoRed.textContent = mensaje;
}

function limpiarEstadoRed() {
  setEstadoRed("idle", "");
}

function manejarErrorRed(error) {
  const code = error?.status ? ` (${error.status})` : "";
  setEstadoRed("error", `Error de servidor${code}: ${error.message}`);
  console.error(error);
}

async function ejecutarConEstadoRed(fn, loadingMessage, successMessage) {
  try {
    setEstadoRed("loading", loadingMessage);
    const result = await fn();
    if (successMessage) {
      setEstadoRed("success", successMessage);
      setTimeout(limpiarEstadoRed, 1500);
    } else {
      limpiarEstadoRed();
    }
    return result;
  } catch (error) {
    manejarErrorRed(error);
    return null;
  }
}

buscador.addEventListener("input", function () {
  renderizarTareas();
});

input.addEventListener("input", function () {
  contadorCaracteres.textContent = `${input.value.length}/100`;
});

function setModoOscuro(esModoOscuro) {
  document.documentElement.classList.toggle("dark", esModoOscuro);
  btnModoOscuro.textContent = esModoOscuro ? "☀️ Modo claro" : "🌙 Modo oscuro";
  localStorage.setItem("modoOscuro", esModoOscuro);
}

// Cargar la preferencia del usuario guardada en su navegador
const modoOscuroGuardado = localStorage.getItem("modoOscuro") === "true";
setModoOscuro(modoOscuroGuardado);

async function init() {
  const data = await ejecutarConEstadoRed(
    () => apiClient.getTasks(),
    "Cargando tareas desde el servidor...",
    "Tareas sincronizadas con el servidor"
  );
  if (!data) return;
  tareas = data;
  renderizarTareas();
}

init();

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const titulo = input.value.trim();
  if (!titulo) return;

  const prioridad = selectPrioridad ? selectPrioridad.value : "normal";
  const tareaNueva = { title: titulo, priority: prioridad, completed: false };
  const tareaCreada = await ejecutarConEstadoRed(
    () => apiClient.createTask(tareaNueva),
    "Creando tarea...",
    "Tarea creada correctamente"
  );

  if (!tareaCreada) return;
  tareas.push(tareaCreada);
  renderizarTareas();
  input.value = "";
  contadorCaracteres.textContent = "0/100";
});

/**
 * Renderiza las tareas filtradas en el DOM.
 */
function renderizarTareas() {
  lista.innerHTML = "";

  const textoBusqueda = buscador.value.toLowerCase();

  let tareasFiltradas = tareas.filter(function (t) {
    const coincideTexto = t.title.toLowerCase().includes(textoBusqueda);
    if (filtroActivo === "completadas") return t.completed && coincideTexto;
    if (filtroActivo === "pendientes") return !t.completed && coincideTexto;
    return coincideTexto;
  });

  const prioridadRank = { urgente: 0, importante: 1, normal: 2 };
  tareasFiltradas.sort(function (a, b) {
    const ra = prioridadRank[a.priority] ?? 2;
    const rb = prioridadRank[b.priority] ?? 2;
    if (ra !== rb) return ra - rb;
    return (a.id ?? 0) - (b.id ?? 0);
  });

  tareasFiltradas.forEach(function (tarea) {
    const li = document.createElement("li");

    const info = document.createElement("div");
    info.className = "tarea-info";

    const header = document.createElement("div");
    header.className = "tarea-header";

    const spanTexto = document.createElement("span");
    spanTexto.textContent = tarea.title;

    const badgePrioridad = document.createElement("span");
    const prioridad = tarea.priority || "normal";
    badgePrioridad.className = `badge-prioridad prioridad-${prioridad}`;
    badgePrioridad.textContent =
      prioridad === "urgente" ? "Urgente" : prioridad === "importante" ? "Importante" : "Normal";

    header.appendChild(spanTexto);

    const spanFecha = document.createElement("small");
    spanFecha.className = "tarea-fecha";
    spanFecha.textContent = `Creada: ${tarea.createdAt}`;

    info.appendChild(header);
    info.appendChild(spanFecha);
    info.style.flex = "1";

    if (tarea.completed) {
      li.classList.add("completada");
    }

    li.addEventListener("click", async function (e) {
      if (e && e.target && e.target.tagName === "INPUT") return;
      const nuevoEstado = !tarea.completed;
      const tareaActualizada = await ejecutarConEstadoRed(
        () => apiClient.updateTask(tarea.id, { completed: nuevoEstado }),
        "Actualizando tarea...",
        "Tarea actualizada"
      );
      if (!tareaActualizada) return;
      tarea.completed = tareaActualizada.completed;
      li.classList.toggle("completada", tarea.completed);
      actualizarEstadisticas();
    });

    const botonEditar = document.createElement("button");
    botonEditar.innerHTML = `<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg>`;
    botonEditar.setAttribute("aria-label", "Editar tarea");
    botonEditar.addEventListener("click", function (e) {
      e.stopPropagation();

      const inputEditar = document.createElement("input");
      inputEditar.type = "text";
      inputEditar.value = tarea.title;

      li.textContent = "";
      li.appendChild(inputEditar);
      li.appendChild(botonEditar);
      li.appendChild(botonEliminar);

      inputEditar.focus();

      inputEditar.addEventListener("click", function (e) {
        e.stopPropagation();
      });

      const guardarEdicion = async () => {
        const nuevoTitulo = inputEditar.value.trim();
        if (nuevoTitulo !== "" && nuevoTitulo !== tarea.title) {
          const tareaActualizada = await ejecutarConEstadoRed(
            () => apiClient.updateTask(tarea.id, { title: nuevoTitulo }),
            "Guardando cambios...",
            "Tarea editada"
          );
          if (tareaActualizada) {
            tarea.title = tareaActualizada.title;
          }
          renderizarTareas();
        } else if (nuevoTitulo === tarea.title) {
          renderizarTareas();
        }
      };

      inputEditar.addEventListener("keydown", function (e) {
        e.stopPropagation();
        if (e.key === "Enter") guardarEdicion();
      });

      inputEditar.addEventListener("blur", guardarEdicion);
    });

    const botonEliminar = document.createElement("button");
    botonEliminar.innerHTML = `<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>`;
    botonEliminar.setAttribute("aria-label", "Eliminar tarea");
    botonEliminar.addEventListener("click", async function (e) {
      e.stopPropagation();
      const deleted = await ejecutarConEstadoRed(
        () => apiClient.deleteTask(tarea.id),
        "Eliminando tarea...",
        "Tarea eliminada"
      );
      if (deleted === null) return;
      li.classList.add("eliminando");
      setTimeout(function () {
        tareas = tareas.filter(function (t) {
          return t.id !== tarea.id;
        });
        renderizarTareas();
      }, 300);
    });

    const actions = document.createElement("div");
    actions.className = "tarea-actions";
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

  actualizarTexto("ttotales", total);
  actualizarTexto("tcompletas", completadas);
  actualizarTexto("tporhacer", pendientes);
  actualizarTexto("tporcentaje", `${porcentaje}%`);

  // Actualiza la barra de progreso de manera más segura
  const barra = document.getElementById("progresoBarra");
  if (barra) {
    barra.style.width = `${porcentaje}%`;
    barra.setAttribute("aria-valuenow", porcentaje);
  }
}

const filtros = document.querySelectorAll(".filtro");

filtros.forEach(function (boton) {
  boton.addEventListener("click", function () {
    filtros.forEach(function (b) {
      b.classList.remove("activo");
    });
    boton.classList.add("activo");
    filtroActivo = boton.dataset.filtro;
    renderizarTareas();
  });
});

btnModoOscuro.addEventListener("click", function () {
  const esModoOscuro = !document.documentElement.classList.contains("dark");
  setModoOscuro(esModoOscuro);
});

btnMarcarTodas.addEventListener("click", async function () {
  const pendientes = tareas.filter((t) => !t.completed);
  const actualizaciones = await ejecutarConEstadoRed(
    () => Promise.all(pendientes.map((t) => apiClient.updateTask(t.id, { completed: true }))),
    "Marcando tareas...",
    "Tareas actualizadas"
  );
  if (!actualizaciones) return;
  tareas = tareas.map((t) => ({ ...t, completed: true }));
  renderizarTareas();
});

btnBorrarCompletadas.addEventListener("click", async function () {
  const completadas = tareas.filter((t) => t.completed);
  const borradas = await ejecutarConEstadoRed(
    () => Promise.all(completadas.map((t) => apiClient.deleteTask(t.id))),
    "Borrando tareas completadas...",
    "Tareas completadas eliminadas"
  );
  if (!borradas) return;
  tareas = tareas.filter(function (t) {
    return !t.completed;
  });
  renderizarTareas();
});