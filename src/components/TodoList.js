import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, handleToggleStatus, handleDeleteTodo }) => {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleToggleStatus={handleToggleStatus}
          handleDeleteTodo={handleDeleteTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
