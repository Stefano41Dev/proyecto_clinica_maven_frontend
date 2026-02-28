import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Medico } from '../../../core/services/medico';
import { MedicoResponse } from '../../../models/medico/medico-response';
import { EspecialidadResponse } from '../../../models/especialidad/especialidad-response';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Navbar } from "../../../shared/components/navbar/navbar";
import { CommonModule } from '@angular/common';
import { Especialidad } from '../../../core/services/especialidad';

@Component({
  selector: 'app-medico-actualizar',
  imports: [Navbar, ReactiveFormsModule, CommonModule],
  templateUrl: './medico-actualizar.html',
  styleUrl: './medico-actualizar.css',
})
export class MedicoActualizar {
  medicoForm!: FormGroup;
  especialidades: EspecialidadResponse[] = [];
  idMedico!: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private medicoService: Medico,
    private especialidadService: Especialidad,
     private crs: ChangeDetectorRef
  ){}
  medico!: MedicoResponse;

  ngOnInit(): void {
    this.inicializarFormulario();

    this.idMedico = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarEspecialidades();
    this.buscarMedico(this.idMedico);
    
  }

  inicializarFormulario(): void {
    this.medicoForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      idEspecialidad: ['', Validators.required],
      numeroColegiatura: ['', Validators.required],
      telefono: [''],
      correo: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }

  buscarMedico(id: number): void {
    this.medicoService.buscarPorId(id)
      .subscribe(data => {
        this.medico = data;

        // Cargar datos en el formulario
        this.medicoForm.patchValue({
          nombres: data.nombres,
          apellidos: data.apellidos,
          idEspecialidad: data.especialidadResponse.idEspecialidad,
          numeroColegiatura: data.numeroColegiatura,
          telefono: data.telefono,
          correo: data.correo
        });

        this.cdr.detectChanges();
      });
  }

  actualizar(): void {
    if (this.medicoForm.invalid) return;

    const medicoRequest = this.medicoForm.value;

    this.medicoService.actualizar(this.idMedico, medicoRequest)
      .subscribe(() => {
        this.router.navigate(['/medicos']);
    });
  }

  cargarEspecialidades(){
     this.especialidadService.listar().subscribe({
      next: (response) => {
        this.especialidades = response;
        console.log(response)
        this.cdr.detectChanges();
      }
    });
  }
}
