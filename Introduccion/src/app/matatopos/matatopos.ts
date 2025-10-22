import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';



@Component({
  selector: 'app-matatopos',
  imports: [CommonModule],
  templateUrl: './matatopos.html',
  styleUrl: './matatopos.css'
})
export class Matatopos {
  numero: number = 0;
  topo: number = -1;
  esHalloween: boolean = false;

  constructor(private ruta: ActivatedRoute) {
    const param = this.ruta.snapshot.paramMap.get('esHalloween');
    this.esHalloween = param === 'true';  // Solo true si el string es 'true'
  }

  // esto es para suscribirse a cambios, lo que permite visualizar los cambios sin recargar
  ngOnInit() {
    this.ruta.paramMap.subscribe(params => {
      const param = params.get('esHalloween');
      this.esHalloween = param === 'true';
    });
  }

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
