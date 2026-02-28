import { Observable } from 'rxjs';
import { PageResponse } from '../../models/page-response';
import { PacienteResponse } from '../../models/paciente/paciente-response';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { CitaResponse } from '../../models/cita/cita-response';
import { CitaRequest } from '../../models/cita/cita-request';
import { CitaDatosCompletosResponse } from '../../models/cita/cita-datos-completos-response';
import { CitaUpdateRequest } from '../../models/cita/cita-update-request';

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
    registrarCita(citaRequest: CitaRequest): Observable<CitaDatosCompletosResponse> {
        return this.http.post<CitaDatosCompletosResponse>(
            `${this.apiUrl}/registrar`, citaRequest
        );
    }

    buscarCita(idCita: number): Observable<CitaDatosCompletosResponse>{
        return this.http.get<CitaDatosCompletosResponse>(
            `${this.apiUrl}/buscar-completa/${idCita}`
        );
    }
    actualizarCita(idCita : number, citaUpdate: CitaUpdateRequest): Observable<CitaResponse>{
        return this.http.put<CitaResponse>(
          `${this.apiUrl}/actualizar/${idCita}`, citaUpdate
         );
    }
    buscarCitaPorCorreo(correo: string, pagina: number = 1, tamPag: number = 10): Observable<PageResponse<CitaResponse>> {
        return this.http.get<PageResponse<CitaResponse>>(
            `${this.apiUrl}/buscar-citas-correo/${correo}?pagina=${pagina}&tamPag=${tamPag}`
        );
    }
}