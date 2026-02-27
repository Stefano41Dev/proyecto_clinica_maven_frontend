import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteInformacion } from './paciente-informacion';

describe('PacienteInformacion', () => {
  let component: PacienteInformacion;
  let fixture: ComponentFixture<PacienteInformacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteInformacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacienteInformacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
