urlProdutos = 'http://localhost:8080/produtos';
urlSecoes = 'http://localhost:8080/secoes';

function editarProduto(idProduto) {
	let urlProdutosPut = urlProdutos + '/' + idProduto;

	$.get(urlProdutosPut, function (jsonProduto, status) {
		$('#id').val(jsonProduto.id);
		$('#nome').val(jsonProduto.nome);
		$('#descricao').val(jsonProduto.descricao);
		$('#valor').val(jsonProduto.valor);
		$('#qtdeEstoque').val(jsonProduto.qtdeEstoque);
		$('#estoqueMinimo').val(jsonProduto.estoqueMinimo);
		$('#imagem').val(jsonProduto.imagem);

		$.get(urlSecoes, function (jsonSecao, status) {
			jsonSecao.forEach(elementSecao => {
				elementSecao.listaProdutos.forEach(elementProdutoFromListSecao => {
					if (elementProdutoFromListSecao.id == jsonProduto.id) {
						selectProduto([{ "id": elementSecao.id }], urlSecoes);
					}
				});
			});
		});
	});
}

function editarSecao(idSecao) {
	let urlSecoesPut = urlSecoes + '/' + idSecao;

	$.get(urlSecoesPut, function (json, status) {
		$('#id').val(json.id);
		$('#nome').val(json.nome);
		selectProduto(json.listaProdutos, urlProdutos);
	});
}

function excluirProduto(idProduto) {
	urlProdutosDelete = urlProdutos + '/' + idProduto;

	makeRequest(urlProdutosDelete, null, 'DELETE');

	location.reload();
}

function excluirSecao(idSecao) {
	urlSecoesDelete = urlSecoes + '/' + idSecao;

	makeRequest(urlSecoesDelete, null, 'DELETE');

	location.reload();
}

function saveProduto() {
	let dados = {};
	let form = $('form').serializeArray();

	dados = formatForm(form); // Convert value revice from form to format accept by the server

	// Make Requests
	if (dados.id) {
		urlProdutosPut = urlProdutos + '/' + dados.id;

		dados = JSON.stringify(dados);

		makeRequest(urlProdutosPut, dados, 'PUT');
		// location.reload();
	} else {
		dados = JSON.stringify(dados);

		makeRequest(urlProdutos, dados, 'POST');
		// location.reload();
	}
}

function saveSecao() {
	let dados = {};
	let form = $('form').serializeArray();

	dados = formatForm(form); // Convert value revice from form to format accept by the server

	var selectedProdutos = M.FormSelect.getInstance(document.getElementById('select')).getSelectedValues();
	if (selectedProdutos[0] != null) {
		dados.listaProdutos = selectedProdutos;
	}

	console.log(dados)
	// Make Requests
	if (dados.id) {
		urlSecoesPut = urlSecoes + '/' + dados.id;

		dados = JSON.stringify(dados);

		makeRequest(urlSecoesPut, dados, 'PUT');
		// location.reload();
	} else {
		dados = JSON.stringify(dados);

		makeRequest(urlSecoes, dados, 'POST');
		// location.reload();
	}
}
