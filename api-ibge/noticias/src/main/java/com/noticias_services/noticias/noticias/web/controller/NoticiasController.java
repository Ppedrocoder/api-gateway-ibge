package com.noticias_services.noticias.noticias.web.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noticias_services.noticias.noticias.service.NoticiasService;
import com.noticias_services.noticias.noticias.web.dto.NoticiasResponseDTO;

import reactor.core.publisher.Mono;


@RestController
@RequestMapping("/api/noticias")
public class NoticiasController {

    private final NoticiasService noticiasService;

    public NoticiasController(NoticiasService noticiasService) {
        this.noticiasService = noticiasService;
    }

    @GetMapping
    public Mono<ResponseEntity<NoticiasResponseDTO>> listarNoticias() {
        return noticiasService.buscarNoticias().map(ResponseEntity::ok);
    }
    
}
