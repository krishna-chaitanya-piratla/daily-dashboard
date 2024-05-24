import React from 'react';
import { StyledTodoItem } from '../styled-components/Todo';

interface TodoItemProps {
  todo: string;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <StyledTodoItem style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      {todo}
    </StyledTodoItem>
  );
};

export default TodoItem;