import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Paciente } from '../../../core/services/paciente';
import { Navbar } from "../../../shared/components/navbar/navbar";
import { CommonModule } from '@angular/common';
import { TipoDocumentoResponse } from '../../../models/tipo-documento/tipo-documento-response';
import { TipoSexoResponse } from '../../../models/sexo/tipo-sexo-response';
import { EstadoCivilResponse } from '../../../models/estado-civil/estado-civil-response';
import { TipoDocumento } from '../../../core/services/tipoDocumento';
import { Sexo } from '../../../core/services/tipoSexo';
import { EstadoCivil } from '../../../core/services/estadoCivil';
import { PacienteRequest } from '../../../models/paciente/paciente-request';

@Component({
  selector: 'app-paciente-registrar',
  imports: [ReactiveFormsModule, CommonModule,Navbar],
  templateUrl: './paciente-registrar.html',
  styleUrl: './paciente-registrar.css',
})
export class PacienteRegistrar {
  pacienteForm!: FormGroup;
  urlVerificacion: string = '';
  tiposDocumento: TipoDocumentoResponse[] = [];
  tipoSexo : TipoSexoResponse[] = [];
  estadoCivil: EstadoCivilResponse[] = [];
  
  constructor(
    private fb: FormBuilder,
    private pacienteService: Paciente,
    private tipoDocumentoService: TipoDocumento,
    private tipoSexoService: Sexo,
    private estadoCivilService: EstadoCivil,
    private crs: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.pacienteForm = this.fb.group({
      nombres: [''],
      apellidos: [''],
      idTipoDocumento: [''],
      numeroDocumento: [''],
      idSexo: [''],
      idEstadoCivil: [''],
      fechaNacimiento: [''],
      correo: [''],
      password: ['']
    });
    this.cargarTiposDocumento();
    this.cargarTiposSexo();
    this.cargarEstadoCivil();
  }
  registrar(){
    if(this.pacienteForm.invalid) return;
    const pacienteRequest : PacienteRequest = this.pacienteForm.value;
    this.pacienteService.registrarPaciente(pacienteRequest).subscribe({
      next: (response) => {
        this.urlVerificacion = response;
        this.crs.detectChanges();
      },
      error: (err) => {
        console.error("Error al registrar paciente:", err);
        alert('Error al registrar paciente ' + err);
      }
    });
  }
  cargarTiposDocumento(){
      this.tipoDocumentoService.listar().subscribe({
        next: (response) => {
          this.tiposDocumento = response;
          this.crs.detectChanges();
        },
        error: (error) => {
          console.error('Error al cargar tipos de documento:', error);
        }
      }
      );
  }
  cargarTiposSexo(){
      this.tipoSexoService.listar().subscribe({
        next: (response) => {
          this.tipoSexo = response;
          this.crs.detectChanges();
        },
        error: (error) => {
          console.error('Error al cargar tipos de sexo:', error);
        }
      }
      );
  }
  cargarEstadoCivil(){
    this.estadoCivilService.listar().subscribe({
      next: (response) => {
        this.estadoCivil = response;
        this.crs.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar estado civil:', error);
      }
    }
    );
  }
  limpiarFormulario(): void {
    this.pacienteForm.reset();
    this.urlVerificacion = '';
  }
}
