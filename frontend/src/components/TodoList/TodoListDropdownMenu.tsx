import React, { useState, MouseEvent } from 'react';
import { StyledMenu, StyledMenuItem, StyledDropDownIcon } from '../../styled-components/TodoList/TodoListDropdownMenu';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { TodoListType } from './TodoList';

interface TodoListDropdownMenuProps {
  todoLists: TodoListType[];
  setActiveListIndex: React.Dispatch<React.SetStateAction<number>>;
  addTodoList: (todoLists: TodoListType[], setTodoLists: React.Dispatch<React.SetStateAction<TodoListType[]>>, setActiveListIndex: React.Dispatch<React.SetStateAction<number>>) => void;
  setTodoLists: React.Dispatch<React.SetStateAction<TodoListType[]>>;
}

const TodoListDropdownMenu: React.FC<TodoListDropdownMenuProps> = ({ todoLists, setActiveListIndex, addTodoList, setTodoLists }) => {
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

  const handleAddTodoList = () => {
    addTodoList(todoLists, setTodoLists, setActiveListIndex);
    handleClose();
  };

  return (
    <>
      <StyledDropDownIcon onClick={handleClick}>
        <ArrowDropDownIcon className="todo-list-dropdown-icon" />
      </StyledDropDownIcon>
      <StyledMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {todoLists.map((list, index) => (
          <StyledMenuItem key={list.id} onClick={() => handleMenuItemClick(index)}>
            {list.title}
          </StyledMenuItem>
        ))}
        <StyledMenuItem onClick={handleAddTodoList}>
          <AddIcon /> Add new To-do list
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
};

export default TodoListDropdownMenu;
