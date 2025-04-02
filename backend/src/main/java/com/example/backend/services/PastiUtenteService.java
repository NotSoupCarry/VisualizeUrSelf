package com.example.backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.models.PastiUtente;
import com.example.backend.repositories.PastiUtenteRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PastiUtenteService {
    private final PastiUtenteRepository pastiUtenteRepository;

    public List<PastiUtente> getPastiUtenteByUtenteId(Long utenteId){
        return pastiUtenteRepository.findByUtenteId(utenteId);
    }
}
