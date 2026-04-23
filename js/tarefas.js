const formulario = document.querySelector(".form-tarefa");
const inputTitulo = document.querySelector(".input-titulo");
const inputCategoria = document.querySelector(".input-categoria");
const inputData = document.querySelector(".input-data");
const mensagemFormulario = document.querySelector(".mensagem-formulario");

let tarefas = [];

function carregarTarefas() {
  const dados = localStorage.getItem("thesk_tarefas");

  if (dados) {
    tarefas = JSON.parse(dados);
  }
}

function guardarTarefas() {
  localStorage.setItem("thesk_tarefas", JSON.stringify(tarefas));
}

function mostrarMensagem(texto) {
  mensagemFormulario.textContent = texto;
}

function adicionarTarefa(titulo, categoria, data) {
  const tarefa = {
    id: Date.now(),
    titulo: titulo,
    categoria: categoria,
    data: data,
    concluida: false
  };

  tarefas.push(tarefa);
  guardarTarefas();
}

formulario.addEventListener("submit", function(evento) {
  evento.preventDefault();

  const titulo = inputTitulo.value.trim();
  const categoria = inputCategoria.value;
  const data = inputData.value;

  if (titulo === "") {
    mostrarMensagem("Escreve um título.");
    return;
  }

  if (categoria === "") {
    mostrarMensagem("Seleciona uma categoria.");
    return;
  }

  adicionarTarefa(titulo, categoria, data);
  mostrarMensagem("Tarefa adicionada.");
  formulario.reset();
});

carregarTarefas();