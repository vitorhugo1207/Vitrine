$(document).ready(function () {});

function makeRequest(url, dados, type) {
	escreverLoadAction();
	$.ajax({
	    type: type,
	    url: url,
	    data: dados,
	    contentType: 'application/json',
	    success: function (res) {
			dados = JSON.parse(dados);
            
			if (dados.secao) {
				let urlSecaosPut = 'http://localhost:8080/secoes/' + dados.secao;
				let dadosSecao = JSON.stringify({
					"listaProdutos": [res.id]
				});
				makeRequest(urlSecaosPut, dadosSecao, 'PUT');
            }
	    },
	    complete: function () {
			removerLoadAction();
			mensage();
	    }
	});
}

function formatForm(form) {
	$.each(form, function (i, field) {
		if (i == 0) {
			dados = '{';
		}

		dados = dados + `"${field.name}":"${field.value}"`;

		if (i == form.length - 1) {
			dados = dados + '}';
		} else {
			dados = dados + ',';
		}
	});
	dados = JSON.parse(dados);

	return dados;
}

function exibirMensagem(msg) {
	$('#msgResp').html(msg);
	$('#dialog').dialog();
	setTimeout(function () {
		$('#dialog').dialog('close');
	}, '5000');
}

function mensage() {
	exibirMensagem('Operação realizada com sucesso!');
}

function escreverLoadAction() {
	$('#dialogAguarde').dialog({
		modal: true,
	});
}

function removerLoadAction() {
	$('#dialogAguarde').dialog('close');
}

function selectProduto(selectedOption=[], url) {
	let produtosAddedInSelect = [];

	$('#select').empty();
	
	$.get(url, function (jsonProdutos, status) {
		var $newOpt;
		jsonProdutos.forEach((produto) => {
			if (selectedOption[0] != null) {
				selectedOption.forEach((produtoFromSecao) => {
					if (produtoFromSecao.id == produto.id) {
						produtosAddedInSelect.push(produto.id);
						
						$newOpt = $('<option selected>')
						.attr('value', produto.id)
						.text(produto.nome);
						
						$('#select').append($newOpt);
					}
				});
			}
			else {
				produtosAddedInSelect.push(produto.id);
				
				$newOpt = $('<option>')
					.attr('value', produto.id)
					.text(produto.nome);
				$('#select').append($newOpt);
			}
			if (!produtosAddedInSelect.includes(produto.id)) {
				$newOpt = $('<option>')
					.attr('value', produto.id)
					.text(produto.nome);
				$('#select').append($newOpt);
			}
		});
		$('select').formSelect();
	});
}
