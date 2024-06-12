import styled from 'styled-components';

export const StyledTodoItem = styled.div<{ completed: boolean; isEditing?: boolean; isEditingTitle?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.625rem 0.625rem 0.625rem 1.875rem;
  text-align: left;
  color: ${(props) => (props.completed ? 'var(--todo-text-color-secondary)' : 'var(--todo-text-color-primary)')};
  word-wrap: break-word;
  overflow-wrap: break-word; /* Ensures long words break properly */
  white-space: normal; /* Allows wrapping */
  position: relative;
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
  background-color: inherit;
  pointer-events: ${(props) => (props.isEditingTitle ? 'none' : 'auto')}; /* Disable interaction */
  padding-right: 3.75rem;
  margin-left: -1.35rem;

  &:hover .delete-item-icon,
  &:hover .edit-icon,
  &:hover .reorder-icon {
    visibility: visible;
  }

  @media (max-width: 1024px) {
    padding: 0.5rem; /* Adjust padding for smaller screens */
    margin-left: -1rem;
  }
`;

export const StyledTodoItemBorder = styled.hr`
  width: 100%;
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0));
`;

export const StyledTodoEditInput = styled.input`
  font-family: 'Wotfard', sans-serif;
  font-size: 1rem;
  width: calc(100% - 2.5rem); /* Adjust based on padding and delete icon */
  background: none;
  border: none;
  margin: 0;
  padding:0;
  box-sizing: border-box;
  color: var(--todo-edit-input-color);

  &:focus,
  &:focus-visible {
    outline: none;
    background-color: var(--todo-edit-input-focus-bg);
  }

  @media (max-width: 1024px) {
    padding: 0.5rem; /* Adjust padding for smaller screens */
  }
`;

export const StyledItemDeleteIcon = styled.span<{ completed: boolean }>`
  visibility: hidden;
  position: absolute;
  right: 0.625rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.5em;
  color: ${(props) => (props.completed ? 'var(--todo-text-color-secondary)' : 'var(--todo-text-color-primary)')};

  &:hover {
    color: ${(props) => (props.completed ? 'var(--todo-text-color-secondary)' : 'var(--todo-text-color-primary)')};
  }

  @media (max-width: 1024px) {
    font-size: 1.25em; /* Adjust font size for smaller screens */
  }
`;

export const StyledEditIconContainer = styled.div<{ completed: boolean }>`
  visibility: hidden;
  position: absolute;
  right: 2.5rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.5em;
  color: ${(props) => (props.completed ? 'var(--todo-text-color-secondary)' : 'var(--todo-text-color-primary)')};

  &:hover {
    color: ${(props) => (props.completed ? 'var(--todo-text-color-secondary)' : 'var(--todo-text-color-primary)')};
  }

  @media (max-width: 1024px) {
    font-size: 1.25em; /* Adjust font size for smaller screens */
  }
`;

export const StyledToggleIconContainer = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 0.625rem;
  color: ${(props) => (props.completed ? 'var(--todo-text-color-secondary)' : 'var(--todo-text-color-primary)')};

  &:hover {
    color: ${(props) => (props.completed ? 'var(--todo-text-color-secondary)' : 'var(--todo-text-color-primary)')};
  }

  @media (max-width: 1024px) {
    font-size: 1.25em; /* Adjust font size for smaller screens */
  }
`;

export const StyledReorderIconContainer = styled.div<{ completed: boolean }>`
  visibility: hidden;
  display: flex;
  align-items: center;
  cursor: grab;
  margin-right: 0.625rem;
  color: ${(props) => (props.completed ? 'var(--todo-text-color-secondary)' : 'var(--todo-text-color-primary)')};

  &:hover {
    color: ${(props) => (props.completed ? 'var(--todo-text-color-secondary)' : 'var(--todo-text-color-primary)')};
  }

  &:active {
    cursor: grabbing;
  }

  @media (max-width: 1024px) {
    font-size: 1.25em; /* Adjust font size for smaller screens */
  }
`;
