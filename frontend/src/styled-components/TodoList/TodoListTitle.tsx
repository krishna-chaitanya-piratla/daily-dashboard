import styled from 'styled-components';

export const StyledHeader = styled.div`
  display: flex;
  justify-content: flex-start; 
  align-items: center;
  padding: 10px;
  position: relative;
  color: var(--todo-text-color-primary);

  h1 {
    margin: 0;
    font-size: 24px;
    display: inline-block;
    cursor: pointer;
    margin-right: 5px; 
  }

  .edit-icon,
  .clear-all-icon,
  .delete-list-icon, .minimize-icon, .todo-list-dropdown-icon { 
    visibility: hidden;
    cursor: pointer;
    font-size: 1.2em;
  }

  &:hover .edit-icon,
  &:hover .clear-all-icon,
  &:hover .delete-list-icon,
  &:hover .minimize-icon,
  &:hover .todo-list-dropdown-icon  {
    visibility: visible;
  }

  .edit-icon {
    margin-left: auto;
    margin-right: 5px; /* Adjust spacing as needed */
  }

  .minimize-icon {
    margin-right: 5px; /* Adjust spacing as needed */
    visibility: hidden; /* Always visible */

    &:hover .minimize-icon {
        visibility: visible;
    }
  }

  .clear-all-icon {
    margin-right: 5px;
  }

  .delete-list-icon {
    margin-right: 5px;
  }
`;

export const StyledHeaderEditBox = styled.input`
  width: 80%;
  height: 2.5rem;
  background: none;
  border: none;
  border-radius: 10px;
  padding: 0 1rem;
  
  &:focus, &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 0.5px #999;
    color: gray;
  }

  &:hover {
    outline: none;
    box-shadow: 0 0 0 0.5px #999;
  }

  &::placeholder {
    color: gray;
  }
`;

export const StyledDropDownIcon = styled.div`
  cursor: pointer;
  margin-right: 5px; /* Adjust spacing as needed */
  color: white;
  &:hover {
    color: #ccc;
  }
`;
