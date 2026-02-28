import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment/environment";
import { Observable } from "rxjs";
import { EspecialidadResponse } from "../../models/especialidad/especialidad-response";
import { EspecialidadRequest } from "../../models/especialidad/especialidad-request";

@Injectable({
  providedIn: 'root',
})
export class Especialidad{
    private apiUrl = `${environment.apiUrl}/especialidad`;

    constructor(private http: HttpClient) {}

    listar(): Observable<EspecialidadResponse[]> {
        return this.http.get<EspecialidadResponse[]>(
        `${this.apiUrl}/listado`
        );
    }
    registrar(especialidadRequest: EspecialidadRequest): Observable<EspecialidadResponse>{
        return this.http.post<EspecialidadResponse>(
        `${this.apiUrl}/registrar`, especialidadRequest
        );
    }
    buscarPorId(idEspecialidad: number): Observable<EspecialidadResponse>{
        return this.http.get<EspecialidadResponse>(
        `${this.apiUrl}/buscar/${idEspecialidad}`
        );
    }
    actualizar(idEspecialidad: number, espcialidadRequest: EspecialidadRequest): Observable<EspecialidadResponse>{
        return this.http.put<EspecialidadResponse>(
        `${this.apiUrl}/actualizar/${idEspecialidad}`, espcialidadRequest
        );
    }
    eliminar(idEspecialidad: number): Observable<string>{
        return this.http.delete(
        `${this.apiUrl}/eliminar/${idEspecialidad}`,
        { responseType: 'text'}

        );
    }
}