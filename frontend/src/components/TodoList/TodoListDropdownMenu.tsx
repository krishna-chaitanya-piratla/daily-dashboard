import React, { useState, MouseEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { StyledMenu, StyledMenuItem, StyledDropDownIcon } from '../../styled-components/TodoList/TodoListDropdownMenu';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useStore } from '../../store/StoreProvider';

const TodoListDropdownMenu: React.FC = observer(() => {
  const { todoStore } = useStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (index: number) => {
    todoStore.setActiveListIndex(index);
    handleClose();
  };

  const handleAddTodoList = () => {
    todoStore.addTodoList();
    handleClose();
  };

  return (
    <>
      <StyledDropDownIcon onClick={handleClick}>
        <ArrowDropDownIcon className="todo-list-dropdown-icon" />
      </StyledDropDownIcon>
      <StyledMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {todoStore.todoLists.map((list, index) => (
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
});

export default TodoListDropdownMenu;
