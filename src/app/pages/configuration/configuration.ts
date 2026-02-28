import { ChangeDetectorRef, Component } from '@angular/core';
import { Navbar } from "../../shared/components/navbar/navbar";
import { Especialidad } from '../../core/services/especialidad';
import { EspecialidadResponse } from '../../models/especialidad/especialidad-response';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EspecialidadRequest } from '../../models/especialidad/especialidad-request';
import { EstadoCitaResponse } from '../../models/estado-cita/estado-cita-response';
import { EstadoCivilResponse } from '../../models/estado-civil/estado-civil-response';
import { TipoDocumento } from '../../core/services/tipoDocumento';
import { TipoDocumentoResponse } from '../../models/tipo-documento/tipo-documento-response';
import { EstadoCita } from '../../core/services/estadoCita';
import { EstadoCivil } from '../../core/services/estadoCivil';
import { EstadoCitaRequest } from '../../models/estado-cita/estado-cita-request';
import { EstadoCivilRequest } from '../../models/estado-civil/estado-civil-request';
import { TipoDocumentoRequest } from '../../models/tipo-documento/tipo-documento-request';
import { Sexo } from '../../core/services/tipoSexo';
import { TipoSexoResponse } from '../../models/sexo/tipo-sexo-response';
import { TipoSexoRequest } from '../../models/sexo/tipo-sexo-request';

@Component({
  selector: 'app-configuration',
  imports: [Navbar, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './configuration.html',
  styleUrl: './configuration.css',
})
export class Configuration {
  especialidadesMedico : EspecialidadResponse[] = [];
  estadosCita: EstadoCitaResponse[] = [];
  estadosCivil: EstadoCivilResponse[] = [];
  tiposDocumento: TipoDocumentoResponse[] = [];
  tiposSexo: TipoSexoResponse[] = [];

  especialidadForm!: FormGroup;
  estadoCitaForm!: FormGroup;
  estadoCivilForm!: FormGroup;
  tipoDocumentoForm!: FormGroup;
  tipoSexoForm!: FormGroup;

  idEspecialidadSeleccionada!: number;
  nombreEspecialidadEditar: string = '';
  
  idEstadoCitaSeleccionado!: number;
  nombreEstadoCitaEditar: string = '';

  idEstadoCivilSeleccionado!: number;
  nombreEstadoCivilEditar: string = '';

  idTipoDocumentoSeleccionado!: number;
  nombreTipoDocumentoEditar: string = '';

  idTipoSexoSeleccionado!: number;
  nombreTipoSexo: string = '';  

  constructor(
    private especialidadService: Especialidad,
    private estadoCitaService: EstadoCita,
    private estadoCivilService: EstadoCivil,
    private tipoDocumentoService: TipoDocumento,
    private tipoSexoService: Sexo,
    private fb: FormBuilder,
    private crs: ChangeDetectorRef
  ){}

  ngOnInit(){
    this.especialidadForm = this.fb.group({
      nombre: [null, [
        Validators.required,
        Validators.min(1)
      ]]
    })
    this.estadoCitaForm = this.fb.group({
      nombreEstado: [null, [Validators.required]]
    });

    this.estadoCivilForm = this.fb.group({
      nombreEstado: [null, [Validators.required]]
    });

    this.tipoDocumentoForm = this.fb.group({
      nombreDocumento: [null, [Validators.required]]
    });
    this.tipoSexoForm = this.fb.group({
      sexo: [null, [Validators.required]]
    })
    this.cargarEspecialidades();
    this.cargarEstadosCita();
    this.cargarEstadosCivil();
    this.cargarTiposDocumento();
    this.cargarTipoSexo();
  }

  registrarEspecialidad(){
    if (this.especialidadForm.invalid) return;
    const especialidadRequest: EspecialidadRequest = this.especialidadForm.value;
    this.especialidadService.registrar(especialidadRequest)
    .subscribe({
        next: () => {
          this.cargarEspecialidades();
        },
        error: (err) => {
          console.error(err);
          alert('Error al registrar médico');
        }
      });
  }
  registrarEstadoCita(){
    if (this.estadoCitaForm.invalid) return;
    const estadoCitaRequest: EstadoCitaRequest = this.estadoCitaForm.value;
    this.estadoCitaService.registrar(estadoCitaRequest)
    .subscribe({
        next: () => {
          this.cargarEstadosCita();
        },
        error: (err) => {
          console.error(err);
          alert('Error al registrar el estado Cita médico' );
        }
      });
  }
  registrarEstadoCivil(){
    if (this.estadoCivilForm.invalid) return;
    const estadoCivilRequest: EstadoCivilRequest = this.estadoCivilForm.value;
    this.estadoCivilService.agregar(estadoCivilRequest)
    .subscribe({
        next: () => {
          this.cargarEstadosCivil();
        },
        error: (err) => {
          console.error(err);
          alert('Error al registrar el estado civil ' );
        }
      });
  }
  registrarTipoDocumento(){
    if (this.tipoDocumentoForm.invalid) return;
    const tipoDocumentoRequest: TipoDocumentoRequest = this.tipoDocumentoForm.value;
    this.tipoDocumentoService.registrar(tipoDocumentoRequest)
    .subscribe({
        next: () => {
          this.cargarTiposDocumento();
        },
        error: (err) => {
          console.error(err);
          alert('Error al registrar el tipo de documento  ' );
        }
      });
  }
   registrarTipoSexo(){
    if (this.tipoSexoForm.invalid) return;
    const tipoDocumentoRequest: TipoSexoRequest = this.tipoSexoForm.value;
    this.tipoSexoService.registrar(tipoDocumentoRequest)
    .subscribe({
        next: () => {
          this.cargarTipoSexo();
        },
        error: (err) => {
          console.error(err);
          alert('Error al registrar el tipo de documento  ' );
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

  cargarEspecialidades(){
     this.especialidadService.listar().subscribe({
      next: (response) => {
        this.especialidadesMedico = response;
        this.crs.detectChanges();
      }
    });
  }
  cargarEstadosCivil(){
    this.estadoCivilService.listar().subscribe({
      next: (response) => {
        this.estadosCivil = response;
        this.crs.detectChanges();
      }
    });
  }
  cargarTiposDocumento(){
    this.tipoDocumentoService.listar().subscribe({
      next: (response) => {
        this.tiposDocumento = response;
        this.crs.detectChanges();
      }
    });
  }
  cargarTipoSexo(){
    this.tipoSexoService.listar().subscribe({
      next: (response) => {
        this.tiposSexo = response;
        this.crs.detectChanges();
      }
    });
  }

  abrirModalEliminarEspecialidad(id: number) {
    this.idEspecialidadSeleccionada = id;

    const modal = new (window as any).bootstrap.Modal(
      document.getElementById('modalEliminarEspecialidad')
    );
    modal.show();
  }
  abrirModalEditarEspecialidad(id: number) {
    this.especialidadService.buscarPorId(id)
      .subscribe(response => {

        this.idEspecialidadSeleccionada = response.idEspecialidad;
        this.nombreEspecialidadEditar = response.nombre;

        const modal = new (window as any).bootstrap.Modal(
          document.getElementById('modalEditarEspecialidad')
        );
        modal.show();
      });
  }
  confirmarEditarEspecialidad() {
    const request = {
      nombre: this.nombreEspecialidadEditar
    };
    this.especialidadService.actualizar(this.idEspecialidadSeleccionada, request)
      .subscribe(() => {

        this.cargarEspecialidades();

        const modal = (window as any).bootstrap.Modal.getInstance(
          document.getElementById('modalEditarEspecialidad')
        );
        modal.hide();
      });
  } 

  confirmarEliminarEspecialidad() {
    this.especialidadService.eliminar(this.idEspecialidadSeleccionada)
      .subscribe(() => {
        this.cargarEspecialidades();

        const modal = (window as any).bootstrap.Modal.getInstance(
          document.getElementById('modalEliminarEspecialidad')
        );
        modal.hide();
      });
  }

  confirmarEliminarEstadoCita() {
  this.estadoCitaService.eliminar(this.idEstadoCitaSeleccionado)
    .subscribe(() => {
      this.cargarEstadosCita();
      (window as any).bootstrap.Modal
        .getInstance(document.getElementById('modalEliminarEstadoCita'))
        .hide();
    });
  }
  abrirModalEliminarEstadoCita(id: number) {
    this.idEstadoCitaSeleccionado = id;

    const modal = new (window as any).bootstrap.Modal(
      document.getElementById('modalEliminarEstadoCita')
    );
    modal.show();
  }

  abrirModalEditarEstadoCita(id: number) {
    
    this.estadoCitaService.buscarPorId(id)
      .subscribe(response => {

        this.idEstadoCitaSeleccionado = response.idEstadoCita;
        this.nombreEstadoCitaEditar = response.nombreEstado;

        const modal = new (window as any).bootstrap.Modal(
          document.getElementById('modalEditarEstadoCita')
        );
        modal.show();
      });
  }

  confirmarEditarEstadoCita() {
    const request = {
      nombreEstado: this.nombreEstadoCitaEditar
    };

    this.estadoCitaService.actualizar(this.idEstadoCitaSeleccionado, request)
      .subscribe(() => {
        this.cargarEstadosCita();
        (window as any).bootstrap.Modal
          .getInstance(document.getElementById('modalEditarEstadoCita'))
          .hide();
      });
  }

  abrirModalEliminarEstadoCivil(id: number) {
   
    this.idEstadoCivilSeleccionado = id;
    
    new (window as any).bootstrap.Modal(
      document.getElementById('modalEliminarEstadoCivil')
    ).show();
}

confirmarEliminarEstadoCivil() {
  this.estadoCivilService.eliminar(this.idEstadoCivilSeleccionado)
    .subscribe(() => {
      this.cargarEstadosCivil();
      (window as any).bootstrap.Modal
        .getInstance(document.getElementById('modalEliminarEstadoCivil'))
        .hide();
    });
}

abrirModalEditarEstadoCivil(id: number) {
  console.log(id)
  this.estadoCivilService.buscarPorId(id)
    .subscribe(response => {

      this.idEstadoCivilSeleccionado = response.idEstadoCivil;
      this.nombreEstadoCivilEditar = response.nombreEstado;

      new (window as any).bootstrap.Modal(
        document.getElementById('modalEditarEstadoCivil')
      ).show();
    });
}

confirmarEditarEstadoCivil() {
  const request = {
    nombreEstado: this.nombreEstadoCivilEditar
  };

  this.estadoCivilService.actualizar(this.idEstadoCivilSeleccionado, request)
    .subscribe(() => {
      this.cargarEstadosCivil();
      (window as any).bootstrap.Modal
        .getInstance(document.getElementById('modalEditarEstadoCivil'))
        .hide();
    });
  }

  abrirModalEliminarTipoDocumento(id: number) {
  this.idTipoDocumentoSeleccionado = id;

  new (window as any).bootstrap.Modal(
    document.getElementById('modalEliminarTipoDocumento')
  ).show();
}

confirmarEliminarTipoDocumento() {
  this.tipoDocumentoService.eliminar(this.idTipoDocumentoSeleccionado)
    .subscribe(() => {
      this.cargarTiposDocumento();
      (window as any).bootstrap.Modal
        .getInstance(document.getElementById('modalEliminarTipoDocumento'))
        .hide();
    });
}

abrirModalEditarTipoDocumento(id: number) {
  this.tipoDocumentoService.buscarPorId(id)
    .subscribe(response => {

      this.idTipoDocumentoSeleccionado = response.idTipoDocumento;
      this.nombreTipoDocumentoEditar = response.nombreDocumento;

      new (window as any).bootstrap.Modal(
        document.getElementById('modalEditarTipoDocumento')
      ).show();
    });
}

confirmarEditarTipoDocumento() {
  const request = {
    nombreDocumento: this.nombreTipoDocumentoEditar
  };
  console.log(this.idTipoDocumentoSeleccionado, request)
  this.tipoDocumentoService.actualizar(this.idTipoDocumentoSeleccionado, request)
    .subscribe(() => {
      this.cargarTiposDocumento();
      (window as any).bootstrap.Modal
        .getInstance(document.getElementById('modalEditarTipoDocumento'))
        .hide();
    });
}
  abrirModalEliminarTipoSexo(id: number) {

    this.idTipoSexoSeleccionado = id;

    new (window as any).bootstrap.Modal(
      document.getElementById('modalEliminarTipoSexo')
    ).show();
  }
  confirmarEliminarTipoSexo() {
    this.tipoSexoService.eliminar(this.idTipoSexoSeleccionado)
      .subscribe(() => {

        this.cargarTipoSexo();

        (window as any).bootstrap.Modal
          .getInstance(document.getElementById('modalEliminarTipoSexo'))
          ?.hide();
      });
  } 
  abrirModalEditarTipoSexo(id: number) {

    this.idTipoSexoSeleccionado = id;

    this.tipoSexoService.buscarPorId(id)
      .subscribe(response => {

        this.nombreTipoSexo = response.sexo;

        new (window as any).bootstrap.Modal(
          document.getElementById('modalEditarTipoSexo')
        ).show();
    });
  }

  confirmarEditarTipoSexo() {

    const request = {
      sexo: this.nombreTipoSexo
    };

    this.tipoSexoService.actualizar(this.idTipoSexoSeleccionado, request)
      .subscribe(() => {

        this.cargarTipoSexo();

        (window as any).bootstrap.Modal
          .getInstance(document.getElementById('modalEditarTipoSexo'))
          ?.hide();
      });
  }
}
