import { Injectable } from "@angular/core";
import { environment } from "../../../environment/environment";
import { HttpClient } from "@angular/common/http";
import { TipoDocumentoResponse } from "../../models/tipo-documento/tipo-documento-response";
import { Observable } from "rxjs";
import { TipoDocumentoRequest } from "../../models/tipo-documento/tipo-documento-request";

@Injectable({
  providedIn: 'root',
})
export class TipoDocumento{
    private apiUrl = `${environment.apiUrl}/tipo-documento`;

    constructor(private http: HttpClient) {}

    listar(): Observable<TipoDocumentoResponse[]> {
        return this.http.get<TipoDocumentoResponse[]>(
            `${this.apiUrl}/listado`
        );
    }
    registrar(TipoDocumentoRequest: TipoDocumentoRequest): Observable<TipoDocumentoResponse[]> {
        return this.http.post<TipoDocumentoResponse[]>(
            `${this.apiUrl}/registrar`,TipoDocumentoRequest
        );
    }
    buscarPorId(idTipoDocumento: number): Observable<TipoDocumentoResponse>{
        return this.http.get<TipoDocumentoResponse>(
                   `${this.apiUrl}/buscar/${idTipoDocumento}`
               );
    }
    eliminar(idTipoDocumento: number): Observable<string>{
        return this.http.delete(
        `${this.apiUrl}/eliminar/${idTipoDocumento}`,
        { responseType: 'text'}
        );
    }
    actualizar(idTipoDocumento: number, tipoDocumentoRequest: TipoDocumentoRequest): Observable<TipoDocumentoResponse>{
        return this.http.put<TipoDocumentoResponse>(
                        `${this.apiUrl}/actualizar/${idTipoDocumento}`, tipoDocumentoRequest
        );
    }
}