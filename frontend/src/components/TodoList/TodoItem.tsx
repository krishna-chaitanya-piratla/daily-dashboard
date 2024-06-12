import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Tooltip } from '@mui/material';
import { StyledTodoItem, StyledItemDeleteIcon, StyledTodoEditInput, StyledEditIconContainer, StyledToggleIconContainer, StyledReorderIconContainer, StyledTodoItemBorder } from '../../styled-components/TodoList/TodoItem';
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ReorderIcon from '@mui/icons-material/Reorder';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useStore } from '../../store/StoreProvider';

interface TodoItemProps {
  id: string;
}

const TodoItem: React.FC<TodoItemProps> = observer(({ id }) => {
  const { todoStore } = useStore();
  const todo = todoStore.todos.find(t => t.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo?.text || '');
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
    if (editText.trim() && todo) {
      todoStore.editTodo(todo.id, editText);
    } else {
      setEditText(todo?.text || ''); // Revert to original text if input is empty
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  if (!todo) {
    return null; // If todo is not found, do not render anything
  }

  return (
    <>
    <StyledTodoItem
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      completed={todo.completed}
      isEditing={isEditing}
      isEditingTitle={todoStore.isEditingTitle}
    >
      <Tooltip title="Reorder" arrow>
        <StyledReorderIconContainer className="reorder-icon" completed={todo.completed}>
          <ReorderIcon />
        </StyledReorderIconContainer>
      </Tooltip>
      <Tooltip title={todo.completed ? "Mark as Incomplete" : "Mark as Complete"} arrow>
        <StyledToggleIconContainer completed={todo.completed} onClick={isEditing || todoStore.isEditingTitle ? undefined : () => todoStore.toggleTodo(todo.id)}>
          {todo.completed ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
        </StyledToggleIconContainer>
      </Tooltip>
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
          {todo.text}
          <Tooltip title="Edit Todo" arrow>
            <StyledEditIconContainer
              completed={todo.completed}
              className="edit-icon"
              onClick={(e) => {
                e.stopPropagation();
                if (!todoStore.isEditingTitle) {
                  setIsEditing(true);
                }
              }}
            >
              <EditIcon />
            </StyledEditIconContainer>
          </Tooltip>
          <Tooltip title="Delete Todo" arrow>
            <StyledItemDeleteIcon
              completed={todo.completed}
              className="delete-item-icon"
              onClick={(e) => {
                e.stopPropagation();
                if (!todoStore.isEditingTitle) {
                  todoStore.deleteTodo(todo.id);
                }
              }}
            >
              &#x1F5D1; {/* Unicode for delete icon */}
            </StyledItemDeleteIcon>
          </Tooltip>
        </>
      )}
    </StyledTodoItem>
    <StyledTodoItemBorder />
    </>
  );
});

export default TodoItem;
