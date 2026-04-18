package com.localidades_services.localidades.localidades.controller;

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
