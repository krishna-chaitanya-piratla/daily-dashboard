import styled from 'styled-components';

export const StyledTodoItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  text-align: left;
  color: #888;
  word-wrap: break-word;
`;

export const StyledTodoListContainer = styled.div`
  width: 400px; /* Set the fixed width here */
  margin: 20px auto;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  background-color: inherit;
  color: inherit;
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