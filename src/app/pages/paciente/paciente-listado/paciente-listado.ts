import { ChangeDetectorRef, Component } from '@angular/core';
import { Navbar } from "../../../shared/components/navbar/navbar";
import { CommonModule } from '@angular/common';
import { PacienteResponse } from '../../../models/paciente/paciente-response';
import { Paciente } from '../../../core/services/paciente';
import { PageResponse } from '../../../models/page-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paciente-listado',
  imports: [Navbar, CommonModule],
  templateUrl: './paciente-listado.html',
  styleUrl: './paciente-listado.css',
})
export class PacienteListado {
  pacientes: PacienteResponse[] = [];

  paginaActual: number = 1;
  tamanioPagina: number = 10;
  totalPaginas: number = 0;
  totalRegistros: number = 0;

  constructor(
    private pacienteService: Paciente,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.cargarMedico();
      
    }
  
    cargarMedico(): void {
      this.pacienteService.listarPaginado(this.paginaActual, this.tamanioPagina)
        .subscribe((response: PageResponse<PacienteResponse>) => {
          
          this.pacientes = response.contenido;
          console.log(this.pacientes)
          this.totalPaginas = response.totalPaginas;
          this.totalRegistros = response.totalRegistros;
          this.cdr.detectChanges(); 
        });
    }
  
    cambiarPagina(pagina: number): void {
      if (pagina < 1 || pagina > this.totalPaginas) return;
  
      this.paginaActual = pagina;
      this.cargarMedico();
    }
    verDetalle(id: number): void {
      this.router.navigate(['/pacientes', id]);
    }
}
