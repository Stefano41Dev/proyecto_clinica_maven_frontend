import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-paciente',
  imports: [],
  templateUrl: './navbar-paciente.html',
  styleUrl: './navbar-paciente.css',
})
export class NavbarPaciente {
  constructor(private router: Router) {}
  salir(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
