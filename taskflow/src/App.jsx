import "./App.css"
import Header from "./componentes/Header"
import ListaTarefas from "./componentes/ListaTarefas";
import TarefaItem from "./componentes/TarefasItem"
import { useState } from "react";

const tarefasIniciais = [];

function App() {
  const [tarefas, setTarefas]     = useState([]);
  const [proximoId, setProximoId] = useState(1);
  const [texto, setTexto]         = useState('');
  const [prioridade, setPrioridade] = useState ("media")



function adicionarTarefa() {
    if (texto.trim() === '') return; // validacao

    const nova = {
        id: proximoId,
        texto: texto.trim(),
        concluida: false,
        prioridade: prioridade, 
    };
  

    setTarefas([...tarefas, nova]); // adiciona ao array
    setProximoId(proximoId + 1);    // incrementa o id
    setTexto('');                   // limpa o campo
    setPrioridade("media"); // reseta a prioridade para o valor padrão
  }

    function deletarTarefa(id) {
     setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
  }
    function concluirTarefa(id) {
    setTarefas(tarefas.map(tarefa =>
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    ));
  }
  
  return (
    <div className="conteiner" id="app">
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
          onKeyDown={e => e.key === 'Enter' && adicionarTarefa()}
          />
      
          <select id="sel-prioridade"
           value = {prioridade}
          onChange={e => setPrioridade(e.target.value)}  
          >
            <option value="alta">Alta</option>
            <option value="media">Média</option>
            <option value="baixa">Baixa</option>
          </select>

             <button className="btn-adicionar" type="button" onClick={adicionarTarefa}>
              Adicionar
            </button>

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

        <ListaTarefas tarefas={tarefas} onDeletar={deletarTarefa} onConcluir={concluirTarefa} />

      </main>

      <footer>
        <p>TaskFlow 2026 - Prof. Alan Glei</p>
      </footer>
    </div>
  );
}

export default App;