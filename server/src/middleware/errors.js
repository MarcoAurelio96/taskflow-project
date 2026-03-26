const errorHandler = (err, req, res, next) => {
    if (err.message === 'NOT_FOUND') {
        return res.status(404).json({ error: 'Recurso no encontrado' });
    }

    if (
        err.message === 'INVALID_TITLE_EMPTY' ||
        err.message === 'INVALID_TITLE_NUMERIC' ||
        err.message === 'INVALID_TITLE'
    ) {
        return res.status(400).json({ error: err.message });
    }

    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' })
}

module.exports = errorHandler;