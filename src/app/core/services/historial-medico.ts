import { Injectable } from "@angular/core";
import { environment } from "../../../environment/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HistorialMedicoResponse } from "../../models/historial-medico/historial-medico-response";
import { PageResponse } from "../../models/page-response";

@Injectable({
    providedIn: 'root'
})
export class HistorialMedico {
    private apiUrl = `${environment.apiUrl}/historial-medico`;

    constructor(private http: HttpClient) {}

    listaHistorialMedicoPersonaCorreo(correo: string, page: number = 1, tamPag: number = 10): Observable<PageResponse<HistorialMedicoResponse>> {
            return this.http.get<PageResponse<HistorialMedicoResponse>>(
                `${this.apiUrl}/buscar-historial-paciente/${correo}?pagina=${page}&tamPag=${tamPag}`
            );
    }


}