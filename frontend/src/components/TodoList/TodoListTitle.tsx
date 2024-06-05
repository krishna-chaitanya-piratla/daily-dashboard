import React, { useRef, useEffect, useState } from 'react';
import { StyledHeader, StyledHeaderEditBox } from '../../styled-components/TodoList/TodoListTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import TodoListDropdownMenu from './TodoListDropdownMenu';
import { TodoListType } from './TodoList';

interface TodoListTitleProps {
  title: string;
  isEditingTitle: boolean;
  isMinimized: boolean;
  setIsEditingTitle: (isEditing: boolean) => void;
  toggleMinimize: () => void;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTitleBlur: () => void;
  clearTodos: () => void;
  deleteTodoList?: () => void;
  addTodoList: (todoLists: TodoListType[], setTodoLists: React.Dispatch<React.SetStateAction<TodoListType[]>>, setActiveListIndex: React.Dispatch<React.SetStateAction<number>>) => void;
  todoLists: TodoListType[];
  setActiveListIndex: React.Dispatch<React.SetStateAction<number>>;
  setTodoLists: React.Dispatch<React.SetStateAction<TodoListType[]>>;
}

const TodoListTitle: React.FC<TodoListTitleProps> = ({
  title,
  isEditingTitle,
  isMinimized,
  setIsEditingTitle,
  toggleMinimize,
  handleTitleChange,
  handleTitleBlur,
  clearTodos,
  deleteTodoList,
  addTodoList,
  todoLists,
  setActiveListIndex,
  setTodoLists
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentTitle, setCurrentTitle] = useState(title);

  useEffect(() => {
    if (isEditingTitle && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditingTitle]);

  useEffect(() => {
    setCurrentTitle(title);
  }, [title]);

  const handleCheckClick = () => {
    if (currentTitle.trim() === '') {
      setCurrentTitle(title);
    } else {
      handleTitleBlur();
    }
    setIsEditingTitle(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCheckClick();
    } else if (e.key === 'Escape') {
      setCurrentTitle(title);
      setIsEditingTitle(false);
    }
  };

  const handleBlur = () => {
    setCurrentTitle(title);
    setIsEditingTitle(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.target.value);
  };

  return (
    <StyledHeader className="handle">
      <span className="minimize-icon" onClick={toggleMinimize}>
        {isMinimized ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </span>
      {isEditingTitle ? (
        <StyledHeaderEditBox
          ref={inputRef}
          type="text"
          value={currentTitle}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <>
          <h1 onDoubleClick={() => setIsEditingTitle(true)}>{title}</h1>
        </>
      )}
      <TodoListDropdownMenu
        todoLists={todoLists}
        setActiveListIndex={setActiveListIndex}
        addTodoList={addTodoList}
        setTodoLists={setTodoLists}
      />
      {isEditingTitle ? (
        <span className="edit-icon" onClick={handleCheckClick}>
          <CheckIcon />
        </span>
      ) : (
        <span className="edit-icon" onClick={() => setIsEditingTitle(true)}>
          <EditIcon />
        </span>
      )}
      <span className="clear-all-icon" onClick={clearTodos}><DeleteIcon /></span>
      {deleteTodoList && (
        <span className="delete-list-icon" onClick={deleteTodoList}><BlockIcon /></span>
      )}
    </StyledHeader>
  );
};

export default TodoListTitle;
