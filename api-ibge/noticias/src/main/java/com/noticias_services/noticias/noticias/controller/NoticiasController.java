package com.noticias_services.noticias.noticias.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.*;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*")
public class NoticiasController {

    @Autowired
    private RestTemplate restTemplate;

    private static final String IBGE_API_NOTICIAS = "https://servicodados.ibge.gov.br/api/v3/noticias";

    @GetMapping("noticias")
    public ResponseEntity<Object> getNoticias(
            @RequestParam(defaultValue = "Brasil") String q,
            @RequestParam(defaultValue = "10") int limit) {
        try {
            String url = IBGE_API_NOTICIAS + "?q=" + q + "&limit=" + limit;
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    Collections.singletonMap("erro", "Erro ao buscar notícias: " + e.getMessage())
            );
        }
    }

    @GetMapping("noticias/estado/{uf}")
    public ResponseEntity<Object> getNoticiasPorEstado(@PathVariable String uf) {
        try {
            String url = IBGE_API_NOTICIAS + "?q=" + uf + "&limit=20";
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    Collections.singletonMap("erro", "Erro ao buscar notícias por estado: " + e.getMessage())
            );
        }
    }

    @GetMapping("noticias/search")
    public ResponseEntity<Object> searchNoticias(@RequestParam String termo, @RequestParam(defaultValue = "10") int limit) {
        try {
            String url = IBGE_API_NOTICIAS + "?q=" + termo + "&limit=" + limit;
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    Collections.singletonMap("erro", "Erro na busca: " + e.getMessage())
            );
        }
    }
}

