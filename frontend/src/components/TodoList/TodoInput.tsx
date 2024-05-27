import React, { useState } from "react";
import { StyledTodoInput } from "../../styled-components/Todo";

interface TodoInputProps {
    type: 'text';
    value: string;
    onChange: (e: any) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    placeholder: string;
  }

const TodoInput: React.FC<TodoInputProps> = ({ type, value, onChange, onKeyDown, placeholder}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <StyledTodoInput 
            type={type} 
            value={value} 
            onChange={onChange} 
            onKeyDown={onKeyDown} 
            placeholder={isHovered ? placeholder : ''}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        />
    )
};

export default TodoInput;