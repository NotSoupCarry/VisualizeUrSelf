import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admin'; // URL del backend

  constructor(private http: HttpClient, private authService: AuthService) {}


  /** Crea l'intestazione di autorizzazione con il Bearer Token */
  private createAuthorizationHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Ottieni il token dal servizio di autenticazione
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
