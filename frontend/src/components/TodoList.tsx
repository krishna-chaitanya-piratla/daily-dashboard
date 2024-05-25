import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import TodoItem from './TodoItem';
import { StyledTodoListContainer, StyledHeader, StyledDeleteIcon } from '../styled-components/Todo';
import 'react-resizable/css/styles.css';

interface Todo {
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

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

  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const clearTodos = () => {
    setTodos([]);
  };

  return (
    <Draggable handle=".handle" disabled={isResizing}>
      <ResizableBox 
        width={400} 
        height={400} 
        minConstraints={[300, 300]} 
        maxConstraints={[1000, 1000]}
        onResizeStart={() => setIsResizing(true)}
        onResizeStop={() => setIsResizing(false)}
        resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
      >
        <StyledTodoListContainer>
          <StyledHeader className="handle">
            <h1>To-Do List</h1>
            <StyledDeleteIcon onClick={clearTodos}>&#x1F5D1;</StyledDeleteIcon> {/* Unicode for delete icon */}
          </StyledHeader>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a new to-do"
            style={{ width: '100%', height: '40px' }}
          />
          <div>
            {todos.map((todo, index) => (
              <TodoItem
                key={index}
                todo={todo.text}
                completed={todo.completed}
                onToggle={() => toggleTodo(index)}
                onDelete={() => deleteTodo(index)}
              />
            ))}
          </div>
        </StyledTodoListContainer>
      </ResizableBox>
    </Draggable>
  );
};

export default TodoList;
