import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Inicio } from './inicio/inicio';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar,Inicio],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('PMDM - Manel');
}
