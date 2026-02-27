import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MedicoRequest } from '../../../models/medico/medio-request';
import { Medico } from '../../../core/services/medico';
import { BrowserModule } from '@angular/platform-browser';
import { EspecialidadResponse } from '../../../models/especialidad/especialidad-response';
import { Especialidad } from '../../../core/services/especialidad';
import { CommonModule } from '@angular/common';
import { Navbar } from "../../../shared/components/navbar/navbar";

@Component({
  selector: 'app-medico-registrar',
  imports: [
    ReactiveFormsModule, CommonModule,
    Navbar
],
  templateUrl: './medico-registrar.html',
  styleUrl: './medico-registrar.css',
})
export class MedicoRegistrar {
  medicoForm!: FormGroup;
  especialidades : EspecialidadResponse[] = [];
  urlVerificacion: string = '';
  constructor(
    private fb: FormBuilder,
    private medicoService: Medico,
    private especialidadService: Especialidad,
    private crs: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.medicoForm = this.fb.group({
      nombres: [''],
      apellidos: [''],
      idEspecialidad: [''],
      numeroColegiatura: [''],
      telefono: [''],
      correo: [''],
      password: ['']
    });

   this.cargarEspecialidades();
  }
  registrar(): void {
    if (this.medicoForm.invalid) return;

    const medicoRequest: MedicoRequest = this.medicoForm.value;

    this.medicoService.registrarMedico(medicoRequest)
      .subscribe({
        next: (response) => {
          this.urlVerificacion = response;

        },
        error: (err) => {
          console.error(err);
          alert('Error al registrar médico');
        }
      });
  }
  cargarEspecialidades(){
     this.especialidadService.listar().subscribe({
      next: (response) => {
        this.especialidades = response;
        this.crs.detectChanges();
      }
    });
  }
  limpiarFormulario(): void {
    this.medicoForm.reset();
    this.urlVerificacion = '';
  }
}
