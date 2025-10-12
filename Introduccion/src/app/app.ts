import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Matatopos } from './matatopos/matatopos';
import { Navbar } from './navbar/navbar';
import { Carrera } from './carrera/carrera';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar,Matatopos,Carrera],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Introduccion');
}
