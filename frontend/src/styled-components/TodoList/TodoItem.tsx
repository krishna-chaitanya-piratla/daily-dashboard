import styled from 'styled-components';

export const StyledTodoItem = styled.div<{ completed: boolean; isEditing?: boolean; isEditingTitle?: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 30px;
  border-bottom: 0.5px dashed var(--todo-item-border-color);
  text-align: left;
  color: ${(props) => (props.completed ? 'var(--todo-text-color-secondary)' : 'var(--todo-text-color-primary)')};
  word-wrap: break-word;
  overflow-wrap: break-word; /* Ensures long words break properly */
  white-space: normal; /* Allows wrapping */
  position: relative;
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
  background-color: inherit;
  pointer-events: ${(props) => (props.isEditingTitle ? 'none' : 'auto')}; /* Disable interaction */
  padding-right: 60px;
  margin-left: -1.35rem;

  &:hover .delete-item-icon,
  &:hover .edit-icon,
  &:hover .reorder-icon {
    visibility: visible;
  }
`;

export const StyledTodoEditInput = styled.input`
  width: calc(100% - 40px); /* Adjust based on padding and delete icon */
  background: none;
  border: none;
  padding: 10px 10px 10px 30px;
  box-sizing: border-box;
  color: var(--todo-edit-input-color);

  &:focus,
  &:focus-visible {
    outline: none;
    background-color: var(--todo-edit-input-focus-bg);
  }
`;

export const StyledItemDeleteIcon = styled.span<{ completed: boolean }>`
  visibility: hidden;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.5em;
  color: ${(props) => (props.completed ? 'var(--todo-text-color-secondary)' : 'var(--todo-text-color-primary)')};

  &:hover {
    color: ${(props) => (props.completed ? 'var(--todo-text-color-secondary)' : 'var(--todo-text-color-primary)')};
  }
`;

export const StyledEditIconContainer = styled.div<{ completed: boolean }>`
  visibility: hidden;
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.5em;
  color: ${(props) => (props.completed ? 'var(--todo-text-color-secondary)' : 'var(--todo-text-color-primary)')};

  &:hover {
    color: ${(props) => (props.completed ? 'var(--todo-text-color-secondary)' : 'var(--todo-text-color-primary)')};
  }
`;

export const StyledToggleIconContainer = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
  color: ${(props) => (props.completed ? 'var(--todo-text-color-secondary)' : 'var(--todo-text-color-primary)')};

  &:hover {
    color: ${(props) => (props.completed ? 'var(--todo-text-color-secondary)' : 'var(--todo-text-color-primary)')};
  }
`;

export const StyledReorderIconContainer = styled.div<{ completed: boolean }>`
  visibility: hidden;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
  color: ${(props) => (props.completed ? 'var(--todo-text-color-secondary)' : 'var(--todo-text-color-primary)')};

  &:hover {
    color: ${(props) => (props.completed ? 'var(--todo-text-color-secondary)' : 'var(--todo-text-color-primary)')};
  }
`;
