import React, { useState, useEffect } from 'react';
import { getTasks, createTask, deleteTask, updateTask} from './services/todoService';
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
      setTodos(todosData.slice(0, 9)); // Limit to 9 tasks for correct displaying purposes
    } catch (error) {
      console.error("Error loading todos", error);
    }
  };

  const handleAddTask = async () => {
    if (task.trim()) {
      try {
        await createTask(task);
        setTask(''); // Clean input
        fetchTodos(); // Reload tasks
      } catch (error) {
        console.error("Error adding task", error);
      }
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      fetchTodos(); // Reload tasks
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const handleUpdateTask = async (id) => {
    try {
      await updateTask(id, {done: true});//Mark task as done
      fetchTodos(); // Reload tasks
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div class="add-task">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button class="add-btn" onClick={handleAddTask}>Add</button>
      </div>  

      <ul>
        {todos
        .filter(task => !task.done) // Hide completed tasks 
        .map(task => (
          <li key={task._id}>
            <span onClick={() => console.log('TODO:', task._id)}>
              {task.description}
            </span>
            <button class="done-btn" onClick={() => handleUpdateTask(task._id)}>Done</button>
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
