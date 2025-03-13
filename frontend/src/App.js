import React, { useState, useEffect } from 'react';
import { getTasks, createTask, deleteTask } from './services/todoService';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  // Cargar los TODOs cuando se monta el componente
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const todosData = await getTasks();
      setTodos(todosData);
    } catch (error) {
      console.error("Error loading todos", error);
    }
  };

  const handleAddTodo = async () => {
    if (task.trim()) {
      try {
        await createTask(task);
        setTask(''); // Clean input
        fetchTodos(); // Reload tasks
      } catch (error) {
        console.error("Error adding todo", error);
      }
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTask(id);
      fetchTodos(); // Reload tasks
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTodo}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => console.log('TODO:', todo._id)}
            >
              {todo.task}
            </span>
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
