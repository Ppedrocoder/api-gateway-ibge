package com.localidades_services.localidades.localidades.config;

public class AppConfig {
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
