import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrera',
  imports: [CommonModule],
  templateUrl: './carrera.html',
  styleUrl: './carrera.css'
})

export class Carrera {
  movChibi1 = {
    transform: "translateY(1000px)"
  };
}
