import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment/environment";
import { Observable } from "rxjs";
import { EspecialidadResponse } from "../../models/especialidad/especialidad-response";

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
}