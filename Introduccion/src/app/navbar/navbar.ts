import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  imports: [MatSidenavModule,MatIconModule,RouterLink,RouterOutlet],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  pi:string="piiii";

  isSidebarOpen:boolean=false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
