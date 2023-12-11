package br.edu.fatec.lins.apiVitrine.Controlador;

import br.edu.fatec.lins.apiVitrine.dto.SecaoDTO;
import br.edu.fatec.lins.apiVitrine.modelo.loja.Produto;
import br.edu.fatec.lins.apiVitrine.modelo.loja.Secao;
import br.edu.fatec.lins.apiVitrine.repositorio.ProdutoRepositorio;
import br.edu.fatec.lins.apiVitrine.repositorio.SecaoRepositorio;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecaoController {
    @Autowired
    SecaoRepositorio repositorio;
    
    @Autowired
    ProdutoRepositorio produtoRepositorio;

    @PostMapping("/secoes")
    public ResponseEntity<Secao> salvarSecao(@RequestBody SecaoDTO secaoDTO){
        Secao secao = new Secao();
        List<Produto> produtos = Collections.emptyList();

        BeanUtils.copyProperties(secaoDTO, secao);

        if (secaoDTO.listaProdutos() != null) {
            produtos = produtoRepositorio.findAllById(secaoDTO.listaProdutos());
            secao.setListaProdutos(produtos);
        }
        
        Secao secaoSaved = repositorio.save(secao);

        for (Produto produto : produtos) {
            produto.setSecao(secaoSaved);
            produtoRepositorio.save(produto);
        }
        
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(secaoSaved);
    }

    @GetMapping("/secoes")
    public ResponseEntity<List<Secao>> getAllSecao() {
        return ResponseEntity.status(HttpStatus.OK).body(repositorio.findAll());
    }

    @GetMapping("/secoes/{id}")
    public ResponseEntity<Secao> getSecaoByID(@PathVariable(value = "id") UUID id) {
        Optional<Secao> secao = repositorio.findById(id);

        if (secao.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(secao.get());
    }
    
    @PutMapping("/secoes/{id}")
    public ResponseEntity<Object> updateSecao(@PathVariable(value = "id") UUID id, @RequestBody SecaoDTO secaoDTO) {
        Optional<Secao> secao = repositorio.findById(id);
        List<Produto> produtos = Collections.emptyList();

        if (secaoDTO.nome() != null && !secaoDTO.nome().isEmpty()) {
            BeanUtils.copyProperties(secaoDTO, secao.get());
        }
        
        if (secaoDTO.listaProdutos() != null) {
            produtos = produtoRepositorio.findAllById(secaoDTO.listaProdutos());
            secao.get().setListaProdutos(produtos);
        }

        Secao secaoSaved = repositorio.save(secao.get());

        for (Produto produto : produtos) {
            produto.setSecao(secaoSaved);
            produtoRepositorio.save(produto);
        }
        
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(secaoSaved);
    }
    
    @DeleteMapping("secoes/{id}")
    public ResponseEntity<Object> deleteSecao(@PathVariable(value = "id") UUID id) {
        Optional<Secao> secao = repositorio.findById(id);
        List<Produto> produtos = Collections.emptyList();

        if (secao.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Seção não encontrada");
        }

        produtos = secao.get().getListaProdutos();
        
        for (Produto produto : produtos) {
            produto.setSecao(null);
            produtoRepositorio.save(produto);
        }

        repositorio.delete(secao.get());

        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Secao deletada");
    }
}
