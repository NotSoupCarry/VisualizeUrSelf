package com.example.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.models.PastiUtente;

public interface PastiUtenteRepository extends JpaRepository<PastiUtente, Long> {
    List<PastiUtente> findByUtenteId(Long utenteId);
}
