import React, { useState, MouseEvent } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import { StyledDropDownIcon } from '../../styled-components/TodoList/TodoListDropdownMenu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface TodoListDropdownMenuProps {
  todoLists: { id: string, title: string }[];
  setActiveListIndex: (index: number) => void;
  addTodoList: () => void;
}

const TodoListDropdownMenu: React.FC<TodoListDropdownMenuProps> = ({ todoLists, setActiveListIndex, addTodoList }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
    <>
      <StyledDropDownIcon onClick={handleClick}>
        <ArrowDropDownIcon className="todo-list-dropdown-icon" />
      </StyledDropDownIcon>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {todoLists.map((list, index) => (
          <MenuItem key={list.id} onClick={() => handleMenuItemClick(index)}>
            {list.title}
          </MenuItem>
        ))}
        <MenuItem onClick={addTodoList}>
          <AddIcon /> Add new To-do list
        </MenuItem>
      </Menu>
    </>
  );
};

export default TodoListDropdownMenu;
