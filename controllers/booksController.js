import { readJSON, writeJSON, newId } from "../services/fileService.js";

const BOOKS_FILE = "./data/books.json"

export const getAllBooks = async (req, res) => {
  // Devuelve todos los libros almacenados
  const books = await readJSON(BOOKS_FILE);
  res.status(200).json(books);
};

export const getBookById = async (req, res, next) => {
  // Devuelve un libro especifico dado su id
  const books = await readJSON(BOOKS_FILE);
  const book = books.find(b => b.id == req.params.id);
  if (!book) {
    const error = new Error('Libro no encontrado');
    error.name = 'BookNotFound';
    return next(error);
  }
  res.status(200).json(book);
};

export const createBook = async (req, res) => {
  // Almacena un nuevo libro
  const books = await readJSON(BOOKS_FILE);
  const newBook = {
    id: newId(books),
    ...req.body,
  };
  books.push(newBook);
  await writeJSON(BOOKS_FILE, books);
  res.status(201).json(newBook);
};

export const updateBook = async (req, res, next) => {
  // Actualiza los datos de un libro dado su id
  const books = await readJSON(BOOKS_FILE);
  const index = books.findIndex(b => b.id == req.params.id);
  if (index === -1) {
    const error = new Error('Libro no encontrado');
    error.name = 'BookNotFound';
    return next(error);
  }

  books[index] = { ...books[index], ...req.body };
  await writeJSON(BOOKS_FILE, books);
  res.status(200).json(books[index]);
};

export const deleteBook = async(req, res, next) => {
  // Elimina un libro de la base de datos
  const books = await readJSON(BOOKS_FILE);

  const index = books.findIndex(b => b.id == req.params.id);
  if (index === -1) {
    const error = new Error('Libro no encontrado');
    error.name = 'BookNotFound';
    return next(error);
  }
  
  const deleted = books.splice(index, 1)[0];
  await writeJSON(BOOKS_FILE, books);
  
  res.status(200).json(deleted);
};