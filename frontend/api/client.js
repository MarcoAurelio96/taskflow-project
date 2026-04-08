const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const API_BASE_URL = isLocalhost
  ? "http://localhost:3000/api/v1/tasks"
  : "/api/v1/tasks";

async function parseResponse(response, fallbackMessage) {
  if (response.ok) {
    if (response.status === 204) return null;
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  let message = fallbackMessage;
  try {
    const body = await response.json();
    if (body?.error) message = body.error;
  } catch (_) {
    // Si no hay JSON, usa el mensaje por defecto.
  }

  const error = new Error(message);
  error.status = response.status;
  throw error;
}

export const apiClient = {
  async getTasks() {
    const response = await fetch(API_BASE_URL);
    return parseResponse(response, "Error al obtener las tareas");
  },

  async createTask(taskData) {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    return parseResponse(response, "Error al crear la tarea");
  },

  async updateTask(id, taskData) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    return parseResponse(response, "Error al actualizar la tarea");
  },

  async deleteTask(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
    return parseResponse(response, "Error al eliminar la tarea");
  },
};
