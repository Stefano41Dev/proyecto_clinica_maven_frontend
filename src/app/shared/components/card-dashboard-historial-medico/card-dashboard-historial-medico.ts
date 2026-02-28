import { Component, Input } from '@angular/core';
import { HistorialMedicoResponse } from '../../../models/historial-medico/historial-medico-response';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-card-dashboard-historial-medico',
  imports: [CommonModule],
  templateUrl: './card-dashboard-historial-medico.html',
  styleUrl: './card-dashboard-historial-medico.css',
})
export class CardDashboardHistorialMedico {
  @Input() historial!: HistorialMedicoResponse;
  
}
