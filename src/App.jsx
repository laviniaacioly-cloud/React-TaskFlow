import "./App.css"
import Header from "./componentes/Header"
import ListaTarefas from "./componentes/ListaTarefas";
import TarefaItem from "./componentes/TarefasItem"

const tarefasIniciais = [
  {
    id: 1,
    texto: "Estudar React",
    concluida: false,
    prioridade: 'alta',
  },
  {
    id: 2,
    texto: 'Criar componentes',
    concluida: true,
    prioridade: 'media',
  },
  {
    id: 3,
    texto: 'Entender props',
    concluida: false,
    prioridade: 'alta',
  },
  {
    id: 4,
    texto: 'Praticar exercicios',
    concluida: false,
    prioridade: 'baixa',
  },
];


function App() {
  return (
    <div className="conteiner" id="app">
      {/* <header>
        <h1>TaskFlow</h1>
        <p>Gerencie suas tarefas</p>
      </header> */}
      <Header titulo="TaskFlow" subtitulo="Gerencie suas tarefas" />

      <main className="conteiner">
        <section id="formulario">
          <input id="input-tarefa" type="text" placeholder="Nova tarefa..." />

          <select id="sel-prioridade">
            <option value="alta">Alta</option>
            <option value="media">
              Média
            </option>
            <option value="baixa">Baixa</option>
          </select>

          <button id="btn-adicionar">Adicionar</button>

          {/* <button id="btn-deletar">Deletar</button> */}
        </section>

        <section id="controles">
          <div id="filtros">
            <button className="btn-filtro ativo" data-filtro="todas">
              Todas
            </button>
            <button className="btn-filtro" data-filtro="pendentes">
              Pendentes
            </button>
            <button className="btn-filtro" data-filtro="concluidas">
              Concluídas
            </button>
          </div>
          <div id="contadores">
            <span id="cont-total">0 tarefas</span>
            <span id="cont-pendentes">0 pendentes</span>
            <span id="cont-concluidas">0 concluídas</span>
          </div>
        </section>

        <ListaTarefas tarefas={tarefasIniciais} />

      </main>

      <footer>
        <p>TaskFlow 2026 - Prof. Alan Glei</p>
      </footer>
    </div>
  );
}

export default App;