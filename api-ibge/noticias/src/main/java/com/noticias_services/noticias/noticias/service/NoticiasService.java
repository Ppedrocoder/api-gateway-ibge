package com.noticias_services.noticias.noticias.service;

import java.time.Duration;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.noticias_services.noticias.noticias.web.dto.NoticiasResponseDTO;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import reactor.core.publisher.Mono;

@Service
public class NoticiasService {

    private final WebClient webClient;

    public NoticiasService(WebClient webClient) {
        this.webClient = webClient;
    }

    @Cacheable("noticias")
    @CircuitBreaker(name="ibgeNoticias", fallbackMethod="fallbackNoticias")
    public Mono<NoticiasResponseDTO> buscarNoticias() {
        return webClient.get()
                .uri("/noticias/?qtd=10")
                .retrieve()
                .bodyToMono(NoticiasResponseDTO.class)
                .timeout(Duration.ofSeconds(5))
                .onErrorResume(ex -> Mono.error(
                        new RuntimeException("Erro ao consumir API do IBGE", ex)
                ));
    }

    public Mono<NoticiasResponseDTO> fallbackNoticias(Exception ex) {
    return Mono.just(new NoticiasResponseDTO());
}
}
