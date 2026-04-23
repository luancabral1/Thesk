const detalheTitulo = document.querySelector(".detalhe-titulo");
const detalheCategoria = document.querySelector(".detalhe-categoria");
const detalheData = document.querySelector(".detalhe-data");
const detalheEstado = document.querySelector(".detalhe-estado");

function carregarDetalhe() {
  const dados = localStorage.getItem("thesk_tarefa_detalhe");

  if (!dados) {
    return;
  }

  const tarefa = JSON.parse(dados);

  detalheTitulo.textContent = tarefa.titulo;
  detalheCategoria.textContent = `Categoria: ${tarefa.categoria}`;
  detalheData.textContent = `Data: ${tarefa.data || "-"}`;
  detalheEstado.textContent = `Estado: ${tarefa.concluida ? "Concluída" : "Pendente"}`;
}

carregarDetalhe();