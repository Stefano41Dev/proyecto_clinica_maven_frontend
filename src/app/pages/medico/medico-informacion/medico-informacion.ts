import { ChangeDetectorRef, Component } from '@angular/core';
import { MedicoResponse } from '../../../models/medico/medico-response';
import { Medico } from '../../../core/services/medico';
import { ActivatedRoute } from '@angular/router';
import { Navbar } from "../../../shared/components/navbar/navbar";

@Component({
  selector: 'app-medico-informacion',
  imports: [Navbar],
  templateUrl: './medico-informacion.html',
  styleUrl: './medico-informacion.css',
})
export class MedicoInformacion {
  medico!: MedicoResponse;

  constructor(
    private route: ActivatedRoute,
    private medicoService: Medico,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.buscarMedico(id);
  }
  
  buscarMedico(id: number): void {
    this.medicoService.buscarPorId(id)
      .subscribe(data => {
        this.medico = data;
        this.cdr.detectChanges();
      });
  }
  retroceder(): void {
    window.history.back();
  }
}
