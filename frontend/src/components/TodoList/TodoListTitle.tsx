import React, { useRef, useEffect, useState, MouseEvent } from 'react';
import { StyledHeader, StyledHeaderEditBox, StyledDropDownIcon } from '../../styled-components/TodoList/TodoListTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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
  todoLists: { id: string, title: string }[]; // Add this prop to receive the list of todo lists
  setActiveListIndex: (index: number) => void; // Add this prop to set the active list
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
  setActiveListIndex
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (isEditingTitle && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select(); // Automatically select the text for convenience
    }
  }, [isEditingTitle]);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (index: number) => {
    setActiveListIndex(index);
    handleClose();
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
      <StyledDropDownIcon onClick={handleClick}>
        <ArrowDropDownIcon className="todo-list-dropdown-icon" />
      </StyledDropDownIcon>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {todoLists.map((list, index) => (
          <MenuItem key={list.id} onClick={() => handleMenuItemClick(index)}>
            {list.title}
          </MenuItem>
        ))}
      </Menu>
      <span className="edit-icon" onClick={() => setIsEditingTitle(true)}>&#x270E;</span> {/* Pencil icon */}
      <span className="clear-all-icon" onClick={clearTodos}><DeleteIcon /></span> {/* Clear all icon */}
      <span className="delete-list-icon" onClick={deleteTodoList}><BlockIcon /></span> {/* New delete list icon */}
    </StyledHeader>
  );
};

export default TodoListTitle;
