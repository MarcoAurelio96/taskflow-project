const taskService = require('../services/task.service');
const PRIORIDADES_VALIDAS = new Set(['normal', 'importante', 'urgente']);

const obtenerTodas = (req, res, next) => {
    try {
      const tareas = taskService.obtenerTodas();
      res.status(200).json(tareas);
    } catch (err) {
      next (err);
    }
};

const crearTarea = (req, res, next) => {
    try {
        const { title, priority, prioridad, completed } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'El título es obligatorio' });
        }

        if (typeof title !== 'string') {
            return res.status(400).json({ error: 'El título debe ser texto' })
        }

        const trimmedTitle = title.trim();

        if (trimmedTitle === '') {
            return res.status(400).json({ error: 'El título no puede estar vacío' })
        }

        // Evita que se creen títulos que sean solo números (ej. "123")
        if (/^\d+$/.test(trimmedTitle)) {
            return res.status(400).json({ error: 'El título no puede ser numérico' });
        }

        const finalPriorityRaw = priority ?? prioridad ?? 'normal';
        const finalPriority = PRIORIDADES_VALIDAS.has(finalPriorityRaw) ? finalPriorityRaw : 'normal';

        const tarea = taskService.crearTarea({ 
            title: trimmedTitle,
            priority: finalPriority,
            completed: completed || false
        });
        res.status(201).json(tarea);
      } catch (err) {
        next(err);
      }
};

const eliminarTarea = (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isFinite(id)) {
            return res.status(400).json({ error:'El ID debe ser un número válido' });
        }

        const tareaEliminada = taskService.eliminarTarea(id);
        res.status(200).json(tareaEliminada);
    }   catch (err) {
        next (err);
    }
};

const actualizarTarea = (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isFinite(id)) {
            return res.status(400).json({ error: 'El ID debe ser un número válido' });
        }

        const tareaActualizada = taskService.actualizarTarea(id, req.body || {});
        res.status(200).json(tareaActualizada);
    } catch (err) {
        next(err);
    }
};

module.exports = { obtenerTodas, crearTarea, eliminarTarea, actualizarTarea };
