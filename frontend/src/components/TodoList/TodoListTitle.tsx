import React, { useRef, useEffect } from 'react';
import { StyledHeader, StyledHeaderEditBox, StyledDropDownIcon } from '../../styled-components/TodoList/TodoListTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

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
  addTodoList: () => void; // Add this prop
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
  addTodoList, // Add this prop
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingTitle && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select(); // Automatically select the text for convenience
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
      <StyledDropDownIcon>
        <ArrowDropDownIcon className='todo-list-dropdown-icon'/>
      </StyledDropDownIcon>
      <span className="edit-icon" onClick={() => setIsEditingTitle(true)}>&#x270E;</span> {/* Pencil icon */}
      <span className="clear-all-icon" onClick={clearTodos}><DeleteIcon /></span> {/* Clear all icon */}
      <span className="delete-list-icon" onClick={deleteTodoList}><BlockIcon /></span> {/* New delete list icon */}
    </StyledHeader>
  );
};

export default TodoListTitle;
