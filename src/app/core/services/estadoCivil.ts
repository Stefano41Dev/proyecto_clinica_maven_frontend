import { Injectable } from "@angular/core";
import { environment } from "../../../environment/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { EstadoCitaResponse } from "../../models/estado-cita/estado-cita-response";
import { EstadoCivilResponse } from "../../models/estado-civil/estado-civil-response";
import { EstadoCivilRequest } from "../../models/estado-civil/estado-civil-request";

@Injectable({
    providedIn: 'root'
})
export class EstadoCivil{
    private apiUrl = `${environment.apiUrl}/estado-civil`;

    constructor(private http: HttpClient) {}

    listar(): Observable<EstadoCivilResponse[]> {
        return this.http.get<EstadoCivilResponse[]>(
            `${this.apiUrl}/listado`
        );
    }
    agregar(estadoCivilRequest: EstadoCivilRequest): Observable<EstadoCivilResponse[]> {
        return this.http.post<EstadoCivilResponse[]>(
            `${this.apiUrl}/registrar`, estadoCivilRequest
        );
    }
    
}