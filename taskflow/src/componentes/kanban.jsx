// import "../App.css";
import Header from "./Header";
import axios from "axios";
import { useEffect, useState } from "react";

function Kanban() {
  const [tarefas, setTarefas] = useState(() => {
    //procura as tarefas salvas no navegador
    const salvo = localStorage.getItem("TaskFlow.tarefas");
    //transforma o  LocalStorage em array
    return salvo ? JSON.parse(salvo) : []; // se não existir começa com lista vazia
  });

  const [proximoId, setProximoId] = useState(() => {
    const salvo = localStorage.getItem("TaskFlow.tarefas");

    if (salvo) {
      const dados = JSON.parse(salvo);
      return dados.length > 0 ? dados[dados.length - 1].id + 1 : 1;
    }

    return 1;
  });

  const [texto, setTexto] = useState("");
  const [prioridade, setPrioridade] = useState("media");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [erroCep, setErroCep] = useState("");

  useEffect(() => {
    localStorage.setItem("TaskFlow.tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  function adicionarTarefa() {
    if (texto.trim() === "") return;

    const nova = {
      id: proximoId,
      texto: texto.trim(),
      concluida: false,
      prioridade: prioridade,
      coluna: "afazer",
      cidade: cidade,
    };

    setTarefas([...tarefas, nova]);
    setProximoId(proximoId + 1);

    setTexto("");
    setPrioridade("media");
    setCep("");
    setCidade("");
    setErroCep("");
  }

  function moverTarefa(id, novaColuna) {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id
          ? {
              ...tarefa,
              coluna: novaColuna,
              concluida: novaColuna === "concluido",
            }
          : tarefa,
      ),
    );
  }

  function deletarTarefa(id) {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  }

  async function buscarCep(cepDigitado) {
    const cepLimpo = cepDigitado.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      setCidade("");
      setErroCep("Digite um CEP válido. ");
      return;
    }

    setBuscandoCep(true);
    setErroCep("");

    try {
      const resposta = await axios.get(
        "https://viacep.com.br/ws/" + cepLimpo + "/json/",
      );

      console.log("Response", resposta);
      console.log("Response Data", resposta.data);
      console.log("Status", resposta.status);

      const data = resposta.data;

      if (data.erro) {
        throw new Error("CEP não encontrado");
      }

      setCidade(data.localidade + "/" + data.uf);

      console.log("Cidade:", data.localidade);
      console.log("UF:", data.uf);
      console.log("Logradouro:", data.logradouro);
      console.log("Bairro:", data.bairro);
    } catch {
      setErroCep("CEP inválido ou não encontrado");
      setCidade("");
    } finally {
      setBuscandoCep(false);
    }

  }
      const totalTarefas = tarefas.length;

    const tarefasPendentes = tarefas.filter(
      (tarefa) => tarefa.coluna !== "concluido",
    ).length;

    const tarefasConcluidas = tarefas.filter(
      (tarefa) => tarefa.coluna === "concluido",
    ).length;

  return (
    <div className="conteiner">
      <Header titulo="TaskFlow" subtitulo="Gerencie suas tarefas" />

      <main>
        {/* Formulário */}
        <section id="formulario">
          <input
            id="input-tarefa"
            type="text"
            placeholder="Nova tarefa..."
            autoComplete="off"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && adicionarTarefa()}
          />

          <input
            type="text"
            placeholder="CEP (opcional)"
            value={cep}
            onChange={(e) => {
              setCep(e.target.value);
              buscarCep(e.target.value);
            }}
            maxLength={9}
          />

          {buscandoCep && <span>Buscando...</span>}
          {cidade && <span>{cidade}</span>}
          {erroCep && <span>{erroCep}</span>}

          <select
            id="sel-prioridade"
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value)}
          >
            {/* PRIORIDADES */}
            <option value="alta">Alta</option>
            <option value="media">Média</option>
            <option value="baixa">Baixa</option>
          </select>

          <button
            className="btn-adicionar"
            type="button"
            onClick={adicionarTarefa}
          >
            Adicionar
          </button>
        </section>

        {/* Contadores */}
        <section id="contadores">
          <span>Total: {totalTarefas}</span>

          <span>Pendentes: {tarefasPendentes}</span>

          <span>Concluídas: {tarefasConcluidas}</span>
        </section>

        {/* Kanban */}

        <section className="kanban">
          <section className="coluna">
            <h2>A Fazer</h2>
            {/* fazer essa coluna funcionar */}
            {tarefas
              .filter((tarefa) => tarefa.coluna === "afazer")
              .map((tarefa) => (
                <div key={tarefa.id} className={`card ${tarefa.prioridade}`}>
                  <p>{tarefa.texto}</p>
                  {tarefa.cidade && (
                    <small className="cidade">{tarefa.cidade}</small>
                  )}
                  <button onClick={() => moverTarefa(tarefa.id, "andamento")}>
                    →
                  </button>

                  <button onClick={() => deletarTarefa(tarefa.id)}>🗑️</button>
                </div>
              ))}
          </section>

          <section className="coluna">
            <h2>Em Andamento</h2>
            {/* fazer essa coluna funcionar */}
            {tarefas
              .filter((tarefa) => tarefa.coluna === "andamento")
              .map((tarefa) => (
                <div key={tarefa.id} className={`card ${tarefa.prioridade}`}>
                  <p>{tarefa.texto}</p>

                  {tarefa.cidade && (
                    <small className="cidade">{tarefa.cidade}</small>
                  )}

                  <button onClick={() => moverTarefa(tarefa.id, "afazer")}>
                    ←
                  </button>

                  <button onClick={() => moverTarefa(tarefa.id, "concluido")}>
                    →
                  </button>

                  <button onClick={() => deletarTarefa(tarefa.id)}>🗑️</button>
                </div>
              ))}
          </section>

          <section className="coluna">
            <h2>Concluído</h2>

            {tarefas
              .filter((tarefa) => tarefa.coluna === "concluido")
              .map((tarefa) => (
                <div key={tarefa.id} className={`card ${tarefa.prioridade}`}>
                  <p>{tarefa.texto}</p>

                  {tarefa.cidade && (
                    <small className="cidade">{tarefa.cidade}</small>
                  )}

                  <button onClick={() => moverTarefa(tarefa.id, "andamento")}>
                    ←
                  </button>

                  <button onClick={() => deletarTarefa(tarefa.id)}>🗑️</button>
                </div>
              ))}
          </section>
        </section>
      </main>

      <footer>
        <p>TaskFlow 2026 - Prof. Alan Glei</p>
      </footer>
    </div>
  );
}

export default Kanban;
