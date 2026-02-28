import { ChangeDetectorRef, Component } from '@angular/core';
import { CitaUpdateRequest } from '../../../models/cita/cita-update-request';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cita } from '../../../core/services/cita';
import { ActivatedRoute } from '@angular/router';
import { CitaDatosCompletosResponse } from '../../../models/cita/cita-datos-completos-response';
import { Navbar } from "../../../shared/components/navbar/navbar";
import { EstadoCita } from '../../../core/services/estadoCita';
import { EstadoCitaResponse } from '../../../models/estado-cita/estado-cita-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cita-actualizar',
  imports: [Navbar, CommonModule,ReactiveFormsModule],
  templateUrl: './cita-actualizar.html',
  styleUrl: './cita-actualizar.css',
})
export class CitaActualizar {
  cita!: CitaDatosCompletosResponse;
  citaForm!: FormGroup;
  idCita!: number;
  estadosCita: EstadoCitaResponse[] = [];
  estadoForm!: FormGroup;
  idCitaSeleccionada!: number;

  constructor(
    private route: ActivatedRoute,
    private citaService: Cita,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private estadoCitaService: EstadoCita
  ) {}

  ngOnInit(): void {
    this.idCita = Number(this.route.snapshot.paramMap.get('id'));
    this.inicializarFormulario();
    this.buscarCita(this.idCita);
    this.inicializarFormularioEstado();
  }

  inicializarFormulario() {
    this.citaForm = this.fb.group({
      idMedico: ['', Validators.required],
      fechaProgramada: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }
   cargarEstadosCita(){
    this.estadoCitaService.listar().subscribe({
      next: (response) => {
        this.estadosCita = response;
        console.log(this.estadosCita)
        this.cdr.detectChanges();
      }
    })
  }
  buscarCita(idCita: number) {
    this.citaService.buscarCita(idCita)
      .subscribe(data => {
        this.cita = data;

        // Cargar valores editables al form
        this.citaForm.patchValue({
          idMedico: data.medicoResponse.idMedico,
          fechaProgramada: data.fechaProgramada,
          hora: data.hora
        });

        this.cdr.detectChanges();
      });
  }
  inicializarFormularioEstado() {
    this.estadoForm = this.fb.group({
      idEstadoCita: ['', Validators.required]
    });
  }
  abrirModalCambiarEstado(idCita: number) {
    this.idCitaSeleccionada = idCita;
    this.cargarEstadosCita();
    this.estadoForm.reset();

    new (window as any).bootstrap.Modal(
      document.getElementById('modalCambiarEstado')
    ).show();
  }

  actualizarEstado() {
    if (this.estadoForm.invalid) return;

    const request = {
      idCita: this.idCitaSeleccionada,
      idEstadoCita: this.estadoForm.value.idEstadoCita
    };

    this.citaService.actualizarEstadoCita(request)
      .subscribe({
        next: () => {

          
          const modal = (window as any).bootstrap.Modal.getInstance(
            document.getElementById('modalCambiarEstado')
          );
          modal.hide();

        
          this.buscarCita(this.idCitaSeleccionada);
        },
        error: (err) => {
          console.error("Error al actualizar estado:", err);
          alert("Error al actualizar el estado.");
        }
      });
  }
  actualizar() {
    if (this.citaForm.invalid) return;

     const formValue = this.citaForm.value;
    
    const citaRequest: CitaUpdateRequest = {
          ...formValue,
          hora: formValue.hora && formValue.hora.length === 5
            ? formValue.hora + ':00'
            : formValue.hora
        };

    this.citaService.actualizarCita(this.idCita, citaRequest)
      .subscribe({
      next: () => {
        
        this.retroceder();
      },
      error: (err) => {
        console.error("Error al actualizar:", err);

        if (err.status === 400) {
          alert("Datos inválidos.");
        } else if (err.status === 404) {
          alert("La cita no existe.");
        } else if (err.status === 409) {
          alert("Conflicto de horario con otro médico.");
        } else {
          alert("Ocurrió un error inesperado.");
        }
      }
    });
  }

  retroceder(){
    window.history.back();
  }
}
