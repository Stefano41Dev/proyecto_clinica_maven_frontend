import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { MedicoResponse } from '../../models/medico/medico-response';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageResponse } from '../../models/page-response';
import { MedicoRequest } from '../../models/medico/medio-request';

@Injectable({
  providedIn: 'root',
})
export class Medico {
  private apiUrl = `${environment.apiUrl}/medico`;

  constructor(private http: HttpClient) {}

  listar(): Observable<PageResponse<MedicoResponse>> {
    return this.http.get<PageResponse<MedicoResponse>>(
      `${this.apiUrl}/listar`
    );
  }
  listarPaginado(pagina:number, tamPag:number): Observable<PageResponse<MedicoResponse>> {
    return this.http.get<PageResponse<MedicoResponse>>(
      `${this.apiUrl}/listar?pagina=${pagina}&tamPag=${tamPag}`
    );
  }
  buscarPorId(idMedico:number):Observable<MedicoResponse>{
    return this.http.get<MedicoResponse>(
      `${this.apiUrl}/buscar/${idMedico}`
    );
  }
 registrarMedico(medicoRequest: MedicoRequest): Observable<string> {
  return this.http.post(
    `${this.apiUrl}/registrar`,
    medicoRequest,
    { responseType: 'text' }
  );
}
}
