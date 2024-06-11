import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/StoreProvider';
import { StyledTodoInput } from '../../styled-components/TodoList/TodoInput';

const TodoInput: React.FC = observer(() => {
  const { todoStore } = useStore();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      todoStore.addTodo();
    }
  };

  return (
    <StyledTodoInput 
      type="text" 
      value={todoStore.newTodo} 
      onChange={(e) => todoStore.setNewTodo(e.target.value)} 
      onKeyDown={handleKeyDown} 
      placeholder="Add a new to-do"
      disabled={todoStore.isEditingTitle}
    />
  );
});

export default TodoInput;
