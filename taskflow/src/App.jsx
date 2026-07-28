import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Saudacao from './Saudacao'
import Header from './componentes/Header'

function App() {
  return (
    <div className='conteiner' id='app'>
      {/* <header>
        <h1>TaskFlow</h1>
        <p>Gerencie suas tarefas</p>
      </header> */}
      <Header 
        titulo='TaskFlow' 
        subtitulo='Gerencie suas tarefas'/>
        
      <main className='conteiner'>
        <section id='formulario'>
          <input id='input-tarefa'
            type='text' placeholder='Nova tarefa...'/>

             <select id="sel-prioridade">
                <option value="alta">Alta</option>
                <option value="media" selected>Média</option>
                <option value="baixa">Baixa</option>
            </select>

          <button id='btn-adicionar'>Adicionar</button>

          <button id='btn-deletar'>Deletar</button>

        </section>

        <section id="controles">
            <div id="filtros">
                <button class="btn-filtro ativo" data-filtro="todas">
                    Todas
                </button>
                <button class="btn-filtro" data-filtro="pendentes">
                    Pendentes
                </button>
                <button class="btn-filtro" data-filtro="concluidas">
                    Concluídas
                </button>
            </div>
            <div id="contadores">
                <span id="cont-total">0 tarefas</span>
                <span id="cont-pendentes">0 pendentes</span>
                <span id="cont-concluidas">0 concluídas</span>
            </div>
        </section>

        <section id='lista-section'>
          <ul id='tarefas'>
            <li className='tarefa'>Estudar React</li>
            <li className='tarefa'>Criar componentes</li>
          </ul>
        </section>
      </main>

      <footer>
        <p>TaskFlow 2026 - Prof. Alan Glei</p>
      </footer>

    </div>
  );
}

export default App;