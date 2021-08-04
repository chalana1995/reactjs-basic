import { useEffect, useRef, useState } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([]);
  const todonameRef = useRef()

  const LOCAL_STORAGE_KEY = 'todosApp.todos';


  useEffect(() => {
    const storeTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storeTodos) setTodos(storeTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newToDo = [...todos];
    const todo = newToDo.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newToDo);
  }

  function addTodos(e) {
    const name = todonameRef.current.value;
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todonameRef.current.value = null
  }

  function handleClearTodo() {
    const newtodo = todos.filter(todo => !todo.complete);
    setTodos(newtodo);
  }



  return (
    <div>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todonameRef} type="text" />
      <button onClick={addTodos}>Add todo</button>
      <button onClick={handleClearTodo}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </div>
  );
}

export default App;
