import React, { useState, useRef, useEffect } from 'react';
import { StyledTodoItem, StyledItemDeleteIcon, StyledTodoEditInput, StyledEditIconContainer } from '../../styled-components/Todo';
import EditIcon from '@mui/icons-material/Edit';

interface TodoItemProps {
  todo: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (newText: string) => void;
  isEditingTitle: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, completed, onToggle, onDelete, onEdit, isEditingTitle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    if (!isEditingTitle) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editText.trim()) {
      onEdit(editText);
    } else {
      setEditText(todo); // Revert to original text if input is empty
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  return (
    <StyledTodoItem
      onClick={isEditing || isEditingTitle ? undefined : onToggle}
      completed={completed}
      onDoubleClick={handleDoubleClick}
      isEditing={isEditing}
      isEditingTitle={isEditingTitle}
    >
      <StyledItemDeleteIcon
        className="delete-item-icon"
        onClick={(e) => {
          e.stopPropagation();
          if (!isEditingTitle) {
            onDelete();
          }
        }}
      >
        &#x1F5D1; {/* Unicode for delete icon */}
      </StyledItemDeleteIcon>
      {isEditing ? (
        <StyledTodoEditInput
          ref={inputRef}
          type="text"
          value={editText}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleBlur();
            }
          }}
        />
      ) : (
        <>
          {todo}
          <StyledEditIconContainer
            className="edit-icon"
            onClick={(e) => {
              e.stopPropagation();
              if (!isEditingTitle) {
                setIsEditing(true);
              }
            }}
          >
            <EditIcon />
          </StyledEditIconContainer>
        </>
      )}
    </StyledTodoItem>
  );
};

export default TodoItem;
