export interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  estado: 'todo' | 'doing' | 'done';
}