import React, { useState, useRef, useEffect } from 'react';
import { StyledTodoItem, StyledItemDeleteIcon, StyledTodoEditInput, StyledEditIconContainer, StyledToggleIconContainer, StyledReorderIconContainer } from '../../styled-components/TodoList/TodoItem';
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ReorderIcon from '@mui/icons-material/Reorder';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TodoItemProps {
  id: string;
  todo: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (newText: string) => void;
  isEditingTitle: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, todo, completed, onToggle, onDelete, onEdit, isEditingTitle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo);
  const inputRef = useRef<HTMLInputElement>(null);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

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

  console.log('Rendering TodoItem:', { todo, completed, isEditing });

  return (
    <StyledTodoItem
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      completed={completed}
      isEditing={isEditing}
      isEditingTitle={isEditingTitle}
    >
      <StyledReorderIconContainer className="reorder-icon" completed={completed}>
        <ReorderIcon />
      </StyledReorderIconContainer>
      <StyledToggleIconContainer completed={completed} onClick={isEditing || isEditingTitle ? undefined : onToggle}>
        {completed ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
      </StyledToggleIconContainer>
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
            completed={completed}
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
          <StyledItemDeleteIcon
            completed={completed}
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
        </>
      )}
    </StyledTodoItem>
  );
};

export default TodoItem;
