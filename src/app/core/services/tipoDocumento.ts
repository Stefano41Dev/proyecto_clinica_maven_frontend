import { Injectable } from "@angular/core";
import { environment } from "../../../environment/environment";
import { HttpClient } from "@angular/common/http";
import { TipoDocumentoResponse } from "../../models/tipo-documento/tipo-documento-response";
import { Observable } from "rxjs";

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
}