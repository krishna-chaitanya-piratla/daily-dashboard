import styled from 'styled-components';

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

export const StyledTodoItem = styled.div<{ completed: boolean }>`
  padding: 10px 10px 10px 30px; /* Adjust padding to create space for the icon */
  border-bottom: 0.5px dashed rgba(0, 0, 0, 0.3);
  text-align: left;
  color: inherit;
  word-wrap: break-word;
  position: relative;
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};

  &:hover .delete-icon {
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
  height:fit-content;
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

`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledDeleteIcon = styled.span`
  cursor: pointer;
  font-size: 1.5em;
  &:hover {
    color: red;
  }
`;
