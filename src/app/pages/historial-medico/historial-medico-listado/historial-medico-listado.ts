import { ChangeDetectorRef, Component } from '@angular/core';
import { HistorialMedico } from '../../../core/services/historial-medico';
import { ActivatedRoute, Router } from '@angular/router';
import { HistorialMedicoResponse } from '../../../models/historial-medico/historial-medico-response';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { NavbarPaciente } from "../../../shared/components/navbar-paciente/navbar-paciente";
import { Navbar } from "../../../shared/components/navbar/navbar";

@Component({
  selector: 'app-historial-medico-listado',
  imports: [CommonModule, NavbarPaciente],
  templateUrl: './historial-medico-listado.html',
  styleUrl: './historial-medico-listado.css',
})
export class HistorialMedicoListado {
  constructor(
    private route: ActivatedRoute,
    private crs: ChangeDetectorRef,
    private router: Router,
    private historialMedicoService: HistorialMedico
  ) {}

  historiales: HistorialMedicoResponse[] = [];
  paginaActual: number = 1;
  tamanioPagina: number = 10;
  totalPaginas: number = 0;
  totalRegistros: number = 0;
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const decoded: any = jwtDecode(token!);
    const correo = decoded.sub;
    this.buscarHistorialMedico(correo, this.paginaActual, this.tamanioPagina);
  }
  buscarHistorialMedico(correo: string, page: number = 1, tamPag: number = 10) {
  
    this.historialMedicoService.listaHistorialMedicoPersonaCorreo(correo, page, tamPag)
      .subscribe(data => {
        this.historiales = data.contenido;
        this.totalPaginas = data.totalPaginas;
        this.totalRegistros = data.totalRegistros;
        this.crs.detectChanges();
      });
  }

  cambiarPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas) return;

    this.paginaActual = pagina;
    const token = localStorage.getItem('token');
    const decoded: any = jwtDecode(token!);
    const correo = decoded.sub;
    this.buscarHistorialMedico(correo, pagina, this.tamanioPagina);
  }
  verDetalleCita(idCita: number): void {
    this.router.navigate(['/cita-medico', idCita]);  
  }
}
