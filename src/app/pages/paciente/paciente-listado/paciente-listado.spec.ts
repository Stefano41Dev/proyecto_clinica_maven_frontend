import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteListado } from './paciente-listado';

describe('PacienteListado', () => {
  let component: PacienteListado;
  let fixture: ComponentFixture<PacienteListado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteListado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacienteListado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
