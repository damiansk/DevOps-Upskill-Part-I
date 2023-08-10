import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [logoUrl, setLogoUrl] = useState(null);

  const fetchLogo = async () => {
    try {
      const response = await axios.get('/api/s3');
      setLogoUrl(response.data.signedUrl);
    } catch (error) {
      console.error('Błąd podczas pobierania loga:', error);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todo');
      setTodos(response.data);
    } catch (error) {
      console.error('Błąd podczas pobierania zadań:', error);
    }
  };

  useEffect(() => {
    fetchLogo();
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    try {
      const response = await axios.post('/api/todo', {
        title: newTodo,
        description: '',
        status: false,
      });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Błąd podczas dodawania zadania:', error);
    }
  };

  const handleToggleStatus = async (todoId, currentStatus) => {
    try {
      await axios.put(`/api/todo/${todoId}`, {
        status: !currentStatus,
      });
      const updatedTodos = todos.map((todo) =>
        todo.id === todoId ? { ...todo, status: !currentStatus } : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Błąd podczas zmiany statusu zadania:', error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await axios.delete(`/api/todo/${todoId}`);
      const updatedTodos = todos.filter((todo) => todo.id !== todoId);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Błąd podczas usuwania zadania:', error);
    }
  };

  return (
    <div className="app">
      {logoUrl ?
        <img width={200} src="logoUrl" alt="Dog on old Windows XP wallpaper" />
        : null}
      <h1>Todo App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Dodaj nowe zadanie..."
      />
      <button onClick={handleAddTodo}>Dodaj</button>
      <TodoList
        todos={todos}
        handleToggleStatus={handleToggleStatus}
        handleDeleteTodo={handleDeleteTodo}
      />
    </div >
  );
};

export default App;
