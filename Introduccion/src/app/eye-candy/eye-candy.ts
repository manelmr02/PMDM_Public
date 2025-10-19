import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eye-candy',
  imports: [CommonModule],
  templateUrl: './eye-candy.html',
  styleUrl: './eye-candy.css',
  animations: [
    trigger('evolveAnimation', [
    transition('* => *', [
      style({ opacity: 1, filter: 'brightness(1)' }),
      animate('300ms ease-in', style({ filter: 'brightness(2)', opacity: 0 })),
      animate('300ms ease-out', style({ filter: 'blur(4px)', opacity: 0 })),
      animate('800ms ease-in', style({ filter: 'blur(0px)', opacity: 1, transform: 'scale(1)' }))
    ])
  ])
  ]
})
export class EyeCandy {
  stages = [
    { name: 'Chimchar', img: '/images/Chimchar.webp' },
    { name: 'Monferno', img: '/images/Monferno.webp' },
    { name: 'Infernape', img: '/images/Infernape.webp' },
  ];
  currentStage = 'chimchar';
  currentName = 'Chimchar';
  currentImage = '/images/Chimchar.webp';
  isEvolving = false;

  ngOnInit() {
    this.startEvolution();
  }

  /*Funcion asincrona para iniciar la evolucion (esto lo hacemos cuando se carga la pagina)*/
  async startEvolution() {
    for (let i = 1; i < this.stages.length; i++) {
      this.isEvolving = true;
      await this.sleep(1500); // tiempo de efecto
      this.isEvolving = false;
      this.currentStage = this.stages[i].name.toLowerCase();
      this.currentName = this.stages[i].name;
      this.currentImage = this.stages[i].img;
      await this.sleep(2000); // tiempo visible antes de siguiente evolución
    }
  }

  restartEvolution() {
    if (this.isEvolving) return; // evita reinicios durante animación
    this.currentStage = 'chimchar';
    this.currentName = 'Chimchar';
    this.currentImage = '/images/Chimchar.webp';
    this.startEvolution();
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
