package com.noticias_services.noticias.noticias.service;

import java.time.Duration;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;


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
    public Mono<Object> buscarNoticias() {
        return webClient.get()
                .uri("/noticias/?qtd=10")
                .retrieve()
                .bodyToMono(Object.class)
                .timeout(Duration.ofSeconds(2))
                .onErrorResume(ex -> Mono.error(
                        new RuntimeException("Erro ao consumir API do IBGE", ex)
                ));
    }

    public Mono<Object> fallbackNoticias(Exception ex) {
    return Mono.just(new Object());
}
}
