import styles from './TarefasItem.module.css'

function TarefaItem({texto, concluida = false, prioridade = 'media'}) {
  const classeItem = concluida ? styles.tarefa + " " + styles.concluida : styles.tarefa;

  // Classe do texto tambem muda

  const classeTexto = concluida ? styles.textoTarefaConcluido : styles.textoTarefa;

  return (
    <li className='tarefa'>
      <span className={classeTexto}>{texto}</span>
      <button className='btnDeletar'>X</button>
    </li>
  );
}
export default TarefaItem;
