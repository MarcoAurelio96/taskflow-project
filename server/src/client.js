// URL dinámica: local en desarrollo, ruta relativa para Vercel
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE_URL = isLocalhost ? 'http://localhost:3000/api/v1/tasks' : '/api/v1/tasks';

export const apiClient = {
  async getTasks() {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error('Error al obtener las tareas');
    return response.json();
  },

  async createTask(taskData) {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error('Error al crear la tarea');
    return response.json();
  },

  async updateTask(id, taskData) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PATCH', // Puedes cambiarlo a PUT si tu backend lo requiere
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error('Error al actualizar la tarea');
    return response.json();
  },

  async deleteTask(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar la tarea');
    return response.json();
  }
};
