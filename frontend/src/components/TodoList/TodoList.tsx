// components/TodoList.tsx
import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import axios from 'axios';
import TodoItem from './TodoItem';
import { StyledTodoListContainer, StyledHeader, StyledDeleteIcon } from '../../styled-components/Todo';
import 'react-resizable/css/styles.css';
import TodoInput from './TodoInput';

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
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/todos`)
      .then(response => {
        setTodos(response.data);
        setIsInitialized(true);
      })
      .catch(error => {
        console.error('There was an error fetching the todos!', error);
      });
  }, []);

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = { text: newTodo, completed: false };
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/todos`, todo)
        .then(response => {
          setTodos([...todos, response.data]);
          setNewTodo('');
        })
        .catch(error => {
          console.error('There was an error adding the todo!', error);
        });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  };

  const toggleTodo = (index: number) => {
    const updatedTodo = { ...todos[index], completed: !todos[index].completed };
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/todos/${index}`, updatedTodo)
      .then(response => {
        const updatedTodos = [...todos];
        updatedTodos[index] = response.data;
        setTodos(updatedTodos);
      })
      .catch(error => {
        console.error('There was an error updating the todo!', error);
      });
  };

  const deleteTodo = (index: number) => {
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/todos/${index}`)
      .then(() => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
      })
      .catch(error => {
        console.error('There was an error deleting the todo!', error);
      });
  };

  const clearTodos = () => {
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/todos`)
      .then(() => {
        setTodos([]);
      })
      .catch(error => {
        console.error('There was an error clearing the todos!', error);
      });
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
          <TodoInput type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a new to-do"/>
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
