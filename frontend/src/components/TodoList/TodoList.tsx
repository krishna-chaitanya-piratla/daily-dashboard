import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import axios from 'axios';
import TodoItem from './TodoItem';
import TodoListTitle from './TodoListTitle';
import { StyledTodoListContainer } from '../../styled-components/Todo';
import 'react-resizable/css/styles.css';
import TodoInput from './TodoInput';

interface Todo {
  text: string;
  completed: boolean;
}

interface TodoListProps {
  listId: string;
  title: string;
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ listId, title: initialTitle, todos: initialTodos = [] }) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState<string>('');
  const [isResizing, setIsResizing] = useState(false);
  const [title, setTitle] = useState<string>(initialTitle);
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = { text: newTodo, completed: false };
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/todos/${listId}`, todo)
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
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/todos/${listId}/${index}`, updatedTodo)
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
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/todos/${listId}/${index}`)
      .then(() => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
      })
      .catch(error => {
        console.error('There was an error deleting the todo!', error);
      });
  };

  const clearTodos = () => {
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/todos/${listId}`)
      .then(() => {
        setTodos([]);
      })
      .catch(error => {
        console.error('There was an error clearing the todos!', error);
      });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/todos/${listId}/title`, { title })
      .catch(error => {
        console.error('There was an error updating the title!', error);
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
          <TodoListTitle
            title={title}
            isEditingTitle={isEditingTitle}
            setIsEditingTitle={setIsEditingTitle}
            handleTitleChange={handleTitleChange}
            handleTitleBlur={handleTitleBlur}
            clearTodos={clearTodos}
          />
          <TodoInput
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a new to-do"
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
