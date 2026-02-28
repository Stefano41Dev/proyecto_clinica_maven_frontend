import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cita } from '../../../core/services/cita';
import { CitaResponse } from '../../../models/cita/cita-response';
import { PageResponse } from '../../../models/page-response';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-cita-listado-paciente',
  imports: [CommonModule],
  templateUrl: './cita-listado-paciente.html',
  styleUrl: './cita-listado-paciente.css',
})
export class CitaListadoPaciente {
  citas: CitaResponse[] = [];
  paginaActual: number = 1;
  tamanioPagina: number = 10;
  totalPaginas: number = 0;
  totalRegistros: number = 0;
  constructor(
    private router: Router,
    private citaService: Cita,
    private cdr: ChangeDetectorRef,

  ) {}
  
  ngOnInit(): void {
    this.cargarCitas();
  }
  cargarCitas(): void {
      const token = localStorage.getItem('token');
      const decoded: any = jwtDecode(token!);
      const correo = decoded.sub;

      this.citaService.buscarCitaPorCorreo(correo, this.paginaActual, this.tamanioPagina)
        .subscribe((response: PageResponse<CitaResponse>) => {
          
          this.citas = response.contenido;
          this.totalPaginas = response.totalPaginas;
          this.totalRegistros = response.totalRegistros;
          this.cdr.detectChanges(); 
        });
  }  
  cambiarPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas) return;

    this.paginaActual = pagina;
    this.cargarCitas();
  }
  verDetalle(id: number): void {
    this.router.navigate(['/citas', id]);
  }
}
