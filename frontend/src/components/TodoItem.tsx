import React from 'react';
import { StyledTodoItem, StyledItemDeleteIcon } from '../styled-components/Todo';

interface TodoItemProps {
  todo: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, completed, onToggle, onDelete }) => {
  return (
    <StyledTodoItem onClick={onToggle} completed={completed}>
      <StyledItemDeleteIcon className="delete-icon" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
        &#x1F5D1; {/* Unicode for delete icon */}
      </StyledItemDeleteIcon>
      {todo}
    </StyledTodoItem>
  );
};

export default TodoItem;
