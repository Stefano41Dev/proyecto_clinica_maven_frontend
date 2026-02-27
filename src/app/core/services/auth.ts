import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../../models/login/login-request';
import { LoginResponse } from '../../models/login/login-response';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = `${environment.apiUrl}/auth`

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data);
  }
}
