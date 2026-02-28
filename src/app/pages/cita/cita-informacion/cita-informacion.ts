import { ChangeDetectorRef, Component } from '@angular/core';
import { Navbar } from "../../../shared/components/navbar/navbar";
import { ActivatedRoute } from '@angular/router';
import { Cita } from '../../../core/services/cita';
import { CitaResponse } from '../../../models/cita/cita-response';
import { CitaDatosCompletosResponse } from '../../../models/cita/cita-datos-completos-response';

@Component({
  selector: 'app-cita-informacion',
  imports: [Navbar],
  templateUrl: './cita-informacion.html',
  styleUrl: './cita-informacion.css',
})
export class CitaInformacion {
  cita!: CitaDatosCompletosResponse;
  constructor(
    private route: ActivatedRoute,
    private citaService: Cita,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.buscarCita(id);
  }
  retroceder(){
    window.history.back();
  }
  buscarCita(idCita: number){
    this.citaService.buscarCita(idCita)
    .subscribe(data => {
        this.cita = data;
        this.cdr.detectChanges();
      });
  }
}
