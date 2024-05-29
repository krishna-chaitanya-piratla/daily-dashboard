import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import axios from 'axios';
import TodoItem from './TodoItem';
import TodoListTitle from './TodoListTitle';
import { StyledTodoListContainer } from '../../styled-components/Todo';
import TodoInput from './TodoInput';
import {
  addTodo,
  handleKeyDown,
  toggleTodo,
  deleteTodo,
  clearTodos,
  handleTitleChange,
  handleTitleBlur,
  editTodo,
} from '../../utils/todoFunctions';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  listId: string;
  title: string;
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ listId, title: initialTitle, todos: initialTodos = [] }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [title, setTitle] = useState<string>(initialTitle);
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);

  useEffect(() => {
    setTodos(initialTodos.sort((a, b) => Number(a.completed) - Number(b.completed)));
  }, [initialTodos]);

  const handleEditTodo = (todoId: string, newText: string) => {
    editTodo(todoId, newText, todos, listId, setTodos);
  };

  return (
    <Draggable handle=".handle">
      <StyledTodoListContainer>
        <TodoListTitle
          title={title}
          isEditingTitle={isEditingTitle}
          setIsEditingTitle={setIsEditingTitle}
          handleTitleChange={(e) => handleTitleChange(e, setTitle)}
          handleTitleBlur={() => handleTitleBlur(title, listId, setIsEditingTitle)}
          clearTodos={() => clearTodos(listId, setTodos)}
        />
        <TodoInput
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(event) => handleKeyDown(event, newTodo, listId, setTodos, setNewTodo)}
          placeholder="Add a new to-do"
        />
        <div>
          {todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo.text}
              completed={todo.completed}
              onToggle={() => toggleTodo(todo.id, todos, listId, setTodos)}
              onDelete={() => deleteTodo(todo.id, todos, listId, setTodos)}
              onEdit={(newText) => handleEditTodo(todo.id, newText)}
            />
          ))}
        </div>
      </StyledTodoListContainer>
    </Draggable>
  );
};

export default TodoList;
