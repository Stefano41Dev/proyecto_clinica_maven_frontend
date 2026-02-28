import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Navbar } from "../../../shared/components/navbar/navbar";
import { Medico } from '../../../core/services/medico';
import { MedicoResponse } from '../../../models/medico/medico-response';
import { CardDashboard } from "../../../shared/components/card-dashboard-medico/card-dashboard";
import { PacienteResponse } from '../../../models/paciente/paciente-response';
import { Paciente } from '../../../core/services/paciente';
import { CardDashboardPaciente } from "../../../shared/components/card-dashboard-paciente/card-dashboard-paciente";
import { CitaResponse } from '../../../models/cita/cita-response';
import { Cita } from '../../../core/services/cita';
import { CardDashboardCitas } from "../../../shared/components/card-dashboard-citas/card-dashboard-citas";
import { Router } from '@angular/router';
import {ChatBox} from '../../../shared/components/chat-box/chat-box';

@Component({
  selector: 'app-dashboard-administrador',
  standalone: true,
  imports: [Navbar, CardDashboard, CardDashboardPaciente, CardDashboardCitas, ChatBox],
  templateUrl: './dashboard-administrador.html',
  styleUrl: './dashboard-administrador.css',
})
export class DashboardAdministrador implements OnInit {

  medicos: MedicoResponse[] = [];
  pacientes: PacienteResponse[]= [];
  citas: CitaResponse[] = [];
  constructor(
    private medicoService: Medico,
    private pacienteService: Paciente,
    private citaService: Cita,
    private cdr: ChangeDetectorRef,
    private router: Router
  ){}

  ngOnInit(): void {
      this.cargarMedicos();
      this.cargarPacientes();
      this.cargarCitas();

  }

  cargarCitas(){
    this.citaService.listar().subscribe({
        next: (data) => {
              this.citas = data.contenido;
              this.cdr.detectChanges();

          },
          error: (err) => {
            console.error(err);
          }
    })
  }

  cargarMedicos(){
    this.medicoService.listar().subscribe({
          next: (data) => {
              this.medicos = data.contenido;
              this.cdr.detectChanges();

          },
          error: (err) => {
            console.error(err);
          }
      });
  }

  cargarPacientes(){
    this.pacienteService.listar().subscribe({
        next: (data) => {
            this.pacientes = data.contenido;
            this.cdr.detectChanges();

        },
        error: (err) => {
            console.error(err);
        }
      })
  }
  irAMedicos(){
    this.router.navigate(['/medicos']);
  }

  irAPacientes(){
    this.router.navigate(['/pacientes']);
  }

  irACitas(){
    this.router.navigate(['/citas'])
  }

}
