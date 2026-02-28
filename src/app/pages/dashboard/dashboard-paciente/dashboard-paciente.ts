import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CardDashboard } from "../../../shared/components/card-dashboard-medico/card-dashboard";
import { CardDashboardHistorialMedico } from "../../../shared/components/card-dashboard-historial-medico/card-dashboard-historial-medico";
import { CardDashboardCitas } from "../../../shared/components/card-dashboard-citas/card-dashboard-citas";
import { HistorialMedicoResponse } from '../../../models/historial-medico/historial-medico-response';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HistorialMedico } from '../../../core/services/historial-medico';
import { jwtDecode } from 'jwt-decode';
import { CitaResponse } from '../../../models/cita/cita-response';
import { Cita } from '../../../core/services/cita';
import { NavbarPaciente } from "../../../shared/components/navbar-paciente/navbar-paciente";

@Component({
  selector: 'app-dashboard-paciente',
  imports: [CardDashboardHistorialMedico, CommonModule, CardDashboardCitas, NavbarPaciente],
  templateUrl: './dashboard-paciente.html',
  styleUrl: './dashboard-paciente.css',
})
export class DashboardPaciente {
  @Input() historiales: HistorialMedicoResponse[] = [];
  @Input() citas: CitaResponse[] = [];

  constructor(
    private route: ActivatedRoute,
    private crs: ChangeDetectorRef,
    private router: Router,
    private historialMedicoService: HistorialMedico,
    private citaService: Cita
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const decoded: any = jwtDecode(token!);
    const correo = decoded.sub;
        
    this.buscarHistorialMedico(correo!);
    this.buscarCitasCorreo(correo!);
  }
  buscarHistorialMedico(correo: string) {
    this.historialMedicoService.listaHistorialMedicoPersonaCorreo(correo)
      .subscribe(data => {
        this.historiales = data.contenido;
        this.crs.detectChanges();
      });
  }
  buscarCitasCorreo(correo: string) {
    this.citaService.buscarCitaPorCorreo(correo)
      .subscribe(data => {
        this.citas = data.contenido;
        this.crs.detectChanges();
      });
  }
  verHistorialCompleto() {
    this.router.navigate(['historial-medico']);
  }
  verCitasCompleto() {
    this.router.navigate(['cita-paciente']);
  }
}
