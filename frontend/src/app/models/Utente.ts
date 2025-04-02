import { Ruolo } from "../enums/Ruolo";

export interface Utente {
  id?: number | null;
  username?: string;
  password?: string;
  email?: string;
  ruolo?: Ruolo;  
}
