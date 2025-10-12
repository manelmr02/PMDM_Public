import { Component } from '@angular/core';
import { Tarjetas } from '../tarjetas/tarjetas';
@Component({
  selector: 'app-lista-personajes',
  imports: [Tarjetas],
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
}
