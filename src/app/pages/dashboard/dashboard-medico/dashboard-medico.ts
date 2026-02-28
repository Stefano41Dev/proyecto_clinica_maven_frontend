import { ChangeDetectorRef, Component } from '@angular/core';
import { NavbarPaciente } from "../../../shared/components/navbar-paciente/navbar-paciente";
import { PageResponse } from '../../../models/page-response';
import { CitaResponse } from '../../../models/cita/cita-response';
import { Cita } from '../../../core/services/cita';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EstadoCita } from '../../../core/services/estadoCita';
import { EstadoCitaResponse } from '../../../models/estado-cita/estado-cita-response';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-medico',
  imports: [NavbarPaciente, CommonModule,FormsModule],
  templateUrl: './dashboard-medico.html',
  styleUrl: './dashboard-medico.css',
})
export class DashboardMedico {

  estadoSeleccionado: number | null = null;
  fechaSeleccionada: string | null = null;

  citas: CitaResponse[] = [];
  estadosCita: EstadoCitaResponse[] = [];
  paginaActual: number = 1;
  tamanioPagina: number = 10;
  totalPaginas: number = 0;
  totalRegistros: number = 0;

  constructor(
    private citaService: Cita,
    private estadoCitaService: EstadoCita,
    private cdr: ChangeDetectorRef,
    private router: Router
  ){}

  ngOnInit(): void {
    this.cargarCitas();
    this.cargarEstadosCita();
  }
  cargarCitas(): void {

  this.citaService.listarCitasPorEstado(
      this.paginaActual,
      this.tamanioPagina,
      this.estadoSeleccionado,
      this.fechaSeleccionada
  )
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
    this.router.navigate(['/cita-medico', id]);
  }
  cargarEstadosCita(): void {
    this.estadoCitaService.listar().subscribe((estados: EstadoCitaResponse[]) => {
      this.estadosCita = estados;
    });
  }
  aplicarFiltros(): void {
    this.paginaActual = 1; // reset paginación
    this.cargarCitas();
  }
}
