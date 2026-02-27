import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteRegistrar } from './paciente-registrar';

describe('PacienteRegistrar', () => {
  let component: PacienteRegistrar;
  let fixture: ComponentFixture<PacienteRegistrar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteRegistrar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacienteRegistrar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
