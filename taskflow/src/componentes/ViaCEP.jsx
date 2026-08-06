import axios from "axios";
import { useState, useEffect } from 'react';

function ViaCEP() {
  const [tarefas, setTarefas] = useState(() => {
    const salvo = localStorage.getItem("tarefas");
    if (!salvo) return [];
    const dados = JSON.parse(salvo);
    return Array.isArray(dados) ? dados : [];
  });

  const [texto, setTexto] = useState("");
  const [prioridade, setPrioridade] = useState("media");
  // Novos estados para o CEP
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [erroCep, setErroCep] = useState("");

  async function buscarCep(cepDigitado) {
    const cepLimpo = cepDigitado.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      setCidade("");
      setErroCep("Digite um CEP valido.");
      return;
    }

    setBuscandoCep(true);
    setErroCep("");

    try {
      const { data } = await axios.get(
        "https://viacep.com.br/ws/" + cepLimpo + "/json/",
      );
      const resposta = await axios.get(
         "https://viacep.com.br/ws/" + cepLimpo + "/json/"
      );


        console.log("Response", resposta);
        console.log("Response Data", resposta.data);
        console.log("Status", resposta.status);
// 
        console.log("CEP:", resposta.data.cep);
        console.log("Logradouro:", resposta.data.logradouro);
        console.log("Bairro:", resposta.data.bairro);
        console.log("Cidade:", resposta.data.localidade);
        console.log("UF:", resposta.data.uf);

      if (data.erro) throw new Error("CEP nao encontrado");

      setCidade(data.localidade + "/" + data.uf);
    } catch (e) {
      setErroCep("CEP invalido ou nao encontrado");

      setCidade("");
    } finally {
      setBuscandoCep(false);
    }
    
  }

 return (
    <div>

      <input
        type="text"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        placeholder="Digite o CEP"
      />

      <button onClick={() => buscarCep(cep)}>
        Consultar CEP
      </button>

      {buscandoCep && <p>Buscando CEP...</p>}

      {cidade && <p>{cidade}</p>}

      {erroCep && <p>{erroCep}</p>}
    </div>
  );
}

export default ViaCEP;
