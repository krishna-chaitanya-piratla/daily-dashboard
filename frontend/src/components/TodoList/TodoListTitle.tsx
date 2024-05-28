import React from 'react';
import { StyledHeader, StyledHeaderEditBox, StyledDeleteIcon } from '../../styled-components/Todo';

interface TodoListTitleProps {
  title: string;
  isEditingTitle: boolean;
  setIsEditingTitle: (isEditing: boolean) => void;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTitleBlur: () => void;
  clearTodos: () => void;
}

const TodoListTitle: React.FC<TodoListTitleProps> = ({
  title,
  isEditingTitle,
  setIsEditingTitle,
  handleTitleChange,
  handleTitleBlur,
  clearTodos
}) => {
  return (
    <StyledHeader className="handle">
      {isEditingTitle ? (
        <StyledHeaderEditBox
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
      <StyledDeleteIcon onClick={clearTodos}>&#x1F5D1;</StyledDeleteIcon>
    </StyledHeader>
  );
};

export default TodoListTitle;
