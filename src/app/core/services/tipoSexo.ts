import { Injectable } from "@angular/core";
import { environment } from "../../../environment/environment";
import { HttpClient } from "@angular/common/http";
import { TipoSexoResponse } from "../../models/sexo/tipo-sexo-response";
import { Observable } from "rxjs";
import { TipoSexoRequest } from "../../models/sexo/tipo-sexo-request";

@Injectable({
  providedIn: 'root'
})
export class Sexo{
    private apiUrl = `${environment.apiUrl}/tipo-sexo`;

    constructor(private http: HttpClient) {}

    listar(): Observable<TipoSexoResponse[]> {
        return this.http.get<TipoSexoResponse[]>(
            `${this.apiUrl}/listado`
        );
    }
    registrar(tipoSexoRequest: TipoSexoRequest): Observable<TipoSexoResponse> {
            return this.http.post<TipoSexoResponse>(
                `${this.apiUrl}/registrar`,tipoSexoRequest
            );
    }
    eliminar(idTipoSexo: number): Observable<string>{
        return this.http.delete(
        `${this.apiUrl}/eliminar/${idTipoSexo}`,
        { responseType: 'text'}
        );
    }
    buscarPorId(idTipoSexo: number): Observable<TipoSexoResponse>{
        return this.http.get<TipoSexoResponse>(
                           `${this.apiUrl}/buscar/${idTipoSexo}`
        );
    }
    actualizar(idTipoSexo: number, tipoSexoRequest: TipoSexoRequest): Observable<TipoSexoResponse>{
        return this.http.put<TipoSexoResponse>(
                                `${this.apiUrl}/actualizar/${idTipoSexo}`, tipoSexoRequest
                );
    }
}