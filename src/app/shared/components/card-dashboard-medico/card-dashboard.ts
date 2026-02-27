import { Component, OnChanges } from '@angular/core';
import { Input } from '@angular/core';
import { Medico } from '../../../core/services/medico';
import { CommonModule, DatePipe } from '@angular/common';
import { MedicoResponse } from '../../../models/medico/medico-response';
import { Router } from '@angular/router';


@Component({
  selector: 'app-card-dashboard',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './card-dashboard.html',
  styleUrl: './card-dashboard.css',
})
export class CardDashboard{
  constructor(private router:Router){}
  @Input() medicos: MedicoResponse[] = [];
  
  verDetalle(idMedico:number){
    this.router.navigate(['/medicos', idMedico]);
  }
}
