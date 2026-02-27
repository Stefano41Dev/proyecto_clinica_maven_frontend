import { ChangeDetectorRef, Component } from '@angular/core';
import { Navbar } from "../../../shared/components/navbar/navbar";
import { CitaResponse } from '../../../models/cita/cita-response';
import { Cita } from '../../../core/services/cita';
import { PageResponse } from '../../../models/page-response';
import { CommonModule } from '@angular/common';
import { MedicoResponse } from '../../../models/medico/medico-response';
import { Medico } from '../../../core/services/medico';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medico-listado',
  imports: [Navbar, CommonModule],
  templateUrl: './medico-listado.html',
  styleUrl: './medico-listado.css',
})
export class MedicoListado {
  medicos: MedicoResponse[] = [];

  paginaActual: number = 1;
  tamanioPagina: number = 10;
  totalPaginas: number = 0;
  totalRegistros: number = 0;

  constructor(
    private medicoService: Medico,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarMedico();
    
  }

  cargarMedico(): void {
    this.medicoService.listarPaginado(this.paginaActual, this.tamanioPagina)
      .subscribe((response: PageResponse<MedicoResponse>) => {
        
        this.medicos = response.contenido;
        console.log(this.medicos)
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
    this.router.navigate(['/medicos', id]);
  }
  
}
