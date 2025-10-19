import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors  } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-registro',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './formulario-registro.html',
  styleUrl: './formulario-registro.css'
})
export class FormularioRegistro {

  formulario: FormGroup;
  countdown = '';
  tiposInvitado = ['Humano', 'Fantasma', 'Vampiro', 'Bruja'];
  mensajeExito = '';
  private intervalId: any;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      tipoInvitado: ['', Validators.required],
      disfraz: ['', Validators.required],
      fechaLlegada: ['', [Validators.required, this.validarFechaHalloween]],
      aceptaReglas: [false, Validators.requiredTrue]
    });
  }

  validarFechaHalloween(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const fechaSeleccionada = new Date(control.value);
    const añoActual = new Date().getFullYear();
    const halloween = new Date(añoActual, 9, 31, 23, 59, 59); // 31 de octubre

    if (fechaSeleccionada > halloween) {
      return { fechaTardia: true };
    }

    return null;
  }

  ngOnInit() {
    this.iniciarContador();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  mostrar() {
    // marcar todos los campos como tocados para mostrar los dialogos de errores
    Object.keys(this.formulario.controls).forEach(key => {
      this.formulario.controls[key].markAsTouched();
    });
    if (this.formulario.invalid) {
      console.log("Formulario inválido, contiene errores");
      this.mensajeExito = '';
    } else {
      const nombre = this.formulario.value.nombre;
      this.mensajeExito = `🎃 ¡Bienvenido/a, ${nombre}! Tu entrada para la fiesta del castillo ha sido registrada con éxito.`;
      console.log("Datos del formulario:", this.formulario.value);
    }
  }

  resetear() {
    this.formulario.reset({
      nombre: '',
      email: '',
      tipoInvitado: '',
      disfraz: '',
      fechaLlegada: '',
      aceptaReglas: false
    });
    this.mensajeExito = '';
  }

  //funcion que inicia el contador generando un intervalo que se actualizaca cada segundo
  iniciarContador() {
    this.actualizarContador();
    this.intervalId = setInterval(() => {
      this.actualizarContador();
    }, 1000);
  }

  //funcion para actualizar el contador
  actualizarContador() {
    const ahora = new Date();
    const halloween = new Date(ahora.getFullYear(), 9, 31, 23, 59, 59); // Octubre 31 a las 23:59:59
    
    // si ya pasó Halloween este año se cuenta para el proximo año
    if (ahora > halloween) {
      halloween.setFullYear(halloween.getFullYear() + 1);
    }

    const diferencia = halloween.getTime() - ahora.getTime();

    if (diferencia <= 0) {
      this.countdown = "🕛¡La noche de los bugs ha comenzado!🕛";
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    } else {
      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

      this.countdown = `⏰Faltan ${dias}d ${horas}h ${minutos}m ${segundos}s para la TENEBROSA fiesta de Halloween⏰`;
    }
  }

   // Método auxiliar para obtener las clases CSS de un campo
  getCampoClases(campo: string): string {
    const control = this.formulario.controls[campo];
    return control.invalid && control.touched ? 'campo-error' : '';
  }
}
