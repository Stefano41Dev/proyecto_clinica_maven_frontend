import { ChangeDetectorRef, Component } from '@angular/core';
import { CitaResponse } from '../../../models/cita/cita-response';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { Cita } from '../../../core/services/cita';
import { PageResponse } from '../../../models/page-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cita-listado',
  imports: [Navbar, CommonModule],
  templateUrl: './cita-listado.html',
  styleUrl: './cita-listado.css',
})
export class CitaListado {
  citas: CitaResponse[] = [];
  
  paginaActual: number = 1;
  tamanioPagina: number = 10;
  totalPaginas: number = 0;
  totalRegistros: number = 0;

  constructor(
    private citaService: Cita,
    private cdr: ChangeDetectorRef,
    private router: Router
  ){}

  ngOnInit(): void {
    this.cargarCitas();
  }
  cargarCitas(): void {
      this.citaService.listarPaginado(this.paginaActual, this.tamanioPagina)
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
  editar(id:number){
    this.router.navigate(['/citas/actualizar', id]);
  }
}
