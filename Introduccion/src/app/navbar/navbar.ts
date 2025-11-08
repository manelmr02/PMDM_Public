import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Mode } from '../services/mode'

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, MatButtonToggleModule, MatSidenavModule, MatIconModule, RouterLink, RouterOutlet, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})

export class Navbar implements OnInit {
  pi: string = "piiii";

  isSidebarOpen: boolean = false;
  modoActual: string = 'normal';

  constructor(private modeService: Mode) { }

  ngOnInit() {
    this.modeService.mode$.subscribe(mode => {
      this.modoActual = mode;
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  cambiarModo(modo: string) {
    this.modeService.setMode(modo);
  }

}
