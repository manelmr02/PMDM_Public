import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule,MatSlideToggleModule,MatSidenavModule,MatIconModule,RouterLink,RouterOutlet,CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  pi:string="piiii";

  isSidebarOpen:boolean=false;
  esHalloween:boolean=false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  
}
