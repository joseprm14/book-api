import {promises as fs} from 'node:fs';

export async function ensureFile(file, defaultValue) {
    // Funcion que se asegura de que un fichero de datos existe y si no lo crea con el valor default
    try{
        await fs.access(file);
    }
    catch {
        await fs.mkdir(DATA_DIR, {recursive: true});
        await fs.writeFile(file, JSON.stringify(defaultValue, null, 2));
    }
}

// Funcion para generar un id numerico para los libros
export function newId(data) {
    if (data.length === 0) return 1;
    return Math.max(...data.map(obj => obj.id)) + 1;
}

// Funciones para leer y escribir archivos JSON
export const readJSON = async f => JSON.parse( await fs.readFile(f, 'utf8'));
export const writeJSON = async (f, d) => fs.writeFile(f, JSON.stringify(d, null, 2));
