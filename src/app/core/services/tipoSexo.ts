import { Injectable } from "@angular/core";
import { environment } from "../../../environment/environment";
import { HttpClient } from "@angular/common/http";
import { TipoSexoResponse } from "../../models/sexo/tipo-sexo-response";
import { Observable } from "rxjs";

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
}