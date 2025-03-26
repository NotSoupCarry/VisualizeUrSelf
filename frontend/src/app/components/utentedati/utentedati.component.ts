import { Component, OnInit } from '@angular/core';
import { DatiutentiService } from '../../services/datiutenti.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatiUtente } from '../../models/utentedati.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-utentedati',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './utentedati.component.html',
  styleUrl: './utentedati.component.css',
})
export class UtentedatiComponent implements OnInit {
  // Dati utente (saranno gestiti dinamicamente)
  datiUtente: DatiUtente | null = null;

  // Variabili per l'aggiornamento dei dati
  nuovoPeso: number = 0;
  nuovaAltezza: number = 0;

  newDatiUtente: DatiUtente = {
    peso: 0,
    altezza: 0,
    ibm: 0,
  };
  constructor(
    private datiUtenti: DatiutentiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.getDatiUtente();
  }

  getDatiUtente(): void {
    const utenteId = 1;
    this.datiUtenti.getDatiUtente(utenteId).subscribe(
      (dati: DatiUtente) => {
        this.datiUtente = dati;
      },
      (error) => {
        console.error('Errore nel recupero dei dati utente', error);
      }
    );
  }

  private calcolaIbm(peso: number, altezza: number): number {
    if (altezza > 0) {
      return peso / (altezza * altezza);
    } else {
      return 0;
    }
  }

  updateUserData() {
    // Imposta i dati aggiornati
    this.newDatiUtente.peso = this.nuovoPeso;
    this.newDatiUtente.altezza = this.nuovaAltezza;
    this.newDatiUtente.ibm = this.calcolaIbm(this.nuovoPeso, this.nuovaAltezza);

    // Invia i dati al servizio per il salvataggio
    this.datiUtenti.saveDatiUtente(this.newDatiUtente).subscribe(
      (response) => {
        console.log('Dati utente salvati', response);
        this.datiUtente = response; // Aggiorna i dati dopo il salvataggio
      },
      (error) => {
        console.error('Errore nel salvataggio dei dati utente', error);
      }
    );
  }

  inserisciDatiUtente() {
    const utenteId = this.authService.getIdUser(); // Get user ID directly from AuthService
    if (!utenteId) {
      console.error('ID utente non trovato!');
      return;
    }
    const nuovoDatiUtente: DatiUtente = {
      peso: this.nuovoPeso,
      altezza: this.nuovaAltezza,
      ibm: this.calcolaIbm(this.nuovoPeso, this.nuovaAltezza),
      idUtente: utenteId, // Associa l'ID dell'utente ai nuovi dati
    };

    // Invia al servizio per il salvataggio
    this.datiUtenti.saveDatiUtente(nuovoDatiUtente).subscribe(
      (response) => {
        console.log('Dati utente creati con successo', response);
        this.datiUtente = response; // Aggiorna i dati utente
      },
      (error) => {
        console.error('Errore nel salvataggio dei dati utente', error);
      }
    );
  }
}
