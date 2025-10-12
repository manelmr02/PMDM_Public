import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-matatopos',
  imports: [CommonModule],
  templateUrl: './matatopos.html',
  styleUrl: './matatopos.css'
})
export class Matatopos {
  numero: number = 0;
  topo: number = -1;

  comenzar() {
    this.generarTopo();
  }

  clickTopo() {
    this.numero++;
    this.generarTopo();
  }

  generarTopo() {
    let nuevoTopo: number;
    do {
      nuevoTopo = Math.floor(Math.random() * 9);
    } while (nuevoTopo === this.topo);
    this.topo = nuevoTopo;
  }

  reset() {
    this.numero = 0;
    this.topo = -1;
  }


}
