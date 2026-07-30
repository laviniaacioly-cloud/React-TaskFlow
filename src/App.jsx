import "./App.css"
import Header from "./componentes/Header"
import ListaTarefas from "./componentes/ListaTarefas";
import TarefaItem from "./componentes/TarefasItem"
import { useState } from "react";

const tarefasIniciais = [
  // {
  //   id: 1,
  //   texto: "Estudar React",
  //   concluida: false,
  //   prioridade: 'alta',
  // },
  // {
  //   id: 2,
  //   texto: 'Criar componentes',
  //   concluida: true,
  //   prioridade: 'media',
  // },
  // {
  //   id: 3,
  //   texto: 'Entender props',
  //   concluida: false,
  //   prioridade: 'alta',
  // },
  // {
  //   id: 4,
  //   texto: 'Praticar exercicios',
  //   concluida: false,
  //   prioridade: 'baixa',
  // },
];


function App() {
  const [tarefas, setTarefas]     = useState([]);
  const [proximoId, setProximoId] = useState(1);
  const [texto, setTexto]         = useState('');

  function aoClicar(){
  console.log(texto)
  setTexto("")
}

function adicionarTarefa() {
    if (texto.trim() === '') return; // validacao

    const nova = {
      id: proximoId,
      texto: texto.trim(),
      concluida: false,
      prioridade: 'media',
    };

    setTarefas([...tarefas, nova]); // adiciona ao array
    setProximoId(proximoId + 1);    // incrementa o id
    setTexto('');                   // limpa o campo
  }

  return (
    <div className="conteiner" id="app">
      {/* <header>
        <h1>TaskFlow</h1>
        <p>Gerencie suas tarefas</p>
      </header> */}
      <Header titulo="TaskFlow" subtitulo="Gerencie suas tarefas" />

      <main className="conteiner">
        <section id="formulario">
          <input id="input-tarefa" 
          type="text" 
          placeholder="Nova tarefa..." 
          required
          autoComplete="off"
          value={texto}
          onChange={e => setTexto(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && adicionarTarefas()}
          />
            <button onClick={adicionarTarefa}>
              Adicionar
            </button>

          <select id="sel-prioridade">
            <option value="alta">Alta</option>
            <option value="media">Média</option>
            <option value="baixa">Baixa</option>
          </select>

          {/* <button id="btn-adicionar">Adicionar</button> */}

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

        <ListaTarefas tarefas={tarefas} />

      </main>

      <footer>
        <p>TaskFlow 2026 - Prof. Alan Glei</p>
      </footer>
    </div>
  );
}

export default App;