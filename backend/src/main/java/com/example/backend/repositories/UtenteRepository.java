package com.example.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.models.Utente;

public interface UtenteRepository extends JpaRepository<Utente, Long> {
    
}
