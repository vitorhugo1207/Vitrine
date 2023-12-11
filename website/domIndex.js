urlProdutos = 'http://localhost:8080/produtos';
urlSecoes = 'http://localhost:8080/secoes';

$(document).ready(function () {
	$.get(urlSecoes, function (jsonSecao, status) {
		$.get(urlProdutos, function (jsonProdutos, status) {
			var html = '<div class="row center">';
			html += '<div class="col s6 l2 center">Nome</div>';
			html += '<div class="col s6 l3 center">Descrição</div>';
			html += '<div class="col s6 l1 center">Valor</div>';
			html += '<div class="col s6 l1 center">Estoque</div>';
			html += '<div class="col s6 l2 center">Seção</div>';
			html += '<div class="col s6 l1 center">Editar</div>';
			html += '<div class="col s6 l1 center">Deletar</div>';
			html += '</div>';
			for (var i = 0; i < jsonProdutos.length; i++) {
				html += '<div class="row">';
				html += '<div class="col s6 l2 center">' + jsonProdutos[i].nome + '</div>';
				html += '<div class="col s6 l3 center">' + jsonProdutos[i].descricao + '</div>';
				html += '<div class="col s6 l1 center">' + jsonProdutos[i].valor + '</div>';
				html += '<div class="col s6 l1 center">' + jsonProdutos[i].qtdeEstoque + '</div>';
				let secaoName;
				for (var y = 0; y < jsonSecao?.length; y++) {
					for (var x = 0; x < jsonSecao[y]?.listaProdutos?.length; x++) {
						if (jsonSecao[y]?.listaProdutos[x].id == jsonProdutos[i].id) {
							secaoName = jsonSecao[y].nome;
						}
						if (secaoName == undefined) {
							secaoName = ' ';
						}
					}
				}
				html += '<div class="col s6 l2 center">' + secaoName + '</div>';
				html += '<div class="col s6 l1 center">';
				html +=
					'<i class="Small material-icons clique blue-text text-darken-2 cursorPointer selectNone" onclick="editarProduto(\'' +
					jsonProdutos[i].id +
					'\')">edit</i>';
				html += '</div>';
				html += '<div class="col s6 l1 center">';
				html +=
					'<i class="Small material-icons clique red-text text-darken-3 cursorPointer selectNone" onclick="excluirProduto(\'' +
					jsonProdutos[i].id +
					'\')">delete_forever</i>';
				html += '</div>';
				html += '</div>';
			}
			$('#listaProdutos').html(html);
		});
		jsonSecao.forEach((secao) => {
			var $newOpt = $('<option>')
			.attr('value', secao.id)
			.text(secao.nome);
			$('#select').append($newOpt);
		});
	});
});
