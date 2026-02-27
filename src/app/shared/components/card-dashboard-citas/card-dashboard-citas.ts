import { Component, Input } from '@angular/core';
import { CitaResponse } from '../../../models/cita/cita-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-dashboard-citas',
  imports: [CommonModule],
  templateUrl: './card-dashboard-citas.html',
  styleUrl: './card-dashboard-citas.css',
})
export class CardDashboardCitas {
  @Input() citas : CitaResponse[] = [];
}
