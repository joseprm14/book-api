import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  // Comprueba el token de autenticacion
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    const error = new Error('Falta el Token o es inválido');
    error.name = 'BadToken';
    return next(error);
  }
  
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    const error = new Error('Token inválido');
    error.name = 'BadToken';
    return next(error);
  }
};