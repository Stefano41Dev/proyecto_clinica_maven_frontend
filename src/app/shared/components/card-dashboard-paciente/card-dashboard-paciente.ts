import { Component, Input } from '@angular/core';
import { PacienteResponse } from '../../../models/paciente/paciente-response';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-dashboard-paciente',
  imports: [CommonModule],
  templateUrl: './card-dashboard-paciente.html',
  styleUrl: './card-dashboard-paciente.css',
})
export class CardDashboardPaciente {
  @Input() pacientes :  PacienteResponse[] = [];
  constructor(
    private router: Router
  ){}
  verDetalle(idMedico: number): void {
    this.router.navigate(['/pacientes', idMedico]);
  }
}
