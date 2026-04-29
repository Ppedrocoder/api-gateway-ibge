package com.localidades_services.localidades.localidades.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import lombok.RequiredArgsConstructor;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LocalidadesService {
    private final RestTemplate restTemplate;

    @Value("${ibge.api.base-url}")
    private String baseUrl;

    public List<Object> listarEstados() {
        String url = baseUrl + "/estados?orderBy=nome";
        Object[] response = restTemplate.getForObject(url, Object[].class);
        return Arrays.asList(response);
    }

    public List<Object> listarMunicipiosPorUf(String uf) {
        String url = baseUrl + "/estados/" + uf + "/municipios";
        Object[] response = restTemplate.getForObject(url, Object[].class);
        return Arrays.asList(response);
    }

}
