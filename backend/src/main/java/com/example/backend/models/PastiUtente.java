package com.example.backend.models;

import java.time.LocalDateTime;

import com.example.backend.enums.TipoPasto;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "pasti_utenti")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PastiUtente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private TipoPasto tipoPasto;

    @Column(nullable = false)
    private String descrizione;

    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dataPasto;

    @Column(nullable = false)
    private Integer calorie;

    @OneToOne
    @JoinColumn(name = "id_utente", referencedColumnName = "id", nullable = false)
    private Utente utente;
}
