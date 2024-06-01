import styled from 'styled-components';

export const StyledTodoInput = styled.input`
  width: 80%;
  height: 2.5rem;
  background: none;
  border: none;
  border-radius: 10px;
  padding: 0 1rem;
  &:focus,
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 0.5px #999;
    color: var(--widget-text-color-secondary);
  }
  &:hover {
    outline: none;
    box-shadow: 0 0 0 0.5px #999;
  }
  &::placeholder {
    color: gray;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const StyledTodoInputContainer = styled.div<{ isEditingTitle: boolean }>`
  pointer-events: ${(props) => (props.isEditingTitle ? 'none' : 'auto')};
`;
