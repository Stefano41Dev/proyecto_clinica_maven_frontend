import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MedicoRequest } from '../../../models/medico/medio-request';
import { Medico } from '../../../core/services/medico';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-medico-registrar',
  imports: [ 
    ReactiveFormsModule],
  templateUrl: './medico-registrar.html',
  styleUrl: './medico-registrar.css',
})
export class MedicoRegistrar {
  medicoForm!: FormGroup;
  especialidades = [
    { id: 1, nombre: 'Cardiología' },
    { id: 2, nombre: 'Pediatría' },
    { id: 3, nombre: 'Dermatología' }
  ];
  constructor(
    private fb: FormBuilder,
    private medicoService: Medico
  ) {}

  registrar(): void {
    if (this.medicoForm.invalid) return;

    const medicoRequest: MedicoRequest = this.medicoForm.value;

    this.medicoService.registrarMedico(medicoRequest)
      .subscribe({
        next: (response) => {
          alert(response); // si backend devuelve string
          this.medicoForm.reset();
        },
        error: (err) => {
          console.error(err);
          alert('Error al registrar médico');
        }
      });
  }
}
