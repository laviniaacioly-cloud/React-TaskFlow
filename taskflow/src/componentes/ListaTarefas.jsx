import TarefaItem from "./TarefasItem";
function ListaTarefas({tarefas}) {
    return(
        <section id="lista-section">
            {tarefas.length === 0 && (
                <p className="msg-vazia">
                    Nenhuma tarefa cadastrada. Adicione uma acima!
                </p>
            )}
            {tarefas.length > 0 && (
                <ul id="lista-tarefas">
                    {tarefas.map(tarefa => (
                        <TarefaItem
                        key={tarefa.id}
                        texto={tarefa.texto}
                        concluida={tarefa.concluida}
                        prioridade={tarefa.prioridade}
                        />
                    ))}
                </ul>
            )}
        </section>
    );
}
export default ListaTarefas;

