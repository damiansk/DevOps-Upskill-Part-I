import React from 'react';

const TodoItem = ({ todo, handleToggleStatus, handleDeleteTodo }) => {
  console.log(todo);
  return (
    <div className={`todo-item ${todo.status ? 'completed' : ''}`}>
      <span>{todo.title}</span>
      <button onClick={() => handleToggleStatus(todo.id, todo.status)}>
        {todo.status ? 'Oznacz jako niewykonane' : 'Oznacz jako wykonane'}
      </button>
      <button onClick={() => handleDeleteTodo(todo.id)}>Usuń</button>
    </div>
  );
};

export default TodoItem;
