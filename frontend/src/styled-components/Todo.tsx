import styled from 'styled-components';

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
  .clear-all-icon { 
    display: none;
    cursor: pointer;
    font-size: 1.2em;
  }

  &:hover .edit-icon,
  &:hover .clear-all-icon {
    display: inline-block;
  }

  .clear-all-icon {
    margin-left: auto;
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
  
  &:focus, &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 0.5px #999;
    color: gray.
  }

  &:hover {
    outline: none;
    box-shadow: 0 0 0 0.5px #999;
  }

  &::placeholder {
    color: gray.
  }
`;

export const StyledTodoItem = styled.div<{ completed: boolean }>`
  padding: 10px 10px 10px 30px;
  border-bottom: 0.5px dashed rgba(0, 0, 0, 0.3);
  text-align: left;
  color: inherit;
  word-wrap: break-word;
  position: relative;
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};

  &:hover .delete-item-icon {
    display: inline;
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

export const StyledTodoListContainer = styled.div`
  width: 100%;
  margin: 20px auto;
  text-align: center;
  border: 0.5px solid #999;
  border-radius: 10px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  color: inherit;
  box-sizing: border-box;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`;

export const StyledDeleteIcon = styled.span`
  cursor: pointer;
  font-size: 1.5em;
  margin-left: auto;
  display: none; /* Initially hidden */
  &:hover {
    color: red;
  }
`;
