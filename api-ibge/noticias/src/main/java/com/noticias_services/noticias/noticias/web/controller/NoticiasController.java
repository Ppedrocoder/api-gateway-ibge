package com.noticias_services.noticias.noticias.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/noticias")
public class NoticiasController {

    @Autowired
    private RestTemplate restTemplate;

    private static final String IBGE_API = "https://servicodados.ibge.gov.br/api/v3/noticias";

    @GetMapping
    public ResponseEntity<Object> getNoticias(
            @RequestParam(defaultValue = "Brasil") String q,
            @RequestParam(defaultValue = "30") int qtd) {
        try {
            String url = IBGE_API + "?q=" + q + "&qtd=" + qtd;
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    Collections.singletonMap("erro", "Erro ao buscar notícias: " + e.getMessage())
            );
        }
    }

    @GetMapping("/search")
    public ResponseEntity<Object> searchNoticias(
            @RequestParam String termo,
            @RequestParam(defaultValue = "10") int qtd) {
        try {
            String url = IBGE_API + "?q=" + termo + "&qtd=" + qtd;
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    Collections.singletonMap("erro", "Erro na busca: " + e.getMessage())
            );
        }
    }
}