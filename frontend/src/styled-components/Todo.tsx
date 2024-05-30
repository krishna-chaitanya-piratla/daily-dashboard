import styled from 'styled-components';

export const StyledTodoInputContainer = styled.div<{ isEditingTitle: boolean }>`
  pointer-events: ${(props) => (props.isEditingTitle ? 'none' : 'auto')};
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: flex-start; 
  align-items: center;
  padding: 10px;
  position: relative;

  h1 {
    margin: 0;
    font-size: 24px;
    display: inline-block;
    cursor: pointer;
    margin-right: 5px; 
  }

  .edit-icon,
  .clear-all-icon,
  .delete-list-icon,
  .minimize-icon { 
    display: none;
    cursor: pointer;
    font-size: 1.2em;
  }

  &:hover .edit-icon,
  &:hover .clear-all-icon,
  &:hover .delete-list-icon,
  &:hover .minimize-icon {
    display: inline-block;
  }

  .minimize-icon {
    margin-left: auto; /* Adjust spacing as needed */
    margin-right: 5px; /* Adjust spacing as needed */
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
    color: gray;
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

export const StyledTodoItem = styled.div<{ completed: boolean; isEditing?: boolean; isEditingTitle?: boolean }>`
  padding: 10px 10px 10px 30px;
  border-bottom: 0.5px dashed rgba(0, 0, 0, 0.3);
  text-align: left;
  color: inherit;
  word-wrap: break-word;
  overflow-wrap: break-word; /* Ensures long words break properly */
  white-space: normal; /* Allows wrapping */
  position: relative;
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
  background-color: inherit;
  pointer-events: ${(props) => (props.isEditingTitle ? 'none' : 'auto')}; /* Disable interaction */

  &:hover .delete-item-icon {
    display: inline;
  }
`;

export const StyledTodoEditInput = styled.input`
  width: calc(100% - 40px); /* Adjust based on padding and delete icon */
  background: none;
  border: none;
  padding: 10px 10px 10px 30px;
  box-sizing: border-box;
  color: gray;

  &:focus,
  &:focus-visible {
    outline: none;
    background-color: rgba(0, 0, 0, 0.2); /* Slightly darker background when focused */
  }
`;

export const StyledItemDeleteIcon = styled.span`
  display: none;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  margin-left: -10px;
  font-size: 1.5em;
  &:hover {
    color: red;
  }
`;

export const StyledTodoListWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 10; /* Ensure it appears above other elements */
`;

export const StyledTodoListContainer = styled.div`
  --todolist-container-background-color: rgba(0, 0, 0, 0.2);
  --todolist-container-box-shadow-color: rgba(0, 0, 0, 0.1);
  --todolist-container-border-color: #999;
  --scrollbar-thumb-color: #999;
  --scrollbar-thumb-hover-color: #999;

  width: 20rem;
  max-height: 27rem;
  overflow-y: auto;
  margin: 20px auto;
  text-align: center;
  border: 0.5px solid var(--todolist-container-border-color);
  border-radius: 10px;
  padding: 20px;
  background-color: var(--todolist-container-background-color);
  color: inherit;
  box-sizing: border-box;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px var(--todolist-container-box-shadow-color);
  position: relative;

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: var(--todolist-container-background-color); 
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb-color); 
    border-radius: 10px;
    border: 1px solid var(--todolist-container-background-color);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--scrollbar-thumb-hover-color); 
  }

  /* For Firefox */
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb-color) var(--todolist-container-background-color);
  
  /* For IE and older versions of Edge */
  -ms-overflow-style: -ms-autohiding-scrollbar;
`;

export const StyledDeleteIcon = styled.span`
  cursor: pointer;
  font-size: 1.5em;
  margin-left: auto;
  display: none;
  &:hover {
    color: red;
  }
`;
