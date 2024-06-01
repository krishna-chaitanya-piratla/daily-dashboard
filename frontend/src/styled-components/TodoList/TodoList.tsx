import styled from 'styled-components';

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

  width: 30rem;
  max-height: 20rem;
  overflow-y: auto;
  margin: 20px auto;
  text-align: center;
  border: 0.5px solid none;
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
  scrollbar-color: var(--scrollbar-thumb-color) var (--todolist-container-background-color);
  
  /* For IE and older versions of Edge */
  -ms-overflow-style: -ms-autohiding-scrollbar;
`;
