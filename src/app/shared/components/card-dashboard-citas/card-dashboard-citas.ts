import { Component, Input } from '@angular/core';
import { CitaResponse } from '../../../models/cita/cita-response';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-dashboard-citas',
  imports: [CommonModule],
  templateUrl: './card-dashboard-citas.html',
  styleUrl: './card-dashboard-citas.css',
})
export class CardDashboardCitas {
  @Input() citas : CitaResponse[] = [];
  constructor(private router:Router){}
  verDetalle(idCita:number){
    this.router.navigate(['/citas', idCita]);
  }
}
