package com.localidades_services.localidades.localidades.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import lombok.RequiredArgsConstructor;
import com.localidades_services.localidades.localidades.service.LocalidadesService;
import java.util.List;

@RestController
@RequestMapping("/estados")
@RequiredArgsConstructor
public class LocalidadesController {

    private final LocalidadesService service;

    @GetMapping
    public ResponseEntity<List<Object>> listarEstados() {
        return ResponseEntity.ok(service.listarEstados());
    }

    @GetMapping("/{uf}/municipios")
    public ResponseEntity<List<Object>> listarMunicipios(@PathVariable String uf) {
        return ResponseEntity.ok(service.listarMunicipiosPorUf(uf));
    }
}
