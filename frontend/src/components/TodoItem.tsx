import React from 'react';
import { StyledTodoItem } from '../styled-components/Todo';

interface TodoItemProps {
  todo: string;
  completed: boolean;
  onToggle: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, completed, onToggle }) => {
  return (
    <StyledTodoItem
      onClick={onToggle}
      style={{
        textDecoration: completed ? 'line-through' : 'none',
        padding: '10px',
        borderBottom: '1px solid #ccc'
      }}
    >
      {todo}
    </StyledTodoItem>
  );
};

export default TodoItem;
