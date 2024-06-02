import styled from 'styled-components';

export const StyledTodoInput = styled.input`
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
    color: var(--input-focus-text-color);
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
`;

export const StyledTodoInputContainer = styled.div<{ isEditingTitle: boolean }>`
  pointer-events: ${(props) => (props.isEditingTitle ? 'none' : 'auto')};
`;
