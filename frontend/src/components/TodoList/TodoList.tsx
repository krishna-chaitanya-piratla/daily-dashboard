import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoListTitle from './TodoListTitle';
import { StyledTodoListContainer, StyledTodoInputContainer, StyledTodoListWrapper } from '../../styled-components/Todo';
import TodoInput from './TodoInput';
import {
  handleKeyDown,
  toggleTodo,
  deleteTodo,
  clearTodos,
  handleTitleChange,
  handleTitleBlur,
  editTodo,
  deleteTodoList
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
  removeTodoList: (listId: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ listId, title: initialTitle, todos: initialTodos = [], removeTodoList }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [title, setTitle] = useState<string>(initialTitle);
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  useEffect(() => {
    setTodos(initialTodos.sort((a, b) => Number(a.completed) - Number(b.completed)));
  }, [initialTodos]);

  const handleEditTodo = (todoId: string, newText: string) => {
    editTodo(todoId, newText, todos, listId, setTodos);
  };

  const handleDeleteTodoList = async () => {
    await deleteTodoList(listId);
    removeTodoList(listId);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <StyledTodoListWrapper>
      <StyledTodoListContainer>
        <TodoListTitle
          title={title}
          isEditingTitle={isEditingTitle}
          isMinimized={isMinimized}
          setIsEditingTitle={setIsEditingTitle}
          toggleMinimize={toggleMinimize}
          handleTitleChange={(e) => handleTitleChange(e, setTitle)}
          handleTitleBlur={() => handleTitleBlur(title, listId, setIsEditingTitle)}
          clearTodos={() => clearTodos(listId, setTodos)}
          deleteTodoList={handleDeleteTodoList}
        />
        {!isMinimized && (
          <>
            <div>
              {todos.map((todo, index) => (
                <TodoItem
                  key={todo.id}
                  todo={todo.text}
                  completed={todo.completed}
                  onToggle={() => toggleTodo(todo.id, todos, listId, setTodos)}
                  onDelete={() => deleteTodo(todo.id, todos, listId, setTodos)}
                  onEdit={(newText) => handleEditTodo(todo.id, newText)}
                  isEditingTitle={isEditingTitle}
                />
              ))}
            </div>
            <StyledTodoInputContainer isEditingTitle={isEditingTitle}>
              <TodoInput
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(event) => handleKeyDown(event, newTodo, listId, setTodos, setNewTodo)}
                placeholder="Add a new to-do"
                disabled={isEditingTitle}
              />
            </StyledTodoInputContainer>
          </>
        )}
      </StyledTodoListContainer>
    </StyledTodoListWrapper>
  );
};

export default TodoList;
