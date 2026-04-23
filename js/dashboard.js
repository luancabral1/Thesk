const filtroEstado = document.querySelector(".filtro-estado");
const filtroCategoria = document.querySelector(".filtro-categoria");
const contadorTarefas = document.querySelector(".contador-tarefas");
const estadoVazio = document.querySelector(".estado-vazio");
const listaTarefas = document.querySelector(".lista-tarefas");

let tarefas = [];

const dados = localStorage.getItem("thesk_tarefas");

if (dados) {
  tarefas = JSON.parse(dados);
}

function guardarDetalhe(tarefa) {
  localStorage.setItem("thesk_tarefa_detalhe", JSON.stringify(tarefa));
}

function guardarTarefas() {
  localStorage.setItem("thesk_tarefas", JSON.stringify(tarefas));
}

function atualizarLista() {
  listaTarefas.innerHTML = "";

  let tarefasMostradas = tarefas;

  if (filtroEstado.value === "pendentes") {
    tarefasMostradas = tarefasMostradas.filter(function(tarefa) {
      return tarefa.concluida === false;
    });
  }

  if (filtroEstado.value === "concluidas") {
    tarefasMostradas = tarefasMostradas.filter(function(tarefa) {
      return tarefa.concluida === true;
    });
  }

  if (filtroCategoria.value !== "todas") {
    tarefasMostradas = tarefasMostradas.filter(function(tarefa) {
      return tarefa.categoria === filtroCategoria.value;
    });
  }

  contadorTarefas.textContent = `Total: ${tarefas.length} tarefas`;

  if (tarefasMostradas.length === 0) {
    estadoVazio.style.display = "block";
  } else {
    estadoVazio.style.display = "none";
  }

  for (let i = 0; i < tarefasMostradas.length; i++) {
    const tarefa = tarefasMostradas[i];

    const item = document.createElement("li");
    item.classList.add("item-tarefa");

    const info = document.createElement("div");
    info.classList.add("item-info");

    const titulo = document.createElement("h3");
    titulo.textContent = tarefa.titulo;

    const detalhes = document.createElement("p");
    detalhes.textContent = `Categoria: ${tarefa.categoria} | Data: ${tarefa.data || "-"}`;

    if (tarefa.concluida) {
      item.classList.add("concluida");
    }

    info.appendChild(titulo);
    info.appendChild(detalhes);

    const acoes = document.createElement("div");
    acoes.classList.add("item-acoes");

    const botaoConcluir = document.createElement("button");
    botaoConcluir.textContent = tarefa.concluida ? "Desmarcar" : "Concluir";
    botaoConcluir.classList.add("botao-secundario");

    botaoConcluir.addEventListener("click", function() {
      tarefa.concluida = !tarefa.concluida;
      guardarTarefas();
      atualizarLista();
    });

    const botaoDetalhe = document.createElement("a");
    botaoDetalhe.textContent = "Detalhe";
    botaoDetalhe.href = "detalhe.html";
    botaoDetalhe.classList.add("botao-secundario");

    botaoDetalhe.addEventListener("click", function() {
      guardarDetalhe(tarefa);
    });

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    botaoRemover.classList.add("botao-secundario");

    botaoRemover.addEventListener("click", function() {
      tarefas = tarefas.filter(function(itemAtual) {
        return itemAtual.id !== tarefa.id;
      });

      guardarTarefas();
      atualizarLista();
    });

    acoes.appendChild(botaoConcluir);
    acoes.appendChild(botaoDetalhe);
    acoes.appendChild(botaoRemover);

    item.appendChild(info);
    item.appendChild(acoes);

    listaTarefas.appendChild(item);
  }
}

filtroEstado.addEventListener("change", function() {
  atualizarLista();
});

filtroCategoria.addEventListener("change", function() {
  atualizarLista();
});

atualizarLista();