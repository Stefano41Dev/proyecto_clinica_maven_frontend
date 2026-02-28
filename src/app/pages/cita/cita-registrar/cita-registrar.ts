import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstadoCitaResponse } from '../../../models/estado-cita/estado-cita-response';
import { Navbar } from "../../../shared/components/navbar/navbar";
import { CommonModule } from '@angular/common';
import { EstadoCita } from '../../../core/services/estadoCita';
import { Router } from '@angular/router';
import { CitaRequest } from '../../../models/cita/cita-request';
import { Cita } from '../../../core/services/cita';

@Component({
  selector: 'app-cita-registrar',
  imports: [Navbar, CommonModule, ReactiveFormsModule],
  templateUrl: './cita-registrar.html',
  styleUrl: './cita-registrar.css',
})
export class CitaRegistrar {
  citaForm!: FormGroup;
  constructor(
    private estadoCitaService: EstadoCita,
    private citaService: Cita,
    private fb: FormBuilder,
    private router: Router,
    private crs: ChangeDetectorRef
  ){}
  estadosCita: EstadoCitaResponse[] = [];
  ngOnInit(){
    this.citaForm = this.fb.group({
      idPaciente: [null, [
        Validators.required,
        Validators.min(1)
      ]],

      idMedico: [null, [
        Validators.required,
        Validators.min(1)
      ]],

      fechaProgramada: [null, [
        Validators.required
      ]],

      hora: [null, [
        Validators.required
      ]],

      idEstadoCita: [null, [
        Validators.required
      ]],

      motivo: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(250)
      ]]
    });
    this.cargarEstadosCita();
  }
  registrar(){
    if (this.citaForm.invalid) return;
    
    //const citaRequest: CitaRequest = this.citaForm.value;
     const formValue = this.citaForm.value;

    const citaRequest: CitaRequest = {
      ...formValue,
      hora: formValue.hora && formValue.hora.length === 5
        ? formValue.hora + ':00'
        : formValue.hora
    };
    this.citaService.registrarCita(citaRequest)
    .subscribe({
        next: (response) => {
          var res = response;

        },
        error: (err) => {
          alert('Error al registrar médico: ' + err);
        }
      });
  }
  cargarEstadosCita(){
    this.estadoCitaService.listar().subscribe({
      next: (response) => {
        this.estadosCita = response;
        this.crs.detectChanges();
      }
    })
  }

}
