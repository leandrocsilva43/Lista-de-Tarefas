import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  Container,
  ToDoList,
  Input,
  Button,
  ListItem,
  Trash,
  Check,
} from "./styles.js";

function App() {
  const [list, setList] = useState([]);
  const [task, setTask] = useState("");

  //"Juntar os lixos", "Arrumar as camas", "Lavar a Louça"
  function inputMudou(event) {
    setTask(event.target.value);
  }

  function cliqueiNoBotao() {
    if (task) {
      setList([...list, { id: uuidv4(), task, finished: false }]);
      setTask(""); // Limpa o input
    }
  }

  function finalizarTarefa(id) {
    const newList = list.map((item) =>
      item.id === id ? { ...item, finished: !item.finished } : item,
    );
    setList(newList);
  }
  function deletarItem(id) {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  }

  return (
    <Container>
      <ToDoList>
        <Input
          value={task}
          onChange={inputMudou}
          placeholder="Digite a tarefa..."
        />
        <Button onClick={cliqueiNoBotao} disabled={!task}>
          Adicionar
        </Button>

        <ul>
          {list.length > 0 ? (
            list.map((item) => (
              <ListItem isFinished={item.finished} key={item.id}>
                <Check onClick={() => finalizarTarefa(item.id)} />
                <li>{item.task}</li>
                <Trash onClick={() => deletarItem(item.id)} />
              </ListItem>
            ))
          ) : (
            <h3>Não há Itens na Lista</h3>
          )}
        </ul>
      </ToDoList>
    </Container>
  );
}
export default App;
