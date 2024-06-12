import React, { useRef, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Tooltip } from '@mui/material';
import { StyledHeader, StyledHeaderEditBox, StyledAddIcon } from '../../styled-components/TodoList/TodoListTitle';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add'; // Add this import
import TodoListDropdownMenu from './TodoListDropdownMenu';
import { useStore } from '../../store/StoreProvider';

const TodoListTitle: React.FC = observer(() => {
  const { todoStore } = useStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [originalTitle, setOriginalTitle] = useState(todoStore.title ? todoStore.title : 'New List');
  const [previousTitle, setPreviousTitle] = useState(todoStore.title ? todoStore.title : 'New List');

  useEffect(() => {
    if (todoStore.isEditingTitle && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [todoStore.isEditingTitle]);

  useEffect(() => {
    setOriginalTitle(todoStore.title);
  }, [todoStore.title]);

  const handleStartEdit = () => {
    setPreviousTitle(todoStore.title);
    todoStore.setIsEditingTitle(true);
  };

  const handleCancelEdit = () => {
    todoStore.setTitle(previousTitle);
    todoStore.setIsEditingTitle(false);
  };

  const handleSaveEdit = () => {
    const newTitle = todoStore.title.trim() === '' ? 'Unnamed Todo List' : todoStore.title;
    todoStore.setTitle(newTitle);
    setOriginalTitle(newTitle);
    todoStore.setIsEditingTitle(false);
    todoStore.handleTitleBlur();
  };

  const handleAddTodoList = () => {
    todoStore.addTodoList();
  };

  const toggleMinimize = () => {
    todoStore.setIsMinimized(!todoStore.isMinimized);
  };

  return (
    <StyledHeader className="handle">
      <span className="minimize-icon" onClick={toggleMinimize}>
        {todoStore.isMinimized ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </span>
      {todoStore.isEditingTitle ? (
        <StyledHeaderEditBox
          ref={inputRef}
          type="text"
          value={todoStore.title}
          onChange={(e) => todoStore.handleTitleChange(e)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSaveEdit();
            } else if (e.key === 'Escape') {
              handleCancelEdit();
            }
          }}
          autoFocus
        />
      ) : (
        <h1 onDoubleClick={handleStartEdit}>{todoStore.title}</h1>
      )}
      {todoStore.todoLists.length === 0 ? (
        <Tooltip title="Add new To-do list" arrow>
          <StyledAddIcon className="add-icon" onClick={handleAddTodoList}>
            <AddIcon />
          </StyledAddIcon>
        </Tooltip>
      ) : (<TodoListDropdownMenu />)}
      {todoStore.todoLists.length > 0 && (
        <>
          {todoStore.isEditingTitle ? (
            <>
              <Tooltip title="Save" arrow>
                <span className="edit-icon" onClick={handleSaveEdit}><CheckIcon /></span>
              </Tooltip>
              <Tooltip title="Discard" arrow>
                <span className="clear-all-icon" onClick={handleCancelEdit}><ClearIcon /></span>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Edit Title" arrow>
                <span className="edit-icon" onClick={handleStartEdit}><EditIcon /></span>
              </Tooltip>
              <Tooltip title="Clear All Todos" arrow>
                <span className="clear-all-icon" onClick={() => todoStore.clearTodos()}><DeleteIcon /></span>
              </Tooltip>
              <Tooltip title="Delete Todo List" arrow>
                <span className="delete-list-icon" onClick={() => todoStore.removeTodoList(todoStore.activeListId)}><BlockIcon /></span>
              </Tooltip>
            </>
          )}
        </>
      )}
    </StyledHeader>
  );
});

export default TodoListTitle;
