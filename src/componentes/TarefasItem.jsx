import styles from './TarefasItem.module.css'

function TarefaItem({ texto, concluida, prioridade, onDeletar, onConcluir })  {
   const classeItem = 
    (concluida ? styles.tarefa + ' ' + styles.concluida : styles.tarefa) + ' ' + styles[prioridade];

  // Classe do texto tambem muda

  const classeTexto = 
    concluida ? styles.textoTarefa + ' ' + styles['texto-tarefa'] : styles.textoTarefa;

      const classePrioridade = styles['badge-prioridade'] + ' ' + styles['badge-' + prioridade];
   return (
    <li className={classeItem} onClick={onConcluir}>
      <span className={classeTexto}>{texto}</span>
      <span className={classePrioridade}>{prioridade}</span>
      <button className={styles.btnDeletar} onClick= {onDeletar}>
        X
      </button>
      {/* <button className={styles.btnDeletar} onClick={e => {e.stopPropagation(); onDeletar();}}>
        X
        </button> */}
    </li>

  );
}

export default TarefaItem;