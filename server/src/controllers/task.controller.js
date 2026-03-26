const taskService = require('../services/task.service');

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
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'El título es obligatorio' });
        }

        if (typeof title !== 'string') {
            return res.status(400).json({ error: 'El título debe ser texto' })
        }

        if (title.trim() === '') {
            return res.status(400).json({ error: 'El título no puede estar vacío' })
        }

        const tarea = taskService.crearTarea({ title });
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

        taskService.eliminarTarea(id);
        res.status(200).send();
    }   catch (err) {
        next (err);
    }
};

module.exports = { obtenerTodas, crearTarea, eliminarTarea };
