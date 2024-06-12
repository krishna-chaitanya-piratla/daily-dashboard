import styled from 'styled-components';

export const StyledTodoInput = styled.input`
  font-family: 'Wotfard', sans-serif;
  font-size: 1rem;
  width: 80%;
  height: 2.5rem;
  background: none;
  border: none;
  border-radius: 10px;
  padding: 0 1rem;
  margin: 0.5rem;
  &:focus,
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 0.5px var(--input-focus-box-shadow-color);
    color: var(--todo-text-color-primary);
  }
  &:hover {
    outline: none;
    box-shadow: 0 0 0 0.5px var(--input-hover-box-shadow-color);
  }
  &::placeholder {
    color: var(--input-placeholder-color);
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  @media (max-width: 1024px) {
    height: 2rem; /* Adjust height for smaller screens */
  }
`;

export const StyledTodoInputContainer = styled.div<{ isEditingTitle: boolean }>`
  pointer-events: ${(props) => (props.isEditingTitle ? 'none' : 'auto')};
`;
