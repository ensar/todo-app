import { useState, useEffect } from "react";
import Todos from "./Todos";
import { v4 as uuidv4 } from "uuid";

function App() {
  const TODOS = JSON.parse(localStorage.getItem("todos"));

  const [todo, setTodo] = useState(TODOS || []);
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  const addTodo = (val) => {
    if (text.trim()) {
      setTodo([...todo, { id: uuidv4(), val, done: false }]);
    }
  };

  const delTodo = (id) => {
    setTodo(todo.filter((elm) => elm.id !== id));
  };

  const doneTodo = (id) => {
    setTodo(
      todo.map((elm) => (elm.id === id ? { ...elm, done: !elm.done } : elm))
    );
  };

  const clearDone = () => {
    setTodo(todo.filter((elm) => !elm.done));
  };

  const onSub = (e) => {
    e.preventDefault();
    setText("");
    addTodo(text);
  };

  return (
    <div className="App">
      <form onSubmit={(e) => onSub(e)}>
        <div className="input">
          <input
            type="text"
            placeholder="add todo"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button className="btn">+</button>
        </div>
      </form>
      <Todos todo={todo} del={delTodo} dt={doneTodo} />
      <div className="clearButtons">
        <button
          className={todo.length > 1 ? "clear active" : "clear"}
          onClick={() => setTodo([])}
        >
          clear all{" "}
        </button>
        <button
          className={
            todo.map((elm) => elm.done).indexOf(true) !== -1
              ? "clear active"
              : "clear"
          }
          onClick={clearDone}
        >
          clear all completed
        </button>
      </div>
    </div>
  );
}

export default App;
