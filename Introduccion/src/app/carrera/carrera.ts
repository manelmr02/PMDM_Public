import { Component,OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Corredor {
  id: number;
  nombre: string;
  imagen: string;
  posicion: number;
  velocidad: number;
  animacionCorriendo: boolean;
}

@Component({
  selector: 'app-carrera',
  imports: [CommonModule],
  templateUrl: './carrera.html',
  styleUrl: './carrera.css'
})

export class Carrera implements OnInit, OnDestroy{
   corredores: Corredor[] = [
    { id: 1, nombre: 'Anubis', imagen: '/images/anubis.png', posicion: 0, velocidad: 0, animacionCorriendo: false },
    { id: 2, nombre: 'Hell Knight', imagen: '/images/hell-knight.png', posicion: 0, velocidad: 0, animacionCorriendo: false },
    { id: 3, nombre: 'Old Guy', imagen: '/images/old-guy.png', posicion: 0, velocidad: 0, animacionCorriendo: false },
    { id: 4, nombre: 'Pirate', imagen: '/images/pirate.png', posicion: 0, velocidad: 0, animacionCorriendo: false },
    { id: 5, nombre: 'Succubus', imagen: '/images/succubus.png', posicion: 0, velocidad: 0, animacionCorriendo: false }
  ];
  carreraIniciada = false;
  ganador: string = '';
  intervalId: any;
  metaDistancia = 90;

  ngOnInit() {}

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  iniciarCarrera() {
    this.ganador = '';
    this.carreraIniciada = true;

    this.corredores.forEach(corredor => {
      corredor.posicion = 0;
      corredor.velocidad = Math.random() * 2 + 1;
      corredor.animacionCorriendo = true;
    });

    this.intervalId = setInterval(() => {
      this.actualizarPosiciones();
    }, 50);
  }

  actualizarPosiciones() {
    this.corredores.forEach(corredor => {
      if (corredor.posicion < this.metaDistancia) {
        const variacion = (Math.random() - 0.5) * 0.5;
        corredor.posicion += (corredor.velocidad + variacion) * 0.2;

        if (corredor.posicion >= this.metaDistancia) {
          corredor.posicion = this.metaDistancia;
          if (!this.ganador) {
            this.terminarCarrera(corredor.nombre);
          }
        }
      }
    });
  }

  terminarCarrera(nombreGanador: string) {
    this.ganador = nombreGanador;
    this.corredores.forEach(c => c.animacionCorriendo = false);
    clearInterval(this.intervalId);
  }

  getEstiloCorredor(corredor: Corredor) {
    return {
      'left': `${corredor.posicion}%`,
      'background-image': `url(${corredor.imagen})`
    };
  }
}

