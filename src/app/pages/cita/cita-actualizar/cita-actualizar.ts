import { ChangeDetectorRef, Component } from '@angular/core';
import { CitaUpdateRequest } from '../../../models/cita/cita-update-request';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cita } from '../../../core/services/cita';
import { ActivatedRoute } from '@angular/router';
import { CitaDatosCompletosResponse } from '../../../models/cita/cita-datos-completos-response';
import { Navbar } from "../../../shared/components/navbar/navbar";

@Component({
  selector: 'app-cita-actualizar',
  imports: [Navbar,ReactiveFormsModule],
  templateUrl: './cita-actualizar.html',
  styleUrl: './cita-actualizar.css',
})
export class CitaActualizar {
  cita!: CitaDatosCompletosResponse;
  citaForm!: FormGroup;
  idCita!: number;

  constructor(
    private route: ActivatedRoute,
    private citaService: Cita,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.idCita = Number(this.route.snapshot.paramMap.get('id'));
    this.inicializarFormulario();
    this.buscarCita(this.idCita);
  }

  inicializarFormulario() {
    this.citaForm = this.fb.group({
      idMedico: ['', Validators.required],
      fechaProgramada: ['', Validators.required],
      hora: ['', Validators.required]
    });
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
