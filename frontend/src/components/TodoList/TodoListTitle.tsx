import React, { useRef, useEffect, useState } from 'react';
import { StyledHeader, StyledHeaderEditBox } from '../../styled-components/TodoList/TodoListTitle';
import ClearIcon from '@mui/icons-material/Clear';
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
  setIsEditingTitle: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMinimize: () => void;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>, setTitle: React.Dispatch<React.SetStateAction<string>>) => void;
  handleTitleBlur: () => void;
  clearTodos: () => void;
  deleteTodoList?: () => void;
  addTodoList: (todoLists: TodoListType[], setTodoLists: React.Dispatch<React.SetStateAction<TodoListType[]>>, setActiveListIndex: React.Dispatch<React.SetStateAction<number>>) => void;
  todoLists: TodoListType[];
  setActiveListIndex: React.Dispatch<React.SetStateAction<number>>;
  setTodoLists: React.Dispatch<React.SetStateAction<TodoListType[]>>;
  activeListIndex: number;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  revertTitle: (originalTitle: string) => void; // Add this prop
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
  setTodoLists,
  activeListIndex,
  setTitle,
  revertTitle // Destructure the prop
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [originalTitle, setOriginalTitle] = useState(title); // Store the original title
  const [previousTitle, setPreviousTitle] = useState(title); // Store the previous title before editing

  useEffect(() => {
    if (isEditingTitle && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditingTitle]);

  useEffect(() => {
    console.log("Title updated:", title);
    setOriginalTitle(title); // Update original title when the title prop changes
  }, [title]);

  const handleStartEdit = () => {
    console.log("handleStartEdit called");
    setPreviousTitle(title); // Store the current title when editing starts
    setIsEditingTitle(true);
  };

  const handleCancelEdit = () => {
    console.log("handleCancelEdit called");
    console.log("Cancel edit. Reverting to previous title:", previousTitle);
    setTitle(previousTitle); // Revert to previous title in local state
    revertTitle(previousTitle); // Call revertTitle to update parent state
    setIsEditingTitle(false);
    console.log("Local title state after cancel:", previousTitle);
  };

  const handleSaveEdit = () => {
    console.log("handleSaveEdit called");
    console.log("Save edit. New title:", title);
    setOriginalTitle(title); // Set the new title as the original title
    setIsEditingTitle(false);
    handleTitleBlur();
    console.log("Local title state after save:", title);
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
          onChange={(e) => {
            console.log("Title change event:", e.target.value);
            handleTitleChange(e, setTitle);
          }}
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
        <>
          <h1 onDoubleClick={handleStartEdit}>{title}</h1>
        </>
      )}
      <TodoListDropdownMenu
        todoLists={todoLists}
        setActiveListIndex={setActiveListIndex}
        addTodoList={addTodoList}
        setTodoLists={setTodoLists}
      />
      {isEditingTitle ? (
        <>
          <span className="edit-icon" onClick={handleSaveEdit}><CheckIcon /></span>
          <span className="clear-all-icon" onClick={handleCancelEdit}><ClearIcon /></span>
        </>
      ) : (
        <>
          <span className="edit-icon" onClick={handleStartEdit}><EditIcon /></span>
          <span className="clear-all-icon" onClick={clearTodos}><DeleteIcon /></span>
          {deleteTodoList && (
            <span className="delete-list-icon" onClick={deleteTodoList}><BlockIcon /></span>
          )}
        </>
      )}
    </StyledHeader>
  );
};

export default TodoListTitle;
