urlProdutos = 'http://localhost:8080/produtos';
urlSecoes = 'http://localhost:8080/secoes';

$(document).ready(function () {
    $.get(urlProdutos, function (jsonProdutos, status) {
        $.get(urlSecoes, function (jsonSecao, status) {
            var html = '<div class="row center">';
			html += '<div class="col s6 l3 center">Nome</div>';
			html += '<div class="col s6 l3 center">Produtos</div>';
			html += '<div class="col s6 l3 center">Editar</div>';
			html += '<div class="col s6 l3 center">Deletar</div>';
            html += '</div>';
			for (var i = 0; i < jsonSecao.length; i++) {
                html += '<div class="row">';
                html += '<div class="col s6 l3 center">' + jsonSecao[i].nome + '</div>';

                let produtoNames = '';
                for (var y = 0; y < jsonProdutos.length; y++) {
                    
                    for (var x = 0; x < jsonSecao[i]?.listaProdutos.length; x++) {
                        
                        if (jsonSecao[i]?.listaProdutos[x].id == jsonProdutos[y].id) {

                            if (jsonSecao[i]?.listaProdutos.length > 1) {
                                
                                if (jsonSecao[i]?.listaProdutos.length == x + 1) {
                                    produtoNames += jsonProdutos[y].nome;
                                }
                                else {
                                    produtoNames += `${jsonProdutos[y].nome}, `;
                                }
                            }
                            else {
                                produtoNames = jsonProdutos[y].nome;
                            }
						}
					}
                }
                
				html += '<div class="col s6 l3 center">' + produtoNames + '</div>';
				html += '<div class="col s6 l3 center">';
				html += '<i class="Small material-icons clique blue-text text-darken-2 cursorPointer selectNone" onclick="editarSecao(\'' + jsonSecao[i].id + '\')">edit</i>';
				html += '</div>';
				html += '<div class="col s6 l3 center">';
				html += '<i class="Small material-icons clique red-text text-darken-3 cursorPointer selectNone" onclick="excluirSecao(\'' + jsonSecao[i].id + '\')">delete_forever</i>';
				html += '</div>';
				html += '</div>';
			}
			$('#listaSecao').html(html);
        });
        selectProduto([], urlProdutos);
	});
});


