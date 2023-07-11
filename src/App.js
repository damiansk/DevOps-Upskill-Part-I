import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './App.module.css';

const API_URL = '/api/tasks';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Błąd podczas pobierania zadań:', error);
    }
  };

  const addTask = async () => {
    try {
      const response = await axios.post(API_URL, { title: newTaskTitle });
      setTasks([...tasks, response.data]);
      setNewTaskTitle('');
    } catch (error) {
      console.error('Błąd podczas dodawania zadania:', error);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.put(`${API_URL}/${taskId}`, { status: newStatus });
      const updatedTasks = tasks.map(task => {
        if (task.id === taskId) {
          return { ...task, status: newStatus };
        }
        return task;
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Błąd podczas aktualizowania statusu zadania:', error);
    }
  };

  const deleteCompletedTasks = async () => {
    try {
      const completedTasks = tasks.filter(task => task.status === 'completed');
      const taskIds = completedTasks.map(task => task.id);
      await Promise.all(taskIds.map(taskId => axios.delete(`${API_URL}/${taskId}`)));
      const updatedTasks = tasks.filter(task => task.status !== 'completed');
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Błąd podczas usuwania zakończonych zadań:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Lista zadań</h1>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
          placeholder="Nowe zadanie"
          className={styles.input}
        />
        <button onClick={addTask} className={styles.addButton}>
          Dodaj zadanie
        </button>
      </div>
      <ul className={styles.taskList}>
        {tasks.map(task => (
          <li key={task.id} className={styles.taskItem}>
            <span>{task.title}</span>
            <button onClick={() => updateTaskStatus(task.id, 'completed')} className={styles.deleteButton}>
              Usuń
            </button>
          </li>
        ))}
      </ul>
      <button
        disabled={tasks.filter(task => task.status === 'completed').length === 0}
        onClick={deleteCompletedTasks}
        className={styles.deleteCompletedButton}
      >
        Usuń zakończone zadania
      </button>
    </div>
  );
};

export default App;
