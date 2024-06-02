import React from "react";
import { StyledTodoInput } from "../../styled-components/TodoList/TodoInput";

interface TodoInputProps {
  type: 'text';
  value: string;
  onChange: (e: any) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  disabled: boolean;
}

const TodoInput: React.FC<TodoInputProps> = ({ type, value, onChange, onKeyDown, placeholder, disabled }) => {
  return (
    <StyledTodoInput 
      type={type} 
      value={value} 
      onChange={onChange} 
      onKeyDown={onKeyDown} 
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default TodoInput;
