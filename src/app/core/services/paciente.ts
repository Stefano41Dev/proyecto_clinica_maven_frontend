import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { MedicoResponse } from '../../models/medico/medico-response';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageResponse } from '../../models/page-response';
import { PacienteResponse } from '../../models/paciente/paciente-response';
import { PacienteRequest } from '../../models/paciente/paciente-request';

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
  listarPaginado(pagina: number, tamPag: number): Observable<PageResponse<PacienteResponse>> {
    return this.http.get<PageResponse<PacienteResponse>>(
      `${this.apiUrl}/listar?pagina=${pagina}&tamPag=${tamPag}`
    );
  }
  buscarPorId(id: number): Observable<PacienteResponse> {
    return this.http.get<PacienteResponse>(`${this.apiUrl}/buscar/${id}`);
  }
  registrarPaciente(pacienteRequest: PacienteRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}/registrar`, pacienteRequest,{ responseType: 'text' });
  }
  actualizar(id: number, pacienteRequest: PacienteRequest): Observable<PacienteResponse>{
    return this.http.put<PacienteResponse>(`${this.apiUrl}/actualizar/${id}`, pacienteRequest);

  }
}
