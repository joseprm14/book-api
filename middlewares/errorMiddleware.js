export default (err, req, res, next) => {
  // Error de validación
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: `Error de validación: ${err.details[0].message}` });
  }
  if (err.name === 'BookNotFound') {
    return res.status(404).json({ message: err.message });
  }
  if (err.name === 'BadToken') {
    return res.status(401).json({ message: err.message });
  }

  // Error Generico
  console.error(err.stack);
  res.status(500).json({ message: 'Error del servidor' });
};