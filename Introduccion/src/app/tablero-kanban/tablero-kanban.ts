import { Component, OnInit } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Tarea } from '../interfaces/tareas.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tablero-kanban',
  imports: [DragDropModule, CommonModule, FormsModule],
  templateUrl: './tablero-kanban.html',
  styleUrl: './tablero-kanban.css'
})
export class TableroKanban {
  todo: Tarea[] = [];
  doing: Tarea[] = [];
  done: Tarea[] = [];

  mostrarFormulario = false;
  nuevaTarea = {
    titulo: '',
    descripcion: ''
  };

  tareasExpandidas = new Set<string>();

  ngOnInit() {
    this.cargarTareas();

    // si no hay tareas, agregamos algunas de ejemplo
    if (this.todo.length === 0 && this.doing.length === 0 && this.done.length === 0) {
      this.agregarTareaEjemplo();
    }
  }

  agregarTareaEjemplo() {
    this.todo = [
      {
        id: this.generarId(),
        titulo: 'Diseñar interfaz',
        descripcion: 'Crear mockups y wireframes del proyecto',
        estado: 'todo'
      },
      {
        id: this.generarId(),
        titulo: 'Configurar proyecto',
        descripcion: 'Instalar dependencias y configurar Angular',
        estado: 'todo'
      }
    ];

    this.doing = [
      {
        id: this.generarId(),
        titulo: 'Implementar componentes',
        descripcion: 'Desarrollar los componentes principales de la aplicación',
        estado: 'doing'
      }
    ];

    this.done = [
      {
        id: this.generarId(),
        titulo: 'Planificación inicial',
        descripcion: 'Reunión con el equipo para la planificación y definición de requisitos',
        estado: 'done'
      }
    ];

    this.guardarTareas();
  }

  generarId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  drop(event: CdkDragDrop<Tarea[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const tarea = event.previousContainer.data[event.previousIndex];

      // actualizar el estado de la tarea
      if (event.container.id === 'todoList') {
        tarea.estado = 'todo';
      } else if (event.container.id === 'doingList') {
        tarea.estado = 'doing';
      } else if (event.container.id === 'doneList') {
        tarea.estado = 'done';
      }

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.guardarTareas();
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.limpiarFormulario();
    }
  }

  agregarTarea() {
    if (this.nuevaTarea.titulo.trim()) {
      const tarea: Tarea = {
        id: this.generarId(),
        titulo: this.nuevaTarea.titulo.trim(),
        descripcion: this.nuevaTarea.descripcion.trim(),
        estado: 'todo'
      };

      this.todo.push(tarea);
      this.guardarTareas();
      this.limpiarFormulario();
      this.mostrarFormulario = false;
    }
  }

  limpiarFormulario() {
    this.nuevaTarea = {
      titulo: '',
      descripcion: ''
    };
  }

  eliminarTarea(id: string, lista: Tarea[]) {
    const index = lista.findIndex(t => t.id === id);
    if (index > -1) {
      lista.splice(index, 1);
      this.tareasExpandidas.delete(id);
      this.guardarTareas();
    }
  }

  toggleDescripcion(id: string) {
    if (this.tareasExpandidas.has(id)) {
      this.tareasExpandidas.delete(id);
    } else {
      this.tareasExpandidas.add(id);
    }
  }

  isExpanded(id: string): boolean {
    return this.tareasExpandidas.has(id);
  }

  guardarTareas() {
    const datos = {
      todo: this.todo,
      doing: this.doing,
      done: this.done
    };
    localStorage.setItem('kanban-tareas', JSON.stringify(datos));
  }

  cargarTareas() {
    const datos = localStorage.getItem('kanban-tareas');
    if (datos) {
      const parsed = JSON.parse(datos);
      this.todo = parsed.todo || [];
      this.doing = parsed.doing || [];
      this.done = parsed.done || [];
    }
  }

  get totalTodo(): number {
    return this.todo.length;
  }

  get totalDoing(): number {
    return this.doing.length;
  }

  get totalDone(): number {
    return this.done.length;
  }
}

