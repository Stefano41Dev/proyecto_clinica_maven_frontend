import { Component, OnInit } from '@angular/core';
import { Navbar } from "../../../shared/components/navbar/navbar";
import { HttpClient } from '@angular/common/http';
import { Medico } from '../../../core/services/medico';
import { MedicoResponse } from '../../../models/medico/medico-response';

@Component({
  selector: 'app-dashboard-administrador',
  imports: [Navbar],
  templateUrl: './dashboard-administrador.html',
  styleUrl: './dashboard-administrador.css',
})
export class DashboardAdministrador implements OnInit {
  medicos: MedicoResponse[] = [];

  constructor(private medicoService: Medico){}
  ngOnInit(): void {
     this.medicoService.listar().subscribe({
        next: (data) => {
          this.medicos = data;
           console.log(this.medicos);
        },
        error: (err) => {
          console.error(err);
        }
      });
   
  }

  

}
