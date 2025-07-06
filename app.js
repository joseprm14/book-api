
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import booksRoutes from './routes/booksRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middlewares/errorMiddleware.js'
import { ensureFile } from './services/fileService.js';

dotenv.config();

await ensureFile("./data/books.json", []);

const app = express()

app.use(express.json());

// Imprime logs en consola 
app.use(morgan('dev'));

app.use('/api/books', booksRoutes);
app.use('/api', authRoutes);

//middleware para errores
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(
    PORT,
    () => console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
