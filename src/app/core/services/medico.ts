import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { MedicoResponse } from '../../models/medico/medico-response';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Medico {
  private apiUrl = `${environment.apiUrl}/medico`;

  constructor(private http: HttpClient) {}

  listar(): Observable<MedicoResponse[]> {
      return this.http.get<MedicoResponse[]>(`${this.apiUrl}/listar`);
  }
}
