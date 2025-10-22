import { Component,OnInit} from '@angular/core';
import { Tarjetas } from '../tarjetas/tarjetas';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-personajes',
  imports: [Tarjetas,CommonModule],
  templateUrl: './lista-personajes.html',
  styleUrl: './lista-personajes.css'
})
export class ListaPersonajes {

  personajes = [
    {
      nombre: 'Mark Evans',
      equipo: 'Inazuma Japon',
      poder: 5,
      imagen: '/images/markevans.webp'
    },
    {
      nombre: 'Axel Blaze',
      equipo: 'Inazuma Japon',
      poder: 5,
      imagen: '/images/axelblaze.webp'
    },
    {
      nombre: 'Shawn Frost',
      equipo: 'Inazuma Japon',
      poder: 4,
      imagen: '/images/shawnfrost.webp'
    },
    {
      nombre: 'Xavier Foster',
      equipo: 'Inazuma Japon',
      poder: 4,
      imagen: '/images/xavierfoster.webp'
    },
    {
      nombre: 'Tezcat',
      equipo: 'Oscuridad Ancestral',
      poder: 5,
      imagen: '/images/tezcat.webp'
    }
  ];

  esHalloween: boolean = false;

  constructor(private ruta: ActivatedRoute) {
    const param = this.ruta.snapshot.paramMap.get('esHalloween');
    this.esHalloween = param === 'true';  // Solo true si el string es 'true'
  }


  ngOnInit() {
    this.ruta.paramMap.subscribe(params => {
      const param = params.get('esHalloween');
      this.esHalloween = param === 'true';
    });
  }
}
