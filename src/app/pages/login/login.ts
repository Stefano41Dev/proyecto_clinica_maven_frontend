import { Component } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  correo: string = '';
  passwd: string = '';

  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  iniciarSesion() {

    const data = {
      correo: this.correo,
      passwd: this.passwd
    };

    this.authService.login(data).subscribe({
      next: (response) => {

       
        localStorage.setItem('token', response.token);
        const decoded: any = jwtDecode(response.token);
        const rol = decoded.rol;

        if (rol === 'ADMINISTRADOR') {
            console.log(rol)
            this.router.navigate(['/dashboard-admin']);
            
        } else if (rol === 'MEDICO') {
            console.log(rol)
            this.router.navigate(['/dashboard-medico']);
        } else {
            console.log(rol)
            this.router.navigate(['/dashboard']);
        }
        
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.log('Mensaje backend:', error.error);
          alert(error.error); 
        } else if (error.status === 0) {
          alert('No se pudo conectar con el servidor');
        } else {
          alert('Error inesperado');
        }
          
      }
    });
  }
}
