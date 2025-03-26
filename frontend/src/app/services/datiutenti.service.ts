import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatiUtente } from '../models/utentedati.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DatiutentiService {
  private apiUrl = 'http://localhost:8080/api/datiUtente';
  constructor(private http: HttpClient, private authService: AuthService) {}

  // Metodo per creare l'header con il token preso dal AuthService
  private createAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Usa getToken dal servizio AuthService
    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    }
    return new HttpHeaders();
  }

  // Ottieni i dati utente tramite l'ID
  getDatiUtente(utenteId: number): Observable<DatiUtente> {
    const headers = this.createAuthHeaders(); // Crea gli header con il token
    return this.http.get<DatiUtente>(`${this.apiUrl}/utente/${utenteId}`, {
      headers,
    });
  }

  // Aggiorna i dati utente
  aggiornaDatiUtente(
    nuovoPeso: number,
    nuovaAltezza: number
  ): Observable<DatiUtente> {
    const utenteId = this.authService.getIdUser(); // Ottieni l'ID dell'utente loggato
    const datiUtente: DatiUtente = {
      peso: nuovoPeso,
      altezza: nuovaAltezza,
      ibm: this.calcolaIbm(nuovoPeso, nuovaAltezza),
    };

    const headers = this.createAuthHeaders(); // Crea gli header con il token
    return this.http.put<DatiUtente>(
      `${this.apiUrl}/aggiorna/${utenteId}`,
      datiUtente,
      { headers }
    );
  }

  // Calcola l'IMC (Indice di Massa Corporea)
  private calcolaIbm(peso: number, altezza: number): number {
    if (altezza > 0) {
      return peso / (altezza * altezza);
    } else {
      return 0;
    }
  }

  saveDatiUtente(datiUtente: DatiUtente): Observable<DatiUtente> {
    const headers = this.createAuthHeaders();
    return this.http.post<DatiUtente>(`${this.apiUrl}`, datiUtente, {
      headers,
    });
  }
}
