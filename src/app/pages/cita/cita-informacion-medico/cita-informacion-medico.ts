import { ChangeDetectorRef, Component } from '@angular/core';
import { NavbarPaciente } from "../../../shared/components/navbar-paciente/navbar-paciente";
import { CitaDatosCompletosResponse } from '../../../models/cita/cita-datos-completos-response';
import { ActivatedRoute } from '@angular/router';
import { Cita } from '../../../core/services/cita';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HistorialMedico } from '../../../core/services/historial-medico';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cita-informacion-medico',
  imports: [NavbarPaciente, ReactiveFormsModule, CommonModule],
  templateUrl: './cita-informacion-medico.html',
  styleUrl: './cita-informacion-medico.css',
})
export class CitaInformacionMedico {
  cita!: CitaDatosCompletosResponse;
  esAtendida: boolean = false;
  historialForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private citaService: Cita,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private historialService: HistorialMedico
  ) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.buscarCita(id);
    this.consultarEstadoCita(id);
     this.historialForm = this.fb.group({
      diagnostico: ['', Validators.required],
      tratamiento: ['', Validators.required],
      observaciones: ['']
    });
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
  consultarEstadoCita(idCita: number){
    this.citaService.consultarEstadoCita(idCita).subscribe({
      next: (esAtendida: boolean) => {
        this.esAtendida = esAtendida;
      },
      error: (err) => {
        console.error('Error consultando estado', err);
      }
    });
  }
   abrirModalHistorialMedico(){
    new (window as any).bootstrap.Modal(
      document.getElementById('modalHistorialMedico')
    ).show();
  }

  guardarHistorial(){
    if(this.historialForm.invalid) return;

    const request = {
      idCita: this.cita.idCita,
      ...this.historialForm.value
    };

    console.log(request);

    this.historialService.generarHistorial(request)
    .subscribe({
      next: () => {
        alert("Se genero el historial medico para el paciente")
      },
      error: (err) => {
        console.error('Error consultando estado', err);
      }
    })

    const modal = (window as any).bootstrap.Modal.getInstance(
      document.getElementById('modalHistorialMedico')
    );
    modal.hide();

    this.historialForm.reset();
  }
}
