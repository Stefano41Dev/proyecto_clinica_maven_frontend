import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { MedicoResponse } from '../../models/medico/medico-response';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageResponse } from '../../models/page-response';
import { PacienteResponse } from '../../models/paciente/paciente-response';

@Injectable({
  providedIn: 'root',
})
export class Paciente {
  private apiUrl = `${environment.apiUrl}/paciente`;

  constructor(private http: HttpClient) {}

  listar(): Observable<PageResponse<PacienteResponse>> {
  return this.http.get<PageResponse<PacienteResponse>>(
    `${this.apiUrl}/listar`
  );
}
}
