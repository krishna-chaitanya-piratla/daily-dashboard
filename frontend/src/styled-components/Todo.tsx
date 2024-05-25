import styled from 'styled-components';

export const StyledTodoItem = styled.div<{ completed: boolean }>`
  padding: 10px 10px 10px 30px; /* Adjust padding to create space for the icon */
  border-bottom: 1px solid #ccc;
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
  height: 100%;
  margin: 20px auto;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.6);
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
