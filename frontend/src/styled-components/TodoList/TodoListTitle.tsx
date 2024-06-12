import styled from 'styled-components';

export const StyledHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5rem;
  position: relative;
  color: var(--todo-text-color-primary);

  h1 {
    margin: 0;
    font-size: var(--todo-title-font-size);
    display: inline-block;
    cursor: pointer;
    margin-right: 0.25rem;
  }

  .edit-icon,
  .clear-all-icon,
  .delete-list-icon,
  .minimize-icon,
  .todo-list-dropdown-icon {
    visibility: hidden;
    cursor: pointer;
    font-size: var(--icon-font-size);
  }

  &:hover .edit-icon,
  &:hover .clear-all-icon,
  &:hover .delete-list-icon,
  &:hover .minimize-icon,
  &:hover .todo-list-dropdown-icon {
    visibility: visible;
  }

  .edit-icon {
    margin-left: auto;
    margin-right: 0.25rem; /* Adjust spacing as needed */
  }

  .minimize-icon {
    margin-right: 0.25rem; /* Adjust spacing as needed */
    visibility: visible; /* Always visible */
  }

  .clear-all-icon {
    margin-right: 0.25rem;
  }

  .delete-list-icon {
    margin-right: 0.25rem;
  }

  @media (max-width: 1024px) {
    padding: 0.25rem;
    h1 {
      font-size: 1.25rem; /* Adjust font size for smaller screens */
    }
  }
`;

export const StyledHeaderEditBox = styled.input`
  font-size: var(--todo-title-font-size); /* Match the font size of h1 */
  font-weight: 800;
  color: var(--todo-text-color-primary); /* Match the color of h1 */
  width: auto;
  flex: 1; /* Allow the input to take available space */
  margin: 0;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  transition: border-bottom 0.2s ease-in-out;

  &:focus,
  &:focus-visible {
    outline: none;
    border-bottom: 2px solid var(--input-focus-border-color);
  }

  &:hover {
    border-bottom: 2px solid var(--input-hover-border-color);
  }

  &::placeholder {
    color: var(--input-placeholder-color);
  }

  @media (max-width: 1024px) {
    font-size: 1.25rem; /* Adjust font size for smaller screens */
  }
`;

export const StyledDropDownIcon = styled.div`
  cursor: pointer;
  margin-right: 0.25rem; /* Adjust spacing as needed */
  color: var(--dropdown-icon-color);
  &:hover {
    color: var(--dropdown-icon-hover-color);
  }
`;
