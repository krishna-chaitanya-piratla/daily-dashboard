import React, { useRef, useEffect } from 'react';
import { StyledHeader, StyledHeaderEditBox } from '../../styled-components/Todo';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';

interface TodoListTitleProps {
  title: string;
  isEditingTitle: boolean;
  setIsEditingTitle: (isEditing: boolean) => void;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTitleBlur: () => void;
  clearTodos: () => void;
  deleteTodoList: () => void;
}

const TodoListTitle: React.FC<TodoListTitleProps> = ({
  title,
  isEditingTitle,
  setIsEditingTitle,
  handleTitleChange,
  handleTitleBlur,
  clearTodos,
  deleteTodoList
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
          <span className="edit-icon" onClick={() => setIsEditingTitle(true)}>&#x270E;</span> {/* Pencil icon */}
        </>
      )}
      <span className="clear-all-icon" onClick={clearTodos}><DeleteIcon /></span> {/* Clear all icon */}
      <span className="delete-list-icon" onClick={deleteTodoList}><BlockIcon /></span> {/* New delete list icon */}
    </StyledHeader>
  );
};

export default TodoListTitle;
