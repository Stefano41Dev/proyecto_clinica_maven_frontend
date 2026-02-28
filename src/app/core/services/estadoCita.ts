import { Injectable } from "@angular/core";
import { environment } from "../../../environment/environment";
import { HttpClient } from "@angular/common/http";
import { EstadoCitaResponse } from "../../models/estado-cita/estado-cita-response";
import { Observable } from "rxjs";
import { EstadoCitaRequest } from "../../models/estado-cita/estado-cita-request";

@Injectable({
    providedIn: 'root'
})
export class EstadoCita{
    private apiUrl = `${environment.apiUrl}/estado-cita`;

    constructor(private http: HttpClient) {}

    listar(): Observable<EstadoCitaResponse[]> {
        return this.http.get<EstadoCitaResponse[]>(
            `${this.apiUrl}/listado`
        );
    }
    registrar(estadoCitaRequest: EstadoCitaRequest): Observable<EstadoCitaResponse[]> {
        return this.http.post<EstadoCitaResponse[]>(
            `${this.apiUrl}/guardar`, estadoCitaRequest
        );
    }
    
}