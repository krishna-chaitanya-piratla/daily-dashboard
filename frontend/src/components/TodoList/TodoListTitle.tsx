import React, { useRef, useEffect } from 'react';
import { StyledHeader, StyledHeaderEditBox } from '../../styled-components/TodoList/TodoListTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
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
  addTodoList: () => void;
  todoLists: TodoListType[];
  setActiveListIndex: (index: number) => void;
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

  useEffect(() => {
    if (isEditingTitle && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditingTitle]);

  return (
    <StyledHeader className="handle">
      <span className="minimize-icon" onClick={toggleMinimize}>
        {isMinimized ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </span>
      {isEditingTitle ? (
        <StyledHeaderEditBox
          ref={inputRef}
          type="text"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
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
      />
      <span className="edit-icon" onClick={() => setIsEditingTitle(true)}>&#x270E;</span>
      <span className="clear-all-icon" onClick={clearTodos}><DeleteIcon /></span>
      {deleteTodoList && (
        <span className="delete-list-icon" onClick={deleteTodoList}><BlockIcon /></span>
      )}
    </StyledHeader>
  );
};

export default TodoListTitle;
