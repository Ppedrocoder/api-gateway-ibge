package com.noticias_services.noticias.noticias.web.dto;

import java.util.List;

public class NoticiasResponseDTO {
    
    private List<ItemNoticiaDTO> itens;

    public List<ItemNoticiaDTO> getItens(){
        return itens;
    }

    public void setItems(List<ItemNoticiaDTO> itens) {
        this.itens = itens;
    }
}
