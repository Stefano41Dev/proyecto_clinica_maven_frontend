import { Observable } from 'rxjs';
import { PageResponse } from '../../models/page-response';
import { PacienteResponse } from '../../models/paciente/paciente-response';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { CitaResponse } from '../../models/cita/cita-response';

@Injectable({
  providedIn: 'root',
})
export class Cita {
    private apiUrl = `${environment.apiUrl}/cita`;

    constructor(private http: HttpClient) {}

    listar(): Observable<PageResponse<CitaResponse>> {
        return this.http.get<PageResponse<CitaResponse>>(
            `${this.apiUrl}/listar`
        );
    }
    
    listarPaginado(pagina:number, tamPag:number): Observable<PageResponse<CitaResponse>> {
        return this.http.get<PageResponse<CitaResponse>>(
            `${this.apiUrl}/listar?pagina=${pagina}&tamPag=${tamPag}`
        );
    }
    
}