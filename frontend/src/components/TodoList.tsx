import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { StyledTodoListContainer, StyledHeader, StyledDeleteIcon } from '../styled-components/Todo';

interface Todo {
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, isInitialized]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  };

  const toggleTodo = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const clearTodos = () => {
    setTodos([]);
  };

  return (
    <StyledTodoListContainer>
      <StyledHeader>
        <h1>To-Do List</h1>
        <StyledDeleteIcon onClick={clearTodos}>&#x1F5D1;</StyledDeleteIcon> {/* Unicode for delete icon */}
      </StyledHeader>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a new to-do"
        style={{ width: '400px', height: '40px' }}
      />
      <div>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo.text}
            completed={todo.completed}
            onToggle={() => toggleTodo(index)}
          />
        ))}
      </div>
    </StyledTodoListContainer>
  );
};

export default TodoList;
