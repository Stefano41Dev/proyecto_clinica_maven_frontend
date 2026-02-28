import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from '../../../core/services/paciente';
import { Navbar } from "../../../shared/components/navbar/navbar";
import { forkJoin } from 'rxjs';
import { TipoDocumento } from '../../../core/services/tipoDocumento';
import { Sexo } from '../../../core/services/tipoSexo';
import { EstadoCivil } from '../../../core/services/estadoCivil';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paciente-actualizar',
  imports: [Navbar, CommonModule, ReactiveFormsModule],
  templateUrl: './paciente-actualizar.html',
  styleUrl: './paciente-actualizar.css',
})
export class PacienteActualizar {
  pacienteForm!: FormGroup;
  idPaciente!: number;

  tiposDocumento: any[] = [];
  tiposSexo: any[] = [];
  estadosCiviles: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private pacienteService: Paciente,
    private tipoDocumentoService: TipoDocumento,
    private tipoSexoService: Sexo,
    private estadoCivilService: EstadoCivil,
  ){}

  ngOnInit(): void {
    this.inicializarFormulario();

    this.idPaciente = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarCatalogos();
    
  }
  inicializarFormulario(): void {
    this.pacienteForm = this.fb.group({
      idTipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      idSexo: ['', Validators.required],
      idEstadoCivil: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  cargarCatalogos(): void {
    // Primero cargas listas
    forkJoin({
      tiposDocumento: this.tipoDocumentoService.listar(),
      tiposSexo: this.tipoSexoService.listar(),
      estadosCiviles: this.estadoCivilService.listar()
    }).subscribe(result => {
      this.tiposDocumento = result.tiposDocumento;
      this.tiposSexo = result.tiposSexo;
      this.estadosCiviles = result.estadosCiviles;

      this.buscarPaciente(this.idPaciente); 
    });
  }
  
  buscarPaciente(id: number): void {
    this.pacienteService.buscarPorId(id)
      .subscribe(data => {

        this.pacienteForm.patchValue({
          idTipoDocumento: data.tipoDocumentoResponse.idTipoDocumento,
          numeroDocumento: data.numeroDocumento,
          nombres: data.nombres,
          apellidos: data.apellidos,
          fechaNacimiento: data.fechaNacimiento,
          idSexo: data.tipoSexoResponse.idSexo,
          idEstadoCivil: data.estadoCivilResponse.idEstadoCivil,
          correo: data.correo
        });
      });
  }

  actualizar(): void {
    if (this.pacienteForm.invalid) return;

    const pacienteRequest = this.pacienteForm.value;

    this.pacienteService.actualizar(this.idPaciente, pacienteRequest)
      .subscribe(() => {
        this.router.navigate(['/pacientes']);
      });
  }
}
