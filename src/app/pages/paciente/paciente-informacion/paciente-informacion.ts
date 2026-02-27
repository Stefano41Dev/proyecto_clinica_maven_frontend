import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Paciente } from '../../../core/services/paciente';
import { PacienteResponse } from '../../../models/paciente/paciente-response';
import { Navbar } from "../../../shared/components/navbar/navbar";

@Component({
  selector: 'app-paciente-informacion',
  imports: [Navbar],
  templateUrl: './paciente-informacion.html',
  styleUrl: './paciente-informacion.css',
})
export class PacienteInformacion {
  paciente!: PacienteResponse;
  constructor(
    private route: ActivatedRoute,
    private pacienteService: Paciente,
    private cdr: ChangeDetectorRef,
  
  ){}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.buscarPaciente(id);
  }
  buscarPaciente(id: number): void {
    this.pacienteService.buscarPorId(id)
      .subscribe(data => {
        this.paciente = data;
        this.cdr.detectChanges();
      });
  }
  retroceder(){
    window.history.back();
  }
}
