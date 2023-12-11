package br.edu.fatec.lins.apiVitrine.dto;

import java.util.List;
import java.util.UUID;

import br.edu.fatec.lins.apiVitrine.modelo.loja.Produto;

public record SecaoDTO (String nome, List<UUID> listaProdutos){
}
