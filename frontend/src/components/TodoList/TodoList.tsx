import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoListTitle from './TodoListTitle';
import { StyledTodoListContainer, StyledTodoListWrapper } from '../../styled-components/TodoList/TodoList';
import { StyledTodoInputContainer } from '../../styled-components/TodoList/TodoInput';
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

export interface TodoListType {
  id: string;
  title: string;
  todos: Todo[];
}

interface TodoListProps {
  todoLists: TodoListType[];
  removeTodoList: (listId: string) => void;
  addTodoList: () => void;
}

const TodoList: React.FC<TodoListProps> = ({ todoLists, removeTodoList, addTodoList }) => {
  const [activeListIndex, setActiveListIndex] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [title, setTitle] = useState<string>(todoLists[0]?.title || '');
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  useEffect(() => {
    if (todoLists.length > 0) {
      setTodos(todoLists[activeListIndex].todos.sort((a, b) => Number(a.completed) - Number(b.completed)));
      setTitle(todoLists[activeListIndex].title);
    }
  }, [activeListIndex, todoLists]);

  const handleEditTodo = (todoId: string, newText: string) => {
    editTodo(todoId, newText, todos, todoLists[activeListIndex].id, setTodos);
  };

  const handleDeleteTodoList = async () => {
    await deleteTodoList(todoLists[activeListIndex].id);
    removeTodoList(todoLists[activeListIndex].id);
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
          handleTitleBlur={() => handleTitleBlur(title, todoLists[activeListIndex].id, setIsEditingTitle)}
          clearTodos={() => clearTodos(todoLists[activeListIndex].id, setTodos)}
          deleteTodoList={handleDeleteTodoList}
          addTodoList={addTodoList}
          todoLists={todoLists} // Pass the todoLists array
          setActiveListIndex={setActiveListIndex} // Pass the function to set the active list index
        />
        {!isMinimized && (
          <>
            <div>
              {todos.map((todo, index) => (
                <TodoItem
                  key={todo.id}
                  todo={todo.text}
                  completed={todo.completed}
                  onToggle={() => toggleTodo(todo.id, todos, todoLists[activeListIndex].id, setTodos)}
                  onDelete={() => deleteTodo(todo.id, todos, todoLists[activeListIndex].id, setTodos)}
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
                onKeyDown={(event) => handleKeyDown(event, newTodo, todoLists[activeListIndex].id, setTodos, setNewTodo)}
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
