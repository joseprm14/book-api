import Joi from 'joi';

// Esquema de validacion de los libros
//    Titulo es requerido y minimo de 3 caracteres
//    Descripcion es opcional
//    Fecha de publicacion es requerida y con formato ISO 8601
//    Autor es requerido y minimo de 3 caracteres
const schema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().optional(),
  publishedDate: Joi.date().iso().required(),
  author: Joi.string().min(3).required()
});

export default (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    error.name = 'ValidationError';
    return next(error);
  }
  next();
};