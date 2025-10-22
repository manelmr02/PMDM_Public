import { Component, Input } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-tarjetas',
  imports: [CommonModule],
  templateUrl: './tarjetas.html',
  styleUrl: './tarjetas.css'
})
export class Tarjetas {
  @Input() personaje!:{
    nombre:string;
    equipo:string;
    poder: number;
    imagen:string;

  };

  @Input() esHalloween!:boolean;

  getEstrellas(): number[]{
    return Array(this.personaje.poder).fill(0);
  }

  getEscudo(equipo: string): string {
  switch (equipo) {
    case 'Inazuma Japon': return '/images/inazumajapon.webp';
    case 'Oscuridad Ancestral': return '/images/oscuridadAncestral.webp';
    default: return '';
  }
}

}
