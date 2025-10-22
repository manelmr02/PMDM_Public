import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-contador',
  imports: [CommonModule],
  templateUrl: './contador.html',
  styleUrl: './contador.css'
})
export class Contador {

  numero:number = 0;

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

  incrementar(){
    if(this.numero>=10){
      this.numero = 10;
    }else{
    this.numero++;
    }
  }

  decrementar(){
    if(this.numero<=0){
      this.numero = 0;
    }else{
      this.numero--;
    }
  } 

  reset(){
    this.numero = 10;
  }
}